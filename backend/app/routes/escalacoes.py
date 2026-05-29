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

    rows = await db.fetch(
        "SELECT * FROM escalacoes WHERE session_id = $1 ORDER BY criado_em DESC",
        x_session_id,
    )
    return [dict(row) for row in rows]


@router.post("/escalacoes", status_code=201)
async def salvar_escalacao(
    body: EscalacaoCreate,
    x_session_id: Optional[str] = Header(None),
    db=Depends(get_db),
):
    if not x_session_id:
        raise HTTPException(status_code=400, detail="Header X-Session-Id é obrigatório")

    row = await db.fetchrow(
        """
        INSERT INTO escalacoes (nome, formacao, titulares_json, reservas_json, session_id)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
        """,
        body.nome, body.formacao, body.titulares_json, body.reservas_json, x_session_id,
    )
    return dict(row)


@router.put("/escalacoes/{escalacao_id}")
async def atualizar_escalacao(
    escalacao_id: int,
    body: EscalacaoUpdate,
    x_session_id: Optional[str] = Header(None),
    db=Depends(get_db),
):
    row = await db.fetchrow(
        "SELECT * FROM escalacoes WHERE id = $1 AND session_id = $2",
        escalacao_id, x_session_id or "",
    )
    if not row:
        raise HTTPException(status_code=404, detail="Escalação não encontrada")

    current = dict(row)
    nome = body.nome if body.nome is not None else current["nome"]
    formacao = body.formacao if body.formacao is not None else current["formacao"]
    titulares_json = body.titulares_json if body.titulares_json is not None else current["titulares_json"]
    reservas_json = body.reservas_json if body.reservas_json is not None else current["reservas_json"]

    row = await db.fetchrow(
        """
        UPDATE escalacoes
        SET nome = $1, formacao = $2, titulares_json = $3, reservas_json = $4
        WHERE id = $5 RETURNING *
        """,
        nome, formacao, titulares_json, reservas_json, escalacao_id,
    )
    return dict(row)


@router.delete("/escalacoes/{escalacao_id}", status_code=204)
async def remover_escalacao(
    escalacao_id: int,
    x_session_id: Optional[str] = Header(None),
    db=Depends(get_db),
):
    if not await db.fetchrow(
        "SELECT id FROM escalacoes WHERE id = $1 AND session_id = $2",
        escalacao_id, x_session_id or "",
    ):
        raise HTTPException(status_code=404, detail="Escalação não encontrada")

    await db.execute("DELETE FROM escalacoes WHERE id = $1", escalacao_id)
