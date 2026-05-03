from typing import List, Dict, Any


def _stats_iniciais(selecao_id: int) -> Dict[str, Any]:
    return {
        "selecao_id": selecao_id,
        "jogos": 0,
        "vitorias": 0,
        "empates": 0,
        "derrotas": 0,
        "gols_pro": 0,
        "gols_contra": 0,
        "saldo_gols": 0,
        "pontos": 0,
    }


def _processar_jogo(stats: Dict, jogo: Dict):
    a = jogo["selecao_a_id"]
    b = jogo["selecao_b_id"]
    ga = jogo["gols_a"]
    gb = jogo["gols_b"]

    if ga is None or gb is None:
        return

    if a in stats:
        stats[a]["jogos"] += 1
        stats[a]["gols_pro"] += ga
        stats[a]["gols_contra"] += gb
        stats[a]["saldo_gols"] += ga - gb
        if ga > gb:
            stats[a]["vitorias"] += 1
            stats[a]["pontos"] += 3
        elif ga == gb:
            stats[a]["empates"] += 1
            stats[a]["pontos"] += 1
        else:
            stats[a]["derrotas"] += 1

    if b in stats:
        stats[b]["jogos"] += 1
        stats[b]["gols_pro"] += gb
        stats[b]["gols_contra"] += ga
        stats[b]["saldo_gols"] += gb - ga
        if gb > ga:
            stats[b]["vitorias"] += 1
            stats[b]["pontos"] += 3
        elif ga == gb:
            stats[b]["empates"] += 1
            stats[b]["pontos"] += 1
        else:
            stats[b]["derrotas"] += 1


def _confronto_direto(ids: List[int], jogos: List[Dict]) -> Dict[int, Dict]:
    cd = {sid: {"pontos": 0, "saldo_gols": 0, "gols_pro": 0} for sid in ids}
    ids_set = set(ids)

    for jogo in jogos:
        a = jogo["selecao_a_id"]
        b = jogo["selecao_b_id"]
        ga = jogo["gols_a"]
        gb = jogo["gols_b"]

        if ga is None or gb is None:
            continue
        if a not in ids_set or b not in ids_set:
            continue

        cd[a]["gols_pro"] += ga
        cd[a]["saldo_gols"] += ga - gb
        if ga > gb:
            cd[a]["pontos"] += 3
        elif ga == gb:
            cd[a]["pontos"] += 1

        cd[b]["gols_pro"] += gb
        cd[b]["saldo_gols"] += gb - ga
        if gb > ga:
            cd[b]["pontos"] += 3
        elif ga == gb:
            cd[b]["pontos"] += 1

    return cd


def _sort_key(entry: Dict, cd: Dict[int, Dict], ranking_map: Dict[int, int]):
    sid = entry["selecao_id"]
    c = cd.get(sid, {"pontos": 0, "saldo_gols": 0, "gols_pro": 0})
    return (
        -entry["pontos"],
        -entry["saldo_gols"],
        -entry["gols_pro"],
        -c["pontos"],
        -c["saldo_gols"],
        -c["gols_pro"],
        ranking_map.get(sid, 999),
    )


def calcular_classificacao(jogos: List[Dict], selecoes: List[Dict]) -> List[Dict]:
    """
    Retorna classificação ordenada por critérios FIFA (7 critérios de desempate).
    Inclui eh_cabeca_chave e pote na resposta para uso no frontend.
    """
    selecao_map = {s["id"]: s for s in selecoes}
    ranking_map = {s["id"]: (s.get("ranking_fifa") or 999) for s in selecoes}

    stats = {s["id"]: _stats_iniciais(s["id"]) for s in selecoes}

    for jogo in jogos:
        _processar_jogo(stats, jogo)

    entries = list(stats.values())
    ids_todos = [s["id"] for s in selecoes]
    cd_todos = _confronto_direto(ids_todos, jogos)

    entries.sort(key=lambda e: _sort_key(e, cd_todos, ranking_map))

    resultado = []
    for pos, entry in enumerate(entries, start=1):
        sel = selecao_map[entry["selecao_id"]]
        resultado.append({
            "posicao": pos,
            "selecao_id": entry["selecao_id"],
            "nome_pt": sel["nome_pt"],
            "codigo_iso": sel["codigo_iso"],
            "bandeira_emoji": sel["bandeira_emoji"],
            "eh_cabeca_chave": bool(sel.get("eh_cabeca_chave", 0)),
            "pote": sel.get("pote", 0),
            "treinador": sel.get("treinador"),
            "ranking_fifa": sel.get("ranking_fifa"),
            "jogos": entry["jogos"],
            "vitorias": entry["vitorias"],
            "empates": entry["empates"],
            "derrotas": entry["derrotas"],
            "gols_pro": entry["gols_pro"],
            "gols_contra": entry["gols_contra"],
            "saldo_gols": entry["saldo_gols"],
            "pontos": entry["pontos"],
        })

    return resultado


def selecionar_melhores_terceiros(terceiros: List[Dict]) -> List[Dict]:
    """Recebe os 12 terceiros colocados, retorna os 8 melhores pelos critérios FIFA."""
    def sort_key(t):
        return (
            -t.get("pontos", 0),
            -t.get("saldo_gols", 0),
            -t.get("gols_pro", 0),
            t.get("ranking_fifa", 999),
        )
    return sorted(terceiros, key=sort_key)[:8]
