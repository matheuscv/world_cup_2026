import { useState } from 'react'

const LETRAS = ['A','B','C','D','E','F','G','H','I','J','K','L']

function nomeAbrev(selecao) {
  if (!selecao) return '?'
  const n = selecao.nome_pt || selecao.nome || ''
  return n.length > 12 ? n.slice(0, 11) + '…' : n
}

function Stepper({ value, onChange }) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={() => onChange(Math.max(0, (value ?? 0) - 1))}
        className="w-6 h-6 rounded bg-copa-dark border border-copa-border text-gray-400 hover:text-white text-sm flex items-center justify-center transition-colors"
      >−</button>
      <span className="w-7 text-center font-mono font-bold text-sm text-white select-none">
        {value ?? <span className="text-gray-600">·</span>}
      </span>
      <button
        onClick={() => onChange((value ?? 0) + 1)}
        className="w-6 h-6 rounded bg-copa-dark border border-copa-border text-gray-400 hover:text-white text-sm flex items-center justify-center transition-colors"
      >+</button>
    </div>
  )
}

function badgeAcerto(jogo, palpite) {
  const { real_gols_a: ra, real_gols_b: rb } = jogo
  if (ra == null || rb == null) return null
  const p = palpite
  if (!p || p.gols_a == null) return null
  if (p.gols_a === ra && p.gols_b === rb) return { cls: 'text-copa-green', label: '✓' }
  const resReal = ra > rb ? 'A' : rb > ra ? 'B' : 'E'
  const resPal  = p.gols_a > p.gols_b ? 'A' : p.gols_b > p.gols_a ? 'B' : 'E'
  return resReal === resPal
    ? { cls: 'text-copa-gold', label: '≈' }
    : { cls: 'text-red-400', label: '✗' }
}

