import { getVencedorLado } from '../../utils/classificacao.js'

function Stepper({ value, onChange, min = 0 }) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={() => onChange(Math.max(min, (value ?? 0) - 1))}
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

function ConfrontoCard({ confronto, onchange, label, destaque = false }) {
  const vencedor = getVencedorLado(confronto)
  const empate = confronto.gols_a != null && confronto.gols_b != null && confronto.gols_a === confronto.gols_b
  const mostrarPens = empate

  const selA = confronto.selecaoA
  const selB = confronto.selecaoB
  const descA = confronto.descricaoA
  const descB = confronto.descricaoB

  const linhaA = `flex items-center justify-between gap-3 px-4 py-3 transition-opacity ${vencedor === 'B' ? 'opacity-35' : ''}`
  const linhaB = `flex items-center justify-between gap-3 px-4 py-3 transition-opacity ${vencedor === 'A' ? 'opacity-35' : ''}`

  return (
    <div className={`card p-0 overflow-hidden ${destaque ? 'border-copa-gold/40 shadow-copa-gold/10 shadow-lg' : ''}`}>
      {label && (
        <div className={`px-4 py-1.5 border-b border-copa-border/30 ${destaque ? 'bg-copa-gold/10' : 'bg-copa-dark/40'}`}>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${destaque ? 'text-copa-gold' : 'text-gray-500'}`}>
            {label}
          </span>
        </div>
      )}

      {/* Time A */}
      <div className={linhaA}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0">{selA?.bandeira_emoji || '🏳️'}</span>
          <div className="min-w-0">
            {selA ? (
              <p className={`text-sm font-semibold truncate ${vencedor === 'A' ? 'text-white' : 'text-gray-300'}`}>
                {selA.nome_pt}
              </p>
            ) : (
              <p className="text-sm text-gray-600 italic">{descA}</p>
            )}
          </div>
          {vencedor === 'A' && (
            <span className="text-copa-green text-sm font-bold flex-shrink-0">✓</span>
          )}
        </div>
        <Stepper value={confronto.gols_a} onChange={v => onchange('gols_a', v)} />
      </div>

      {/* Divisória */}
      <div className="mx-4 border-t border-copa-border/20 relative flex items-center justify-center">
        <span className="absolute bg-copa-card px-2 text-[10px] text-gray-600 font-mono">×</span>
      </div>

      {/* Time B */}
      <div className={linhaB}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0">{selB?.bandeira_emoji || '🏳️'}</span>
          <div className="min-w-0">
            {selB ? (
              <p className={`text-sm font-semibold truncate ${vencedor === 'B' ? 'text-white' : 'text-gray-300'}`}>
                {selB.nome_pt}
              </p>
            ) : (
              <p className="text-sm text-gray-600 italic">{descB}</p>
            )}
          </div>
          {vencedor === 'B' && (
            <span className="text-copa-green text-sm font-bold flex-shrink-0">✓</span>
          )}
        </div>
        <Stepper value={confronto.gols_b} onChange={v => onchange('gols_b', v)} />
      </div>

      {/* Pênaltis (empate em mata-mata) */}
      {mostrarPens && (
        <div className="border-t border-copa-gold/25 bg-copa-gold/5 px-4 py-2.5">
          <p className="text-[10px] text-copa-gold font-bold uppercase tracking-wider mb-2">
            Pênaltis
          </p>
          <div className="flex items-center gap-3">
            <Stepper value={confronto.pens_a} onChange={v => onchange('pens_a', v)} min={0} />
            <span className="text-gray-600 text-xs font-mono">×</span>
            <Stepper value={confronto.pens_b} onChange={v => onchange('pens_b', v)} min={0} />
          </div>
        </div>
      )}
    </div>
  )
}

export default function Chaveamento({ confrontos, onPalpiteChange, cols = 2, destaquesIdx = [] }) {
  const colClass = cols === 1 ? '' : cols === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-4`}>
      {confrontos.map((c, i) => (
        <ConfrontoCard
          key={i}
          confronto={c}
          onchange={(field, value) => onPalpiteChange(i, field, value)}
          label={c.label}
          destaque={destaquesIdx.includes(i)}
        />
      ))}
    </div>
  )
}
