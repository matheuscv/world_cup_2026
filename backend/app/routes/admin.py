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
    db=Depends(get_db),
):
    async with db.execute("SELECT * FROM jogos WHERE id = ?", (jogo_id,)) as cursor:
        row = await cursor.fetchone()

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

    await db.execute(
        """
        UPDATE jogos
        SET gols_a = ?, gols_b = ?, penaltis_a = ?, penaltis_b = ?, status = ?
        WHERE id = ?
        """,
        (gols_a, gols_b, penaltis_a, penaltis_b, status, jogo_id),
    )
    await db.commit()

    async with db.execute(
        """
        SELECT j.*, sa.nome_pt AS nome_pt_a, sa.codigo_iso AS codigo_iso_a, sa.bandeira_emoji AS bandeira_emoji_a,
               sb.nome_pt AS nome_pt_b, sb.codigo_iso AS codigo_iso_b, sb.bandeira_emoji AS bandeira_emoji_b
        FROM jogos j
        LEFT JOIN selecoes sa ON j.selecao_a_id = sa.id
        LEFT JOIN selecoes sb ON j.selecao_b_id = sb.id
        WHERE j.id = ?
        """,
        (jogo_id,),
    ) as cursor:
        row = await cursor.fetchone()

    j = dict(row)
    return {
        "id": j["id"],
        "fase": j["fase"],
        "grupo": j["grupo"],
        "rodada": j["rodada"],
        "data_hora_utc": j["data_hora_utc"],
        "estadio": j["estadio"],
        "cidade": j["cidade"],
        "pais_sede": j["pais_sede"],
        "status": j["status"],
        "selecao_a": {
            "id": j["selecao_a_id"],
            "nome_pt": j["nome_pt_a"],
            "codigo_iso": j["codigo_iso_a"],
            "bandeira_emoji": j["bandeira_emoji_a"],
        } if j["selecao_a_id"] else None,
        "selecao_b": {
            "id": j["selecao_b_id"],
            "nome_pt": j["nome_pt_b"],
            "codigo_iso": j["codigo_iso_b"],
            "bandeira_emoji": j["bandeira_emoji_b"],
        } if j["selecao_b_id"] else None,
        "gols_a": j["gols_a"],
        "gols_b": j["gols_b"],
        "penaltis_a": j["penaltis_a"],
        "penaltis_b": j["penaltis_b"],
    }


@router.get("/admin/selecoes")
async def listar_selecoes_admin(
    admin_key: str = Depends(verificar_admin),
    db=Depends(get_db),
):
    async with db.execute(
        "SELECT id, nome_pt, bandeira_emoji FROM selecoes ORDER BY nome_pt"
    ) as cursor:
        rows = await cursor.fetchall()
    return [dict(row) for row in rows]


@router.get("/admin/jogadores")
async def listar_jogadores_admin(
    selecao_id: int = Query(...),
    admin_key: str = Depends(verificar_admin),
    db=Depends(get_db),
):
    async with db.execute(
        "SELECT * FROM jogadores WHERE selecao_id = ? ORDER BY posicao, numero",
        (selecao_id,),
    ) as cursor:
        rows = await cursor.fetchall()
    return [dict(row) for row in rows]


@router.post("/admin/jogadores", status_code=201)
async def adicionar_jogador(
    body: JogadorCreate,
    admin_key: str = Depends(verificar_admin),
    db=Depends(get_db),
):
    async with db.execute("SELECT id FROM selecoes WHERE id = ?", (body.selecao_id,)) as cursor:
        if not await cursor.fetchone():
            raise HTTPException(status_code=404, detail="Seleção não encontrada")

    if body.posicao not in ("GK", "DEF", "MID", "FWD"):
        raise HTTPException(status_code=400, detail="Posição inválida. Use: GK, DEF, MID, FWD")

    async with db.execute(
        """
        INSERT INTO jogadores (selecao_id, numero, nome, nome_curto, posicao, clube, idade, eh_capitao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (body.selecao_id, body.numero, body.nome, body.nome_curto,
         body.posicao, body.clube, body.idade, body.eh_capitao),
    ) as cursor:
        jogador_id = cursor.lastrowid

    await db.commit()

    async with db.execute("SELECT * FROM jogadores WHERE id = ?", (jogador_id,)) as cursor:
        row = await cursor.fetchone()

    return dict(row)


@router.delete("/admin/jogadores/{jogador_id}", status_code=204)
async def remover_jogador(
    jogador_id: int,
    admin_key: str = Depends(verificar_admin),
    db=Depends(get_db),
):
    async with db.execute("SELECT id FROM jogadores WHERE id = ?", (jogador_id,)) as cursor:
        if not await cursor.fetchone():
            raise HTTPException(status_code=404, detail="Jogador não encontrado")

    await db.execute("DELETE FROM jogadores WHERE id = ?", (jogador_id,))
    await db.commit()
