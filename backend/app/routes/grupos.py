from fastapi import APIRouter, Depends, HTTPException
from app.database import get_db
from app.services.classificacao import calcular_classificacao

router = APIRouter()

GRUPOS = list("ABCDEFGHIJKL")


async def _buscar_grupo(letra: str, conn):
    letra = letra.upper()
    if letra not in GRUPOS:
        raise HTTPException(status_code=404, detail="Grupo inválido")

    selecoes_rows = await conn.fetch(
        """SELECT id, nome, nome_pt, codigo_iso, bandeira_emoji,
                  eh_cabeca_chave, pote, treinador, ranking_fifa
           FROM selecoes WHERE grupo = $1 ORDER BY id""",
        letra,
    )
    selecoes = [dict(row) for row in selecoes_rows]

    jogos_rows = await conn.fetch(
        """SELECT j.id, j.fase, j.grupo, j.rodada, j.data_hora_utc,
                  j.estadio, j.cidade, j.pais_sede, j.status,
                  j.selecao_a_id, j.selecao_b_id,
                  j.gols_a, j.gols_b, j.penaltis_a, j.penaltis_b,
                  sa.nome_pt AS nome_pt_a, sa.codigo_iso AS codigo_iso_a,
                  sa.bandeira_emoji AS bandeira_emoji_a,
                  sb.nome_pt AS nome_pt_b, sb.codigo_iso AS codigo_iso_b,
                  sb.bandeira_emoji AS bandeira_emoji_b
           FROM jogos j
           LEFT JOIN selecoes sa ON j.selecao_a_id = sa.id
           LEFT JOIN selecoes sb ON j.selecao_b_id = sb.id
           WHERE j.grupo = $1 AND j.fase = 'grupo'
           ORDER BY j.rodada ASC, j.data_hora_utc ASC""",
        letra,
    )
    jogos_list = [dict(row) for row in jogos_rows]

    classificacao = calcular_classificacao(jogos_list, selecoes)

    jogos_fmt = [
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
        for j in jogos_list
    ]

    return {"letra": letra, "classificacao": classificacao, "jogos": jogos_fmt}


@router.get("/grupos")
async def listar_grupos(conn=Depends(get_db)):
    return [await _buscar_grupo(letra, conn) for letra in GRUPOS]


@router.get("/grupos/{letra}")
async def detalhe_grupo(letra: str, conn=Depends(get_db)):
    return await _buscar_grupo(letra, conn)


@router.get("/classificacao")
async def classificacao_geral(conn=Depends(get_db)):
    resultado = []
    for letra in GRUPOS:
        grupo = await _buscar_grupo(letra, conn)
        resultado.append({"letra": letra, "classificacao": grupo["classificacao"]})
    return resultado
