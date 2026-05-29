from fastapi import APIRouter, Depends, HTTPException, Header, Query
from typing import Optional
from pydantic import BaseModel
from app.database import get_db
from app.config import ADMIN_KEY

router = APIRouter()


class PlacarUpdate(BaseModel):
    gols_a: Optional[int] = None
    gols_b: Optional[int] = None
    penaltis_a: Optional[int] = None
    penaltis_b: Optional[int] = None
    status: Optional[str] = None


class JogadorCreate(BaseModel):
    selecao_id: int
    numero: Optional[int] = None
    nome: str
    nome_curto: Optional[str] = None
    posicao: str
    clube: Optional[str] = None
    idade: Optional[int] = None
    eh_capitao: int = 0


def verificar_admin(x_admin_key: Optional[str] = Header(None)):
    if not x_admin_key or x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=401, detail="Chave de administrador inválida ou ausente")
    return x_admin_key


@router.patch("/admin/jogos/{jogo_id}")
async def atualizar_placar(
    jogo_id: int,
    body: PlacarUpdate,
    admin_key: str = Depends(verificar_admin),
    conn=Depends(get_db),
):
    row = await conn.fetchrow("SELECT * FROM jogos WHERE id = $1", jogo_id)
    if not row:
        raise HTTPException(status_code=404, detail="Jogo não encontrado")

    current = dict(row)
    gols_a = body.gols_a if body.gols_a is not None else current["gols_a"]
    gols_b = body.gols_b if body.gols_b is not None else current["gols_b"]
    penaltis_a = body.penaltis_a if body.penaltis_a is not None else current["penaltis_a"]
    penaltis_b = body.penaltis_b if body.penaltis_b is not None else current["penaltis_b"]

    if body.status is not None:
        status_validos = ("agendado", "em_andamento", "encerrado")
        if body.status not in status_validos:
            raise HTTPException(
                status_code=400,
                detail=f"Status inválido. Use: {', '.join(status_validos)}"
            )
        status = body.status
    else:
        status = current["status"]

    row = await conn.fetchrow(
        """
        UPDATE jogos
        SET gols_a = $1, gols_b = $2, penaltis_a = $3, penaltis_b = $4, status = $5
        WHERE id = $6
        RETURNING
            id, fase, grupo, rodada, data_hora_utc, estadio, cidade, pais_sede, status,
            selecao_a_id, selecao_b_id, gols_a, gols_b, penaltis_a, penaltis_b
        """,
        gols_a, gols_b, penaltis_a, penaltis_b, status, jogo_id,
    )

    sa = await conn.fetchrow(
        "SELECT nome_pt, codigo_iso, bandeira_emoji FROM selecoes WHERE id = $1",
        row["selecao_a_id"],
    ) if row["selecao_a_id"] else None

    sb = await conn.fetchrow(
        "SELECT nome_pt, codigo_iso, bandeira_emoji FROM selecoes WHERE id = $1",
        row["selecao_b_id"],
    ) if row["selecao_b_id"] else None

    return {
        "id": row["id"], "fase": row["fase"], "grupo": row["grupo"],
        "rodada": row["rodada"], "data_hora_utc": row["data_hora_utc"],
        "estadio": row["estadio"], "cidade": row["cidade"],
        "pais_sede": row["pais_sede"], "status": row["status"],
        "selecao_a": {
            "id": row["selecao_a_id"], "nome_pt": sa["nome_pt"],
            "codigo_iso": sa["codigo_iso"], "bandeira_emoji": sa["bandeira_emoji"],
        } if sa else None,
        "selecao_b": {
            "id": row["selecao_b_id"], "nome_pt": sb["nome_pt"],
            "codigo_iso": sb["codigo_iso"], "bandeira_emoji": sb["bandeira_emoji"],
        } if sb else None,
        "gols_a": row["gols_a"], "gols_b": row["gols_b"],
        "penaltis_a": row["penaltis_a"], "penaltis_b": row["penaltis_b"],
    }


@router.get("/admin/selecoes")
async def listar_selecoes_admin(
    admin_key: str = Depends(verificar_admin),
    conn=Depends(get_db),
):
    rows = await conn.fetch(
        "SELECT id, nome_pt, bandeira_emoji FROM selecoes ORDER BY nome_pt"
    )
    return [dict(row) for row in rows]


@router.get("/admin/jogadores")
async def listar_jogadores_admin(
    selecao_id: int = Query(...),
    admin_key: str = Depends(verificar_admin),
    conn=Depends(get_db),
):
    rows = await conn.fetch(
        "SELECT * FROM jogadores WHERE selecao_id = $1 ORDER BY posicao, numero",
        selecao_id,
    )
    return [dict(row) for row in rows]


@router.post("/admin/jogadores", status_code=201)
async def adicionar_jogador(
    body: JogadorCreate,
    admin_key: str = Depends(verificar_admin),
    conn=Depends(get_db),
):
    if not await conn.fetchrow("SELECT id FROM selecoes WHERE id = $1", body.selecao_id):
        raise HTTPException(status_code=404, detail="Seleção não encontrada")

    if body.posicao not in ("GK", "DEF", "MID", "FWD"):
        raise HTTPException(status_code=400, detail="Posição inválida. Use: GK, DEF, MID, FWD")

    row = await conn.fetchrow(
        """
        INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
        """,
        body.selecao_id, body.numero, body.nome, body.nome_curto,
        body.posicao, body.clube, body.idade, body.eh_capitao,
    )
    return dict(row)


@router.delete("/admin/jogadores/{jogador_id}", status_code=204)
async def remover_jogador(
    jogador_id: int,
    admin_key: str = Depends(verificar_admin),
    conn=Depends(get_db),
):
    if not await conn.fetchrow("SELECT id FROM jogadores WHERE id = $1", jogador_id):
        raise HTTPException(status_code=404, detail="Jogador não encontrado")

    await conn.execute("DELETE FROM jogadores WHERE id = $1", jogador_id)
