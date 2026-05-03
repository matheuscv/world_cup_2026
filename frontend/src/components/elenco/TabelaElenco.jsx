import { useState } from 'react'

const POSICOES = [
  { value: '',    label: 'Todos' },
  { value: 'GK',  label: 'Goleiros' },
  { value: 'DEF', label: 'Defensores' },
  { value: 'MID', label: 'Meias' },
  { value: 'FWD', label: 'Atacantes' },
]

const POSICAO_PT = {
  GK:  'Goleiro',
  DEF: 'Defensor',
  MID: 'Meia',
  FWD: 'Atacante',
}

const POSICAO_COR = {
  GK:  'bg-yellow-500/20 text-yellow-400',
  DEF: 'bg-blue-500/20 text-blue-400',
  MID: 'bg-green-500/20 text-green-400',
  FWD: 'bg-red-500/20 text-red-400',
}

const POSICAO_ORDER = { GK: 0, DEF: 1, MID: 2, FWD: 3 }

function LinhaJogador({ jogador }) {
  const corPos = POSICAO_COR[jogador.posicao] || 'bg-gray-700 text-gray-400'

  return (
    <tr className="border-b border-copa-border/30 last:border-0 hover:bg-white/[0.02] transition-colors group">
      <td className="py-3 pl-4 pr-2 w-10 text-center">
        <span className="font-mono text-sm text-gray-500">
          {jogador.numero ?? '—'}
        </span>
      </td>
      <td className="py-3 pr-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-white">{jogador.nome}</span>
          {jogador.eh_capitao === 1 && (
            <span
              className="text-[10px] font-bold bg-copa-gold/25 text-copa-gold border border-copa-gold/40 px-1.5 py-0.5 rounded flex-shrink-0"
              title="Capitão"
            >
              CAP
            </span>
          )}
        </div>
        {jogador.nome_curto && jogador.nome_curto !== jogador.nome && (
          <span className="text-xs text-gray-600">{jogador.nome_curto}</span>
        )}
      </td>
      <td className="py-3 pr-3">
        <span className={`text-[10px] font-bold px-2 py-1 rounded ${corPos}`}>
          {POSICAO_PT[jogador.posicao] ?? jogador.posicao}
        </span>
      </td>
      <td className="py-3 pr-3 text-sm text-gray-400 hidden md:table-cell">
        {jogador.clube || '—'}
      </td>
      <td className="py-3 pr-4 text-sm text-gray-500 text-center w-14 hidden sm:table-cell">
        {jogador.idade ?? '—'}
      </td>
    </tr>
  )
}

export default function TabelaElenco({ jogadores = [], loading = false }) {
  const [posicaoFiltro, setPosicaoFiltro] = useState('')

  const filtrados = jogadores
    .filter(j => !posicaoFiltro || j.posicao === posicaoFiltro)
    .sort((a, b) => {
      const ordem = POSICAO_ORDER[a.posicao] - POSICAO_ORDER[b.posicao]
      if (ordem !== 0) return ordem
      return (a.numero ?? 99) - (b.numero ?? 99)
    })

  return (
    <div className="card p-0 overflow-hidden">
      {/* Header + filtros de posição */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-copa-border/50">
        <div>
          <h3 className="font-display text-xl text-white">ELENCO</h3>
          <p className="text-xs text-gray-600">{jogadores.length} jogadores convocados</p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {POSICOES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setPosicaoFiltro(value)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                posicaoFiltro === value
                  ? 'bg-copa-green text-white'
                  : 'bg-copa-dark text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela */}
      {loading ? (
        <div className="p-4 space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-3 items-center animate-pulse">
              <div className="w-8 h-4 bg-copa-border rounded" />
              <div className="flex-1 h-4 bg-copa-border rounded" />
              <div className="w-16 h-4 bg-copa-border rounded" />
              <div className="w-24 h-4 bg-copa-border rounded hidden md:block" />
              <div className="w-8 h-4 bg-copa-border rounded hidden sm:block" />
            </div>
          ))}
        </div>
      ) : filtrados.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>Nenhum jogador nessa posição.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-600 text-[10px] uppercase tracking-wide">
                <th className="text-center py-2 pl-4 pr-2 w-10">#</th>
                <th className="text-left py-2 pr-3">Nome</th>
                <th className="text-left py-2 pr-3">Posição</th>
                <th className="text-left py-2 pr-3 hidden md:table-cell">Clube</th>
                <th className="text-center py-2 pr-4 w-14 hidden sm:table-cell">Idade</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(j => <LinhaJogador key={j.id} jogador={j} />)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
