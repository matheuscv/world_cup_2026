"""
Servico de chaveamento das oitavas de final — Copa do Mundo 2026.

O torneio tem 48 selecoes em 12 grupos (A-L) com 4 selecoes cada.
Avancam: 1o e 2o de cada grupo (24 selecoes) + 8 melhores terceiros (8 selecoes) = 32 total.

Chaveamento das oitavas segue tabela FIFA pre-definida.
Os confrontos das oitavas sao baseados nas posicoes finais dos grupos.
"""

from typing import List, Dict, Optional, Any
from app.services.classificacao import selecionar_melhores_terceiros


# Tabela de chaveamento FIFA 2026 (oitavas de final)
# Formato: (descricao_a, descricao_b)
# Baseado no modelo de expansao para 48 selecoes / 12 grupos
CHAVEAMENTO_OITAVAS = [
    # Confronto 1 (Jogo 49)
    ("1A", "2B"),
    # Confronto 2 (Jogo 50)
    ("1C", "2D"),
    # Confronto 3 (Jogo 51)
    ("1E", "2F"),
    # Confronto 4 (Jogo 52)
    ("1G", "2H"),
    # Confronto 5 (Jogo 53)
    ("1I", "2J"),
    # Confronto 6 (Jogo 54)
    ("1K", "2L"),
    # Confronto 7 (Jogo 55) — terceiros do grupo B/C/D ou E/F
    ("1B", "3BCD"),  # melhor terceiro dos grupos B, C ou D
    # Confronto 8 (Jogo 56)
    ("1D", "3EFG"),  # melhor terceiro dos grupos E, F ou G
    # Confronto 9 (Jogo 57)
    ("1F", "3HIJ"),
    # Confronto 10 (Jogo 58)
    ("1H", "3KLA"),
    # Confronto 11 (Jogo 59)
    ("1J", "3BEI"),
    # Confronto 12 (Jogo 60)
    ("1L", "3CFJ"),
    # Confronto 13 (Jogo 61)
    ("2A", "3DGK"),
    # Confronto 14 (Jogo 62)
    ("2E", "3HLB"),
    # Confronto 15 (Jogo 63)
    ("2G", "3AIE"),
    # Confronto 16 (Jogo 64)
    ("2I", "3CJL"),
]


def _chave_para_descricao(chave: str) -> Dict:
    """Converte chave como '1A' ou '3BCD' em metadados legíveis."""
    if len(chave) == 2 and chave[0].isdigit():
        return {"posicao": int(chave[0]), "grupo": chave[1], "tipo": "classificado"}
    elif len(chave) > 2 and chave[0] == "3":
        grupos = list(chave[1:])
        return {"posicao": 3, "grupos_possiveis": grupos, "tipo": "melhor_terceiro"}
    return {"descricao": chave, "tipo": "desconhecido"}


def calcular_chaveamento(classificacoes_por_grupo: Dict[str, List[Dict]]) -> Dict[str, Any]:
    """
    Recebe dict {letra_grupo: [lista_classificacao]} para todos os 12 grupos.
    Retorna estrutura de chaveamento com oitavas, quartas, semi e final.

    classificacoes_por_grupo: {"A": [...], "B": [...], ...}
    Cada item da lista tem: selecao_id, nome_pt, codigo_iso, bandeira_emoji, pontos, etc.
    """

    # Extrair primeiros, segundos e terceiros
    primeiros = {}
    segundos = {}
    terceiros_lista = []

    for letra, class_list in classificacoes_por_grupo.items():
        if len(class_list) >= 1:
            primeiros[letra] = class_list[0]
        if len(class_list) >= 2:
            segundos[letra] = class_list[1]
        if len(class_list) >= 3:
            terceiro = dict(class_list[2])
            terceiro["grupo_origem"] = letra
            terceiros_lista.append(terceiro)

    # Selecionar 8 melhores terceiros
    melhores_terceiros = selecionar_melhores_terceiros(terceiros_lista)
    grupos_terceiros = {t["grupo_origem"] for t in melhores_terceiros}

    def resolver_selecao(chave: str) -> Optional[Dict]:
        if len(chave) == 2 and chave[0] == "1":
            return primeiros.get(chave[1])
        elif len(chave) == 2 and chave[0] == "2":
            return segundos.get(chave[1])
        elif chave[0] == "3":
            grupos_possiveis = list(chave[1:])
            for t in melhores_terceiros:
                if t["grupo_origem"] in grupos_possiveis:
                    return t
            return None
        return None

    def fmt_selecao(sel: Optional[Dict]) -> Optional[Dict]:
        if not sel:
            return None
        return {
            "selecao_id": sel.get("selecao_id"),
            "nome_pt": sel.get("nome_pt"),
            "codigo_iso": sel.get("codigo_iso"),
            "bandeira_emoji": sel.get("bandeira_emoji"),
        }

    oitavas = []
    for i, (chave_a, chave_b) in enumerate(CHAVEAMENTO_OITAVAS, start=1):
        sel_a = resolver_selecao(chave_a)
        sel_b = resolver_selecao(chave_b)
        oitavas.append({
            "numero_jogo": i,
            "descricao_a": chave_a,
            "descricao_b": chave_b,
            "selecao_a": fmt_selecao(sel_a),
            "selecao_b": fmt_selecao(sel_b),
            "vencedor": None,  # Ainda nao disputado
        })

    return {
        "oitavas": oitavas,
        "grupos_com_terceiro_classificado": sorted(list(grupos_terceiros)),
        "melhores_terceiros": [fmt_selecao(t) for t in melhores_terceiros],
        "quartas": [],   # Calculado apos oitavas
        "semi": [],      # Calculado apos quartas
        "final": None,   # Calculado apos semi
    }


def calcular_chaveamento_bolao(palpites: List[Dict], classificacoes: Dict[str, List[Dict]]) -> Dict[str, Any]:
    """
    Versao do chaveamento para bolao — usa palpites para simular resultados
    e projetar o bracket completo.

    palpites: lista de {jogo_id, gols_a, gols_b, ...}
    classificacoes: dict de classificacoes reais (sem palpites)
    """
    # Por ora, retorna o chaveamento base sem simulacao de mata-mata
    return calcular_chaveamento(classificacoes)
