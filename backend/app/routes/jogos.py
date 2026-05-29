from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from app.database import get_db

router = APIRouter()


def row_to_jogo(row) -> dict:
    return {
        "id": row["id"],
        "fase": row["fase"],
        "grupo": row["grupo"],
        "rodada": row["rodada"],
        "data_hora_utc": row["data_hora_utc"],
        "estadio": row["estadio"],
        "cidade": row["cidade"],
        "pais_sede": row["pais_sede"],
        "status": row["status"],
        "selecao_a": {
            "id": row["selecao_a_id"],
            "nome_pt": row["nome_pt_a"],
            "codigo_iso": row["codigo_iso_a"],
            "bandeira_emoji": row["bandeira_emoji_a"],
        } if row["selecao_a_id"] else None,
        "selecao_b": {
            "id": row["selecao_b_id"],
            "nome_pt": row["nome_pt_b"],
            "codigo_iso": row["codigo_iso_b"],
            "bandeira_emoji": row["bandeira_emoji_b"],
        } if row["selecao_b_id"] else None,
        "gols_a": row["gols_a"],
        "gols_b": row["gols_b"],
        "penaltis_a": row["penaltis_a"],
        "penaltis_b": row["penaltis_b"],
    }


BASE_QUERY = """
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
"""


@router.get("/jogos")
async def listar_jogos(
    fase: Optional[str] = None,
    grupo: Optional[str] = None,
    status: Optional[str] = None,
    data: Optional[str] = None,
    selecao_id: Optional[int] = None,
    limit: int = 100,
    db=Depends(get_db),
):
    query = BASE_QUERY
    conditions = []
    params = []
    i = 1

    if fase:
        conditions.append(f"j.fase = ${i}")
        params.append(fase)
        i += 1
    if grupo:
        conditions.append(f"j.grupo = ${i}")
        params.append(grupo.upper())
        i += 1
    if status:
        conditions.append(f"j.status = ${i}")
        params.append(status)
        i += 1
    if data:
        conditions.append(f"LEFT(j.data_hora_utc, 10) = ${i}")
        params.append(data)
        i += 1
    if selecao_id:
        conditions.append(f"(j.selecao_a_id = ${i} OR j.selecao_b_id = ${i})")
        params.append(selecao_id)
        i += 1

    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    query += f" ORDER BY j.data_hora_utc ASC LIMIT ${i}"
    params.append(limit)

    rows = await db.fetch(query, *params)
    return [row_to_jogo(row) for row in rows]


@router.get("/jogos/{jogo_id}")
async def detalhe_jogo(jogo_id: int, db=Depends(get_db)):
    query = BASE_QUERY + " WHERE j.id = $1"
    row = await db.fetchrow(query, jogo_id)

    if not row:
        raise HTTPException(status_code=404, detail="Jogo não encontrado")

    return row_to_jogo(row)
