from fastapi import APIRouter, Depends, HTTPException, Header
from typing import Optional
from pydantic import BaseModel
from app.database import get_db

router = APIRouter()


class EscalacaoCreate(BaseModel):
    nome: str = "Minha Escalação"
    formacao: str = "4-3-3"
    titulares_json: str
    reservas_json: Optional[str] = None


class EscalacaoUpdate(BaseModel):
    nome: Optional[str] = None
    formacao: Optional[str] = None
    titulares_json: Optional[str] = None
    reservas_json: Optional[str] = None


@router.get("/escalacoes")
async def listar_escalacoes(
    x_session_id: Optional[str] = Header(None),
    db=Depends(get_db),
):
    if not x_session_id:
        raise HTTPException(status_code=400, detail="Header X-Session-Id é obrigatório")

    async with db.execute(
        "SELECT * FROM escalacoes WHERE session_id = ? ORDER BY criado_em DESC",
        (x_session_id,),
    ) as cursor:
        rows = await cursor.fetchall()

    return [dict(row) for row in rows]


@router.post("/escalacoes", status_code=201)
async def salvar_escalacao(
    body: EscalacaoCreate,
    x_session_id: Optional[str] = Header(None),
    db=Depends(get_db),
):
    if not x_session_id:
        raise HTTPException(status_code=400, detail="Header X-Session-Id é obrigatório")

    async with db.execute(
        """
        INSERT INTO escalacoes (nome, formacao, titulares_json, reservas_json, session_id)
        VALUES (?, ?, ?, ?, ?)
        """,
        (body.nome, body.formacao, body.titulares_json, body.reservas_json, x_session_id),
    ) as cursor:
        escalacao_id = cursor.lastrowid

    await db.commit()

    async with db.execute("SELECT * FROM escalacoes WHERE id = ?", (escalacao_id,)) as cursor:
        row = await cursor.fetchone()

    return dict(row)


@router.put("/escalacoes/{escalacao_id}")
async def atualizar_escalacao(
    escalacao_id: int,
    body: EscalacaoUpdate,
    x_session_id: Optional[str] = Header(None),
    db=Depends(get_db),
):
    async with db.execute(
        "SELECT * FROM escalacoes WHERE id = ? AND session_id = ?",
        (escalacao_id, x_session_id or ""),
    ) as cursor:
        row = await cursor.fetchone()

    if not row:
        raise HTTPException(status_code=404, detail="Escalação não encontrada")

    current = dict(row)
    nome = body.nome if body.nome is not None else current["nome"]
    formacao = body.formacao if body.formacao is not None else current["formacao"]
    titulares_json = body.titulares_json if body.titulares_json is not None else current["titulares_json"]
    reservas_json = body.reservas_json if body.reservas_json is not None else current["reservas_json"]

    await db.execute(
        """
        UPDATE escalacoes
        SET nome = ?, formacao = ?, titulares_json = ?, reservas_json = ?
        WHERE id = ?
        """,
        (nome, formacao, titulares_json, reservas_json, escalacao_id),
    )
    await db.commit()

    async with db.execute("SELECT * FROM escalacoes WHERE id = ?", (escalacao_id,)) as cursor:
        row = await cursor.fetchone()

    return dict(row)


@router.delete("/escalacoes/{escalacao_id}", status_code=204)
async def remover_escalacao(
    escalacao_id: int,
    x_session_id: Optional[str] = Header(None),
    db=Depends(get_db),
):
    async with db.execute(
        "SELECT id FROM escalacoes WHERE id = ? AND session_id = ?",
        (escalacao_id, x_session_id or ""),
    ) as cursor:
        if not await cursor.fetchone():
            raise HTTPException(status_code=404, detail="Escalação não encontrada")

    await db.execute("DELETE FROM escalacoes WHERE id = ?", (escalacao_id,))
    await db.commit()
