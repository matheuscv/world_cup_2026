from fastapi import APIRouter, Depends, HTTPException, Header
from typing import Optional
from pydantic import BaseModel
from app.database import get_db

router = APIRouter()


class BolaoCreate(BaseModel):
    nome: str = "Meu Bolão"


class PalpiteCreate(BaseModel):
    jogo_id: int
    gols_a: int
    gols_b: int
    penaltis_a: Optional[int] = None
    penaltis_b: Optional[int] = None


@router.get("/boloes")
async def listar_boloes(
    x_session_id: Optional[str] = Header(None),
    conn=Depends(get_db),
):
    if not x_session_id:
        raise HTTPException(status_code=400, detail="Header X-Session-Id é obrigatório")

    rows = await conn.fetch(
        "SELECT * FROM boloes WHERE session_id = $1 ORDER BY criado_em DESC",
        x_session_id,
    )
    return [dict(row) for row in rows]


@router.post("/boloes", status_code=201)
async def criar_bolao(
    body: BolaoCreate,
    x_session_id: Optional[str] = Header(None),
    conn=Depends(get_db),
):
    if not x_session_id:
        raise HTTPException(status_code=400, detail="Header X-Session-Id é obrigatório")

    row = await conn.fetchrow(
        "INSERT INTO boloes (nome, session_id) VALUES ($1, $2) RETURNING *",
        body.nome, x_session_id,
    )
    return dict(row)


@router.get("/boloes/{bolao_id}/palpites")
async def listar_palpites(
    bolao_id: int,
    x_session_id: Optional[str] = Header(None),
    conn=Depends(get_db),
):
    if not await conn.fetchrow(
        "SELECT id FROM boloes WHERE id = $1 AND session_id = $2",
        bolao_id, x_session_id or "",
    ):
        raise HTTPException(status_code=404, detail="Bolão não encontrado")

    rows = await conn.fetch(
        """
        SELECT p.*, j.data_hora_utc, j.fase, j.grupo, j.rodada,
               sa.nome_pt AS nome_pt_a, sb.nome_pt AS nome_pt_b
        FROM palpites p
        JOIN jogos j ON p.jogo_id = j.id
        LEFT JOIN selecoes sa ON j.selecao_a_id = sa.id
        LEFT JOIN selecoes sb ON j.selecao_b_id = sb.id
        WHERE p.bolao_id = $1
        ORDER BY j.data_hora_utc ASC
        """,
        bolao_id,
    )
    return [dict(row) for row in rows]


@router.post("/boloes/{bolao_id}/palpites", status_code=201)
async def salvar_palpite(
    bolao_id: int,
    body: PalpiteCreate,
    x_session_id: Optional[str] = Header(None),
    conn=Depends(get_db),
):
    if not await conn.fetchrow(
        "SELECT id FROM boloes WHERE id = $1 AND session_id = $2",
        bolao_id, x_session_id or "",
    ):
        raise HTTPException(status_code=404, detail="Bolão não encontrado")

    if not await conn.fetchrow("SELECT id FROM jogos WHERE id = $1", body.jogo_id):
        raise HTTPException(status_code=404, detail="Jogo não encontrado")

    row = await conn.fetchrow(
        """
        INSERT INTO palpites (bolao_id, jogo_id, gols_a, gols_b, penaltis_a, penaltis_b)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT(bolao_id, jogo_id) DO UPDATE SET
            gols_a = EXCLUDED.gols_a,
            gols_b = EXCLUDED.gols_b,
            penaltis_a = EXCLUDED.penaltis_a,
            penaltis_b = EXCLUDED.penaltis_b
        RETURNING *
        """,
        bolao_id, body.jogo_id, body.gols_a, body.gols_b,
        body.penaltis_a, body.penaltis_b,
    )
    return dict(row)


@router.get("/boloes/{bolao_id}/chaveamento")
async def chaveamento_bolao(
    bolao_id: int,
    x_session_id: Optional[str] = Header(None),
    conn=Depends(get_db),
):
    if not await conn.fetchrow(
        "SELECT id FROM boloes WHERE id = $1 AND session_id = $2",
        bolao_id, x_session_id or "",
    ):
        raise HTTPException(status_code=404, detail="Bolão não encontrado")

    palpites_rows = await conn.fetch(
        "SELECT jogo_id, gols_a, gols_b FROM palpites WHERE bolao_id = $1",
        bolao_id,
    )
    palpites = {row["jogo_id"]: dict(row) for row in palpites_rows}

    jogos = [dict(r) for r in await conn.fetch(
        "SELECT id, grupo, selecao_a_id, selecao_b_id FROM jogos WHERE fase = 'grupo'"
    )]
    selecoes = [dict(r) for r in await conn.fetch("SELECT * FROM selecoes")]

    from app.services.classificacao import calcular_classificacao
    from app.services.chaveamento import calcular_chaveamento

    grupos_letras = sorted({j["grupo"] for j in jogos if j["grupo"]})
    classificacoes = {}

    for letra in grupos_letras:
        jogos_grupo = [j for j in jogos if j["grupo"] == letra]
        selecoes_grupo = [s for s in selecoes if s["grupo"] == letra]
        jogos_com_palpites = []
        for j in jogos_grupo:
            if j["id"] in palpites:
                p = palpites[j["id"]]
                jogos_com_palpites.append({**j, "gols_a": p["gols_a"], "gols_b": p["gols_b"]})
            else:
                jogos_com_palpites.append({**j, "gols_a": None, "gols_b": None})
        classificacoes[letra] = calcular_classificacao(jogos_com_palpites, selecoes_grupo)

    return calcular_chaveamento(classificacoes)


@router.delete("/boloes/{bolao_id}", status_code=204)
async def remover_bolao(
    bolao_id: int,
    x_session_id: Optional[str] = Header(None),
    conn=Depends(get_db),
):
    if not await conn.fetchrow(
        "SELECT id FROM boloes WHERE id = $1 AND session_id = $2",
        bolao_id, x_session_id or "",
    ):
        raise HTTPException(status_code=404, detail="Bolão não encontrado")

    await conn.execute("DELETE FROM boloes WHERE id = $1", bolao_id)
