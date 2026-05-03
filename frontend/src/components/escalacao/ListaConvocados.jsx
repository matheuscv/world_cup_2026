import { useState } from 'react'

const FILTROS = [
  { value: '', label: 'Todos' },
  { value: 'GK',  label: 'Goleiros' },
  { value: 'DEF', label: 'Defensores' },
  { value: 'MID', label: 'Meias' },
  { value: 'FWD', label: 'Atacantes' },
]

const COR_POS = {
  GK:  'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  DEF: 'bg-blue-500/15   text-blue-400   border-blue-500/30',
  MID: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  FWD: 'bg-red-500/15    text-red-400    border-red-500/30',
}

export default function ListaConvocados({ jogadores, titulares, slotAtivo, onDragStart, onPlayerClick }) {
  const [filtroPos, setFiltroPos] = useState('')

  const titularIds = new Set(Object.values(titulares).map(j => j.id))
  const filtrados  = jogadores.filter(j => !filtroPos || j.posicao === filtroPos)

  return (
    <div className="card p-0 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-copa-border/50 flex-shrink-0">
        <h3 className="font-display text-lg text-white">CONVOCADOS</h3>
        <p className="text-[10px] text-gray-600">
          {titularIds.size}/11 titulares escalados
        </p>
      </div>

      {/* Instrução contextual */}
      {slotAtivo && (
        <div className="px-3 py-2 bg-copa-green/10 border-b border-copa-green/30 flex-shrink-0">
          <p className="text-[11px] text-copa-green font-semibold">
            Selecione o jogador para a posição <span className="font-mono">{slotAtivo.label}</span>
          </p>
        </div>
      )}

      {/* Filtros de posição */}
      <div className="flex gap-1 flex-wrap p-3 border-b border-copa-border/20 flex-shrink-0">
        {FILTROS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFiltroPos(value)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
              filtroPos === value
                ? 'bg-copa-green text-white'
                : 'bg-copa-dark text-gray-500 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Lista de jogadores */}
      <div className="overflow-y-auto flex-1" style={{ maxHeight: '520px' }}>
        {filtrados.map(jogador => {
          const isTitular = titularIds.has(jogador.id)
          const cor = COR_POS[jogador.posicao] || 'bg-gray-700/15 text-gray-400 border-gray-600/30'
          const clicavel = slotAtivo && !isTitular

          return (
            <div
              key={jogador.id}
              draggable={!isTitular}
              onDragStart={e => !isTitular && onDragStart(e, jogador)}
              onClick={() => onPlayerClick(jogador)}
              className={[
                'flex items-center gap-2.5 px-3 py-2 border-b border-copa-border/15 last:border-0 transition-colors',
                isTitular
                  ? 'opacity-40 cursor-default'
                  : clicavel
                    ? 'cursor-pointer hover:bg-copa-green/10'
                    : 'cursor-grab hover:bg-white/[0.04] active:cursor-grabbing',
              ].join(' ')}
            >
              <span className="font-mono text-[11px] text-gray-600 w-5 text-right flex-shrink-0">
                {jogador.numero ?? '—'}
              </span>

              <div className="flex-1 min-w-0">
                <p className={`text-[13px] font-semibold truncate leading-tight ${isTitular ? 'text-gray-500' : 'text-white'}`}>
                  {jogador.nome_curto || jogador.nome}
                </p>
                {jogador.clube && (
                  <p className="text-[10px] text-gray-600 truncate leading-tight">{jogador.clube}</p>
                )}
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                {jogador.eh_capitao === 1 && (
                  <span className="text-[8px] font-bold bg-copa-gold/20 text-copa-gold border border-copa-gold/30 px-1 py-0.5 rounded">
                    CAP
                  </span>
                )}
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${cor}`}>
                  {jogador.posicao}
                </span>
                {isTitular && (
                  <span className="text-copa-green text-[11px] font-bold ml-0.5">✓</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
