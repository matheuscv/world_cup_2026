"""
Testes unitários para o serviço de classificação de grupos.
Execução: python -m pytest backend/tests/ -v
         (a partir do diretório copa2026/)
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

import unittest
from app.services.classificacao import calcular_classificacao, selecionar_melhores_terceiros


def _sel(id_, nome, ranking=100):
    return {
        "id": id_,
        "nome_pt": nome,
        "codigo_iso": nome[:2].upper(),
        "bandeira_emoji": "🏳️",
        "eh_cabeca_chave": 0,
        "pote": 1,
        "treinador": None,
        "ranking_fifa": ranking,
    }


def _jogo(id_a, id_b, gols_a, gols_b):
    return {
        "selecao_a_id": id_a,
        "selecao_b_id": id_b,
        "gols_a": gols_a,
        "gols_b": gols_b,
    }


class TestCalcularClassificacao(unittest.TestCase):

    def _setup_grupo_simples(self):
        """Grupo com 4 seleções e resultados definidos."""
        sels = [_sel(1, "Brasil", 1), _sel(2, "Argentina", 2), _sel(3, "Uruguai", 3), _sel(4, "Chile", 4)]
        jogos = [
            _jogo(1, 2, 2, 0),  # Brasil vence Argentina
            _jogo(3, 4, 1, 1),  # Uruguai empata Chile
            _jogo(1, 3, 1, 0),  # Brasil vence Uruguai
            _jogo(2, 4, 3, 0),  # Argentina vence Chile
            _jogo(1, 4, 2, 1),  # Brasil vence Chile
            _jogo(2, 3, 2, 2),  # Argentina empata Uruguai
        ]
        return sels, jogos

    def test_lider_com_3_vitorias(self):
        sels, jogos = self._setup_grupo_simples()
        cls = calcular_classificacao(jogos, sels)
        self.assertEqual(cls[0]["selecao_id"], 1)  # Brasil
        self.assertEqual(cls[0]["pontos"], 9)
        self.assertEqual(cls[0]["vitorias"], 3)

    def test_segunda_posicao(self):
        # Argentina: vence Chile (3pt), empata Uruguai (1pt), perde para Brasil (0pt) = 4pts
        sels, jogos = self._setup_grupo_simples()
        cls = calcular_classificacao(jogos, sels)
        self.assertEqual(cls[1]["selecao_id"], 2)  # Argentina
        self.assertEqual(cls[1]["pontos"], 4)

    def test_saldo_de_gols(self):
        sels, jogos = self._setup_grupo_simples()
        cls = calcular_classificacao(jogos, sels)
        # Brasil: GP=5, GC=1, SG=+4
        self.assertEqual(cls[0]["saldo_gols"], 4)
        self.assertEqual(cls[0]["gols_pro"], 5)

    def test_quarto_colocado(self):
        sels, jogos = self._setup_grupo_simples()
        cls = calcular_classificacao(jogos, sels)
        self.assertEqual(cls[3]["selecao_id"], 4)  # Chile
        self.assertEqual(cls[3]["pontos"], 1)

    def test_sem_jogos_disputados(self):
        sels = [_sel(1, "A"), _sel(2, "B"), _sel(3, "C"), _sel(4, "D")]
        jogos = [_jogo(1, 2, None, None), _jogo(3, 4, None, None)]
        cls = calcular_classificacao(jogos, sels)
        self.assertEqual(len(cls), 4)
        for entry in cls:
            self.assertEqual(entry["pontos"], 0)

    def test_empate_desempate_por_saldo(self):
        """Desempate por saldo de gols quando pontos são iguais."""
        # A: vence B (3-0)=3pts, perde C (0-1)=0pt, vence D (1-0)=3pts → 6pts, SG=+3
        # B: perde A=0pt, vence D=3pts, perde C=0pt → 3pts
        # C: empata D=1pt, vence A=3pts, vence B=3pts → 7pts (não empatam em pontos com A)
        # D: empata C=1pt, perde B=0pt, perde A=0pt → 1pt
        # C lidera com 7pts; A é segundo com 6pts
        sels = [_sel(1, "A", 10), _sel(2, "B", 20), _sel(3, "C", 30), _sel(4, "D", 40)]
        jogos = [
            _jogo(1, 2, 3, 0),  # A vence B
            _jogo(3, 4, 0, 0),  # C empata D
            _jogo(1, 3, 0, 1),  # C vence A
            _jogo(2, 4, 1, 0),  # B vence D
            _jogo(1, 4, 1, 0),  # A vence D
            _jogo(2, 3, 0, 2),  # C vence B
        ]
        cls = calcular_classificacao(jogos, sels)
        self.assertEqual(cls[0]["selecao_id"], 3)  # C: 7pts
        self.assertEqual(cls[0]["pontos"], 7)
        self.assertEqual(cls[1]["selecao_id"], 1)  # A: 6pts
        self.assertEqual(cls[1]["pontos"], 6)


class TestMelhoresTerceiros(unittest.TestCase):

    def _terceiro(self, grupo, pts, sg, gp, ranking=50):
        return {
            "pontos": pts, "saldo_gols": sg, "gols_pro": gp,
            "ranking_fifa": ranking, "grupo_origem": grupo,
            "selecao_id": ord(grupo) - ord("A") + 1,
        }

    def test_retorna_8_de_12(self):
        terceiros = [self._terceiro(chr(ord("A") + i), 4 - (i % 3), i % 5, i) for i in range(12)]
        resultado = selecionar_melhores_terceiros(terceiros)
        self.assertEqual(len(resultado), 8)

    def test_ordem_por_pontos(self):
        terceiros = [
            self._terceiro("A", 6, 0, 2),
            self._terceiro("B", 4, 0, 2),
            self._terceiro("C", 3, 0, 2),
        ]
        resultado = selecionar_melhores_terceiros(terceiros + [self._terceiro(chr(ord("D") + i), 1, 0, 1) for i in range(9)])
        self.assertEqual(resultado[0]["grupo_origem"], "A")
        self.assertEqual(resultado[1]["grupo_origem"], "B")

    def test_desempate_por_saldo(self):
        terceiros = [
            self._terceiro("A", 4, 3, 4),  # mesmo pts, sg maior
            self._terceiro("B", 4, 1, 4),
        ] + [self._terceiro(chr(ord("C") + i), 1, 0, 1) for i in range(10)]
        resultado = selecionar_melhores_terceiros(terceiros)
        self.assertEqual(resultado[0]["grupo_origem"], "A")


if __name__ == "__main__":
    unittest.main(verbosity=2)