function JogoRow({ jogo, palpite, onChange }) {
  const gols_a = palpite?.gols_a ?? null
  const gols_b = palpite?.gols_b ?? null
  const preenchido = gols_a != null && gols_b != null
  const badge = badgeAcerto(jogo, palpite)

  function setA(v) { onChange(jogo.id, v, gols_b ?? 0) }
  function setB(v) { onChange(jogo.id, gols_a ?? 0, v) }
  function setEmpate() {
    const score = gols_a ?? 0
    onChange(jogo.id, score, score)
  }

  return (
    <div className={`flex items-center gap-2 py-2 border-b border-copa-border/15 last:border-0 ${preenchido ? '' : 'opacity-80'}`}>
      <span className="text-[10px] text-gray-600 w-5 text-center flex-shrink-0">R{jogo.rodada}</span>

      {/* Time A */}
      <div className="flex items-center gap-1 flex-1 justify-end min-w-0">
        <span className="text-xs text-gray-300 truncate hidden sm:block">{nomeAbrev(jogo.selecao_a)}</span>
        <span className="text-base flex-shrink-0">{jogo.selecao_a?.bandeira_emoji}</span>
      </div>

      {/* Placar */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <Stepper value={gols_a} onChange={setA} />
        <button
          onClick={setEmpate}
          className="text-[9px] font-bold text-gray-600 hover:text-copa-gold transition-colors px-1 hidden xs:block"
          title="Empate rápido"
        >E</button>
        <span className="text-gray-600 text-xs">×</span>
        <Stepper value={gols_b} onChange={setB} />
      </div>

      {/* Time B */}
      <div className="flex items-center gap-1 flex-1 min-w-0">
        <span className="text-base flex-shrink-0">{jogo.selecao_b?.bandeira_emoji}</span>
        <span className="text-xs text-gray-300 truncate hidden sm:block">{nomeAbrev(jogo.selecao_b)}</span>
      </div>

      {/* Badge de acerto */}
      {badge ? (
        <span className={`text-xs font-bold flex-shrink-0 w-4 text-center ${badge.cls}`} title={
          badge.label === '✓' ? 'Placar exato!' : badge.label === '≈' ? 'Resultado correto' : 'Resultado errado'
        }>
          {badge.label}
        </span>
      ) : (
        <span className="w-4 flex-shrink-0" />
      )}
    </div>
  )
}

function MiniTabela({ classificacao }) {
  const cores = ['bg-copa-green/30', 'bg-copa-green/30', 'bg-copa-gold/15', 'bg-red-900/15']

  return (
    <table className="w-full text-[11px]">
      <thead>
        <tr className="text-gray-600 uppercase tracking-wide">
          <th className="text-left py-1 pl-2 w-5">#</th>
          <th className="text-left py-1">Seleção</th>
          <th className="text-center py-1 w-7">Pts</th>
          <th className="text-center py-1 w-7">SG</th>
          <th className="text-center py-1 w-6">GP</th>
        </tr>
      </thead>
      <tbody>
        {classificacao.map((entry, i) => (
          <tr key={entry.selecao.id} className={`${cores[i] || ''} rounded`}>
            <td className="pl-2 py-1 font-bold text-gray-400">{i + 1}</td>
            <td className="py-1">
              <div className="flex items-center gap-1">
                <span className="text-sm">{entry.selecao.bandeira_emoji}</span>
                <span className={`truncate max-w-[100px] ${i < 2 ? 'text-white font-semibold' : 'text-gray-400'}`}>
                  {nomeAbrev(entry.selecao)}
                </span>
              </div>
            </td>
            <td className={`text-center py-1 font-bold ${i < 2 ? 'text-copa-green' : 'text-gray-500'}`}>{entry.pts}</td>
            <td className={`text-center py-1 font-mono ${entry.sg > 0 ? 'text-green-400' : entry.sg < 0 ? 'text-red-400' : 'text-gray-500'}`}>
              {entry.sg > 0 ? `+${entry.sg}` : entry.sg}
            </td>
            <td className="text-center py-1 text-gray-500 font-mono">{entry.gp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function GrupoCard({ grupo, palpites, onPalpiteChange }) {
  const { letra, jogos, classificacao } = grupo
  const preenchidos = jogos.filter(j => palpites[j.id]?.gols_a != null).length

  return (
    <div className="card p-0 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-copa-border/50 bg-copa-dark/30">
        <h3 className="font-display text-xl text-white">GRUPO {letra}</h3>
        <span className="text-[10px] text-gray-600">{preenchidos}/6 jogos</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-copa-border/20">
        {/* Tabela de classificação */}
        <div className="p-3">
          <MiniTabela classificacao={classificacao} />
        </div>

        {/* Jogos */}
        <div className="p-3">
          {jogos
            .sort((a, b) => a.rodada - b.rodada)
            .map(jogo => (
              <JogoRow
                key={jogo.id}
                jogo={jogo}
                palpite={palpites[jogo.id]}
                onChange={onPalpiteChange}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default function SimuladorGrupos({ grupos, palpites, onPalpiteChange }) {
  const [grupoFiltro, setGrupoFiltro] = useState('')

  const totalPalpites = Object.keys(palpites).length
  const gruposVisiveis = grupoFiltro
    ? grupos.filter(g => g.letra === grupoFiltro)
    : grupos

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        <button
          onClick={() => setGrupoFiltro('')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            !grupoFiltro ? 'bg-copa-green text-white' : 'bg-copa-card border border-copa-border text-gray-400 hover:text-white'
          }`}
        >
          Todos
        </button>
        {LETRAS.map(l => (
          <button
            key={l}
            onClick={() => setGrupoFiltro(l === grupoFiltro ? '' : l)}
            className={`w-10 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              grupoFiltro === l
                ? 'bg-copa-green text-white'
                : 'bg-copa-card border border-copa-border text-gray-400 hover:text-white'
            }`}
          >
            {l}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-600 self-center">
          {totalPalpites}/72 palpites
        </span>
      </div>

      {/* Grupos */}
      <div className="space-y-4">
        {gruposVisiveis.map(g => (
          <GrupoCard
            key={g.letra}
            grupo={g}
            palpites={palpites}
            onPalpiteChange={onPalpiteChange}
          />
        ))}
      </div>
    </div>
  )
}
