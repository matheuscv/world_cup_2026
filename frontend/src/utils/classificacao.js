// ── Classificação de grupo ────────────────────────────────────────────────────

export function calcularClassificacao(jogos, selecoes) {
  const stats = {}
  selecoes.forEach(s => {
    stats[s.id] = { selecao: s, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0, pts: 0 }
  })

  jogos.forEach(jogo => {
    if (jogo.gols_a == null || jogo.gols_b == null) return
    const a = stats[jogo.selecao_a_id || jogo.selecao_a?.id]
    const b = stats[jogo.selecao_b_id || jogo.selecao_b?.id]
    if (!a || !b) return

    const ga = parseInt(jogo.gols_a), gb = parseInt(jogo.gols_b)
    a.j++; b.j++
    a.gp += ga; a.gc += gb; a.sg += ga - gb
    b.gp += gb; b.gc += ga; b.sg += gb - ga

    if (ga > gb)      { a.v++; a.pts += 3; b.d++ }
    else if (ga < gb) { b.v++; b.pts += 3; a.d++ }
    else              { a.e++; b.e++; a.pts++; b.pts++ }
  })

  return Object.values(stats).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    if (b.sg  !== a.sg)  return b.sg  - a.sg
    if (b.gp  !== a.gp)  return b.gp  - a.gp
    const rA = a.selecao?.ranking_fifa ?? 999
    const rB = b.selecao?.ranking_fifa ?? 999
    return rA - rB
  })
}

// ── Seleção dos 8 melhores terceiros ─────────────────────────────────────────

export function selecionarMelhoresTerceiros(terceiros) {
  // terceiros: Array<{ selecao, pts, sg, gp, grupo_origem }>
  return [...terceiros]
    .sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts
      if (b.sg  !== a.sg)  return b.sg  - a.sg
      if (b.gp  !== a.gp)  return b.gp  - a.gp
      return (a.selecao?.ranking_fifa ?? 999) - (b.selecao?.ranking_fifa ?? 999)
    })
    .slice(0, 8)
}

// ── Mapeamento das oitavas de final ───────────────────────────────────────────

const OITAVAS_BRACKET = [
  ['1A', '2B'], ['1C', '2D'], ['1E', '2F'], ['1G', '2H'],
  ['1I', '2J'], ['1K', '2L'],
  ['1B', '3BCD'], ['1D', '3EFG'], ['1F', '3HIJ'], ['1H', '3KLA'],
  ['1J', '3BEI'], ['1L', '3CFJ'],
  ['2A', '3DGK'], ['2E', '3HLB'], ['2G', '3AIE'], ['2I', '3CJL'],
]

function resolverSelecao(chave, primeiros, segundos, melhores) {
  if (chave[0] === '1') return primeiros[chave[1]] ?? null
  if (chave[0] === '2') return segundos[chave[1]] ?? null
  if (chave[0] === '3') {
    const grupos = chave.slice(1).split('')
    for (const t of melhores) {
      if (grupos.includes(t.grupo_origem)) return t.selecao
    }
  }
  return null
}

export function computarOitavas(classificacoes) {
  // classificacoes: { [letra]: Array<{ selecao, pts, sg, gp, ... }> }
  const primeiros = {}, segundos = {}, terceiros = []

  for (const [letra, cls] of Object.entries(classificacoes)) {
    if (cls.length >= 1) primeiros[letra] = cls[0].selecao
    if (cls.length >= 2) segundos[letra] = cls[1].selecao
    if (cls.length >= 3) terceiros.push({ ...cls[2], grupo_origem: letra })
  }

  const melhores = selecionarMelhoresTerceiros(terceiros)

  return OITAVAS_BRACKET.map(([chaveA, chaveB], i) => ({
    id: i,
    descricaoA: chaveA,
    descricaoB: chaveB,
    selecaoA: resolverSelecao(chaveA, primeiros, segundos, melhores),
    selecaoB: resolverSelecao(chaveB, primeiros, segundos, melhores),
  }))
}

// ── Helpers de resultado de confronto ────────────────────────────────────────

export function getVencedorLado(confronto) {
  const { gols_a, gols_b, pens_a, pens_b } = confronto
  if (gols_a == null || gols_b == null) return null
  if (gols_a > gols_b) return 'A'
  if (gols_b > gols_a) return 'B'
  if (pens_a != null && pens_b != null && pens_a !== pens_b) {
    return pens_a > pens_b ? 'A' : 'B'
  }
  return null
}

export function getVencedorDeJogo(confronto) {
  const lado = getVencedorLado(confronto)
  if (!lado) return null
  return lado === 'A' ? confronto.selecaoA : confronto.selecaoB
}

export function getPerdedorDeJogo(confronto) {
  const lado = getVencedorLado(confronto)
  if (!lado) return null
  return lado === 'A' ? confronto.selecaoB : confronto.selecaoA
}

// ── Computação completa do bracket ───────────────────────────────────────────

export function computarBracket(oitavasBase, state) {
  const { oitavas: oP, quartas: qP, semis: sP, semiFinal: sfP, terceiro: tP, final: fP } = state

  const oitavas = oitavasBase.map((c, i) => ({ ...c, ...(oP[i] || {}) }))

  const quartas = Array(8).fill(null).map((_, i) => ({
    selecaoA: getVencedorDeJogo(oitavas[i * 2]),
    selecaoB: getVencedorDeJogo(oitavas[i * 2 + 1]),
    descricaoA: `Venc. Oit. ${i * 2 + 1}`,
    descricaoB: `Venc. Oit. ${i * 2 + 2}`,
    ...(qP[i] || {}),
  }))

  const semis = Array(4).fill(null).map((_, i) => ({
    selecaoA: getVencedorDeJogo(quartas[i * 2]),
    selecaoB: getVencedorDeJogo(quartas[i * 2 + 1]),
    descricaoA: `Venc. Qua. ${i * 2 + 1}`,
    descricaoB: `Venc. Qua. ${i * 2 + 2}`,
    ...(sP[i] || {}),
  }))

  const semiFinal = Array(2).fill(null).map((_, i) => ({
    selecaoA: getVencedorDeJogo(semis[i * 2]),
    selecaoB: getVencedorDeJogo(semis[i * 2 + 1]),
    descricaoA: `Venc. Semi ${i * 2 + 1}`,
    descricaoB: `Venc. Semi ${i * 2 + 2}`,
    ...(sfP[i] || {}),
  }))

  const terceiro = {
    selecaoA: getPerdedorDeJogo(semiFinal[0]),
    selecaoB: getPerdedorDeJogo(semiFinal[1]),
    descricaoA: 'Perdedor SF1',
    descricaoB: 'Perdedor SF2',
    ...tP,
  }

  const final = {
    selecaoA: getVencedorDeJogo(semiFinal[0]),
    selecaoB: getVencedorDeJogo(semiFinal[1]),
    descricaoA: 'Venc. SF1',
    descricaoB: 'Venc. SF2',
    ...fP,
  }

  return { oitavas, quartas, semis, semiFinal, terceiro, final }
}
