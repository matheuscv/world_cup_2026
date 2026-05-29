"""
Testes de integração da API — requer o servidor rodando em http://localhost:8000.

Execução:
  1. Inicie o backend: uvicorn main:app --reload --port 8000
  2. Execute: python backend/tests/test_api.py
             (a partir do diretório copa2026/)
"""
import json
import sys
import urllib.parse
import urllib.request
import urllib.error
from uuid import uuid4

BASE_URL = "http://localhost:8000"
SESSION_ID = str(uuid4())

PASS = "\033[32m✓\033[0m"
FAIL = "\033[31m✗\033[0m"


def req(method, path, body=None, headers=None):
    url = BASE_URL + path
    data = json.dumps(body).encode() if body else None
    h = {"Content-Type": "application/json", "X-Session-Id": SESSION_ID, **(headers or {})}
    request = urllib.request.Request(url, data=data, headers=h, method=method)
    try:
        with urllib.request.urlopen(request) as resp:
            return resp.status, json.loads(resp.read())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b"{}")


def ok(label, condition, detail=""):
    if condition:
        print(f"  {PASS} {label}")
        return True
    else:
        print(f"  {FAIL} {label}{' — ' + detail if detail else ''}")
        return False


def run_tests():
    falhas = 0

    print("\n=== Health ===")
    status, body = req("GET", "/api/health")
    falhas += not ok("GET /api/health retorna 200", status == 200)
    falhas += not ok("status = ok", body.get("status") == "ok")

    print("\n=== Seleções ===")
    status, body = req("GET", "/api/selecoes")
    falhas += not ok("GET /api/selecoes retorna 200", status == 200)
    falhas += not ok("Retorna lista", isinstance(body, list))
    falhas += not ok("48 seleções", len(body) == 48, f"encontrado: {len(body)}")

    if isinstance(body, list) and body:
        sel = body[0]
        falhas += not ok("Seleção tem nome_pt", "nome_pt" in sel)
        falhas += not ok("Seleção tem bandeira_emoji", "bandeira_emoji" in sel)
        falhas += not ok("Seleção tem grupo", "grupo" in sel)

    print("\n=== Jogos ===")
    status, body = req("GET", "/api/jogos?limit=200")
    falhas += not ok("GET /api/jogos retorna 200", status == 200)
    falhas += not ok("Retorna lista de jogos", isinstance(body, list))
    falhas += not ok("Pelo menos 72 jogos (fase de grupos)", len(body) >= 72, f"encontrado: {len(body)}")

    status, body = req("GET", "/api/jogos?fase=grupo")
    falhas += not ok("Filtro ?fase=grupo funciona", status == 200 and isinstance(body, list))
    if isinstance(body, list):
        fases = {j.get("fase") for j in body}
        falhas += not ok("Todos os jogos são da fase 'grupo'", fases == {"grupo"}, str(fases))

    # TASK-02: Filtro ?estadio= em GET /api/jogos
    print("\n--- Filtro ?estadio= (TASK-02) ---")
    # Descobrir um estádio existente a partir dos jogos já carregados
    status, todos = req("GET", "/api/jogos?limit=200")
    estadio_exemplo = None
    if isinstance(todos, list):
        for j in todos:
            if j.get("estadio"):
                estadio_exemplo = j["estadio"]
                break

    if estadio_exemplo:
        path = f"/api/jogos?estadio={urllib.parse.quote(estadio_exemplo)}"
        status, body = req("GET", path)
        falhas += not ok(
            f"GET /api/jogos?estadio={estadio_exemplo!r} retorna 200",
            status == 200,
        )
        falhas += not ok(
            "Resposta é lista",
            isinstance(body, list),
        )
        if isinstance(body, list):
            falhas += not ok(
                "Pelo menos 1 jogo retornado",
                len(body) >= 1,
                f"encontrado: {len(body)}",
            )
            estadios_distintos = {j.get("estadio") for j in body}
            falhas += not ok(
                "Todos os jogos pertencem ao estádio filtrado (case-sensitive)",
                estadios_distintos == {estadio_exemplo},
                f"encontrados: {estadios_distintos}",
            )

        # Estádio inexistente → lista vazia (200, não 404)
        status, body = req("GET", "/api/jogos?estadio=Estadio%20Inexistente%20XPTO")
        falhas += not ok(
            "Estádio inexistente retorna 200 com lista vazia",
            status == 200 and isinstance(body, list) and len(body) == 0,
            f"status={status} body={body!r}",
        )

        # Case-sensitive: versão em caixa alta não deve casar
        if estadio_exemplo != estadio_exemplo.upper():
            path_upper = f"/api/jogos?estadio={urllib.parse.quote(estadio_exemplo.upper())}"
            status, body = req("GET", path_upper)
            falhas += not ok(
                "Filtro é case-sensitive (upper-case não casa)",
                status == 200 and isinstance(body, list) and len(body) == 0,
                f"status={status} body_len={len(body) if isinstance(body, list) else 'n/a'}",
            )
    else:
        falhas += not ok(
            "Não foi possível encontrar um estádio para testar TASK-02",
            False,
            "nenhum jogo com estadio != null no banco",
        )

    status, body = req("GET", "/api/jogos/1")
    falhas += not ok("GET /api/jogos/1 retorna 200", status == 200)
    if isinstance(body, dict):
        falhas += not ok("Jogo tem selecao_a", "selecao_a" in body)
        falhas += not ok("Jogo tem data_hora_utc", "data_hora_utc" in body)

    print("\n=== Grupos ===")
    status, body = req("GET", "/api/grupos")
    falhas += not ok("GET /api/grupos retorna 200", status == 200)
    falhas += not ok("12 grupos", len(body) == 12, f"encontrado: {len(body)}")

    status, body = req("GET", "/api/grupos/A")
    falhas += not ok("GET /api/grupos/A retorna 200", status == 200)
    if isinstance(body, dict):
        falhas += not ok("Grupo A tem classificação", "classificacao" in body)
        falhas += not ok("Classificação tem 4 seleções", len(body.get("classificacao", [])) == 4)

    status, _ = req("GET", "/api/grupos/Z")
    falhas += not ok("Grupo inexistente retorna 404", status == 404)

    print("\n=== Seleção — Detalhe ===")
    status, body = req("GET", "/api/selecoes/1")
    falhas += not ok("GET /api/selecoes/1 retorna 200", status == 200)

    status, body = req("GET", "/api/selecoes/1/jogadores")
    falhas += not ok("GET /api/selecoes/1/jogadores retorna 200", status == 200)
    falhas += not ok("Retorna lista de jogadores", isinstance(body, list))

    print("\n=== Bolões ===")
    status, boloes = req("GET", "/api/boloes")
    falhas += not ok("GET /api/boloes retorna 200", status == 200)
    falhas += not ok("Retorna lista (pode ser vazia)", isinstance(boloes, list))

    status, novo = req("POST", "/api/boloes", {"nome": "Bolão de Teste"})
    falhas += not ok("POST /api/boloes retorna 201", status == 201)
    bolao_id = novo.get("id") if isinstance(novo, dict) else None
    falhas += not ok("Novo bolão tem id", bolao_id is not None)
    falhas += not ok("Nome salvo corretamente", novo.get("nome") == "Bolão de Teste")

    if bolao_id:
        status, palpites = req("GET", f"/api/boloes/{bolao_id}/palpites")
        falhas += not ok("GET /api/boloes/:id/palpites retorna 200", status == 200)
        falhas += not ok("Palpites inicialmente vazios", palpites == [])

        status, palpite = req("POST", f"/api/boloes/{bolao_id}/palpites",
                              {"jogo_id": 1, "gols_a": 2, "gols_b": 1})
        falhas += not ok("POST palpite retorna 201", status == 201)
        falhas += not ok("Palpite salvo com gols corretos",
                         palpite.get("gols_a") == 2 and palpite.get("gols_b") == 1)

        status, _ = req("POST", f"/api/boloes/{bolao_id}/palpites",
                        {"jogo_id": 1, "gols_a": 3, "gols_b": 0})
        falhas += not ok("Atualização de palpite (upsert) retorna 201", status == 201)

        status, palpites2 = req("GET", f"/api/boloes/{bolao_id}/palpites")
        if isinstance(palpites2, list):
            atualizado = next((p for p in palpites2 if p["jogo_id"] == 1), None)
            falhas += not ok("Palpite atualizado para 3×0",
                             atualizado and atualizado["gols_a"] == 3)

        status, _ = req("DELETE", f"/api/boloes/{bolao_id}")
        falhas += not ok("DELETE /api/boloes/:id retorna 204", status == 204)

        status, _ = req("GET", f"/api/boloes/{bolao_id}/palpites")
        falhas += not ok("Bolão deletado — palpites retornam 404", status == 404)

    print("\n=== Erros esperados ===")
    status, _ = req("GET", "/api/jogos/999999")
    falhas += not ok("Jogo inexistente retorna 404", status == 404)

    status, _ = req("GET", "/api/selecoes/999999")
    falhas += not ok("Seleção inexistente retorna 404", status == 404)

    status, _ = req("GET", "/rota-que-nao-existe")
    falhas += not ok("Rota inexistente retorna 404", status == 404)

    print(f"\n{'='*40}")
    total = 0  # contado implicitamente
    if falhas == 0:
        print(f"\033[32mTodos os testes passaram!\033[0m")
    else:
        print(f"\033[31m{falhas} teste(s) falharam.\033[0m")

    return falhas


if __name__ == "__main__":
    try:
        code, _ = req("GET", "/api/health")
        if code != 200:
            raise Exception()
    except Exception:
        print("\033[31mERRO: Servidor não está rodando em http://localhost:8000\033[0m")
        print("Inicie com: uvicorn main:app --reload --port 8000")
        sys.exit(2)

    falhas = run_tests()
    sys.exit(0 if falhas == 0 else 1)
