from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from app.database import get_db

router = APIRouter()


@router.get("/selecoes")
async def listar_selecoes(
    grupo: Optional[str] = None,
    confederacao: Optional[str] = None,
    db=Depends(get_db),
):
    query = "SELECT * FROM selecoes"
    conditions = []
    params = []
    i = 1

    if grupo:
        conditions.append(f"grupo = ${i}")
        params.append(grupo.upper())
        i += 1
    if confederacao:
        conditions.append(f"confederacao = ${i}")
        params.append(confederacao)
        i += 1

    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    query += " ORDER BY grupo ASC, pote ASC"

    rows = await db.fetch(query, *params)
    return [dict(row) for row in rows]


@router.get("/selecoes/{selecao_id}")
async def detalhe_selecao(selecao_id: int, db=Depends(get_db)):
    row = await db.fetchrow("SELECT * FROM selecoes WHERE id = $1", selecao_id)

    if not row:
        raise HTTPException(status_code=404, detail="Seleção não encontrada")

    return dict(row)


@router.get("/selecoes/{selecao_id}/jogadores")
async def elenco_selecao(
    selecao_id: int,
    posicao: Optional[str] = None,
    db=Depends(get_db),
):
    if not await db.fetchrow("SELECT id FROM selecoes WHERE id = $1", selecao_id):
        raise HTTPException(status_code=404, detail="Seleção não encontrada")

    query = "SELECT * FROM jogadores WHERE selecao_id = $1"
    params = [selecao_id]

    if posicao and posicao in ("GK", "DEF", "MID", "FWD"):
        query += " AND posicao = $2"
        params.append(posicao)

    query += " ORDER BY posicao ASC, numero ASC"

    rows = await db.fetch(query, *params)
    return [dict(row) for row in rows]


@router.get("/selecoes/{selecao_id}/jogos")
async def jogos_selecao(selecao_id: int, db=Depends(get_db)):
    if not await db.fetchrow("SELECT id FROM selecoes WHERE id = $1", selecao_id):
        raise HTTPException(status_code=404, detail="Seleção não encontrada")

    query = """
        SELECT
            j.id, j.fase, j.grupo, j.rodada, j.data_hora_utc,
            j.estadio, j.cidade, j.pais_sede, j.status,
            j.selecao_a_id, j.selecao_b_id,
            j.gols_a, j.gols_b, j.penaltis_a, j.penaltis_b,
            sa.nome_pt AS nome_pt_a, sa.codigo_iso AS codigo_iso_a, sa.bandeira_emoji AS bandeira_emoji_a,
            sb.nome_pt AS nome_pt_b, sb.codigo_iso AS codigo_iso_b, sb.bandeira_emoji AS bandeira_emoji_b
        FROM jogos j
        LEFT JOIN selecoes sa ON j.selecao_a_id = sa.id
        LEFT JOIN selecoes sb ON j.selecao_b_id = sb.id
        WHERE j.selecao_a_id = $1 OR j.selecao_b_id = $1
        ORDER BY j.data_hora_utc ASC
    """

    rows = await db.fetch(query, selecao_id)
    return [
        {
            "id": j["id"], "fase": j["fase"], "grupo": j["grupo"],
            "rodada": j["rodada"], "data_hora_utc": j["data_hora_utc"],
            "estadio": j["estadio"], "cidade": j["cidade"],
            "pais_sede": j["pais_sede"], "status": j["status"],
            "selecao_a": {
                "id": j["selecao_a_id"], "nome_pt": j["nome_pt_a"],
                "codigo_iso": j["codigo_iso_a"], "bandeira_emoji": j["bandeira_emoji_a"],
            } if j["selecao_a_id"] else None,
            "selecao_b": {
                "id": j["selecao_b_id"], "nome_pt": j["nome_pt_b"],
                "codigo_iso": j["codigo_iso_b"], "bandeira_emoji": j["bandeira_emoji_b"],
            } if j["selecao_b_id"] else None,
            "gols_a": j["gols_a"], "gols_b": j["gols_b"],
            "penaltis_a": j["penaltis_a"], "penaltis_b": j["penaltis_b"],
        }
        for j in rows
    ]
