import { toHoraBrasilia, toDataBrasilia } from '../../utils/formatDate.js'

const CONF_CORES = {
  CONMEBOL: 'text-yellow-400',
  UEFA:     'text-blue-400',
  CAF:      'text-green-400',
  CONCACAF: 'text-red-400',
  AFC:      'text-purple-400',
  OFC:      'text-cyan-400',
}

function MiniJogo({ jogo, selecaoId }) {
  const { selecao_a, selecao_b, gols_a, gols_b, status, data_hora_utc, grupo, rodada } = jogo
  const ehA       = selecao_a?.id === selecaoId
  const adversario = ehA ? selecao_b : selecao_a
  const golsMeus   = ehA ? gols_a : gols_b
  const golsDeles  = ehA ? gols_b : gols_a
  const encerrado  = status === 'encerrado'

  let resultado = null
  if (encerrado && golsMeus != null) {
    resultado = golsMeus > golsDeles ? 'V' : golsMeus < golsDeles ? 'D' : 'E'
  }

  const resCor = resultado === 'V' ? 'text-copa-green' : resultado === 'D' ? 'text-red-400' : 'text-gray-400'

  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-copa-dark/40 hover:bg-copa-dark/60 transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xs text-gray-600 w-12 flex-shrink-0">R{rodada}</span>
        <span className="text-lg leading-none flex-shrink-0">{adversario?.bandeira_emoji}</span>
        <span className="text-sm text-gray-300 truncate">{adversario?.nome_pt}</span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
        {encerrado && golsMeus != null ? (
          <>
            <span className="font-mono font-bold text-sm text-white">
              {golsMeus} – {golsDeles}
            </span>
            <span className={`text-xs font-bold w-5 text-center ${resCor}`}>{resultado}</span>
          </>
        ) : (
          <span className="text-xs text-copa-gold font-mono">{toHoraBrasilia(data_hora_utc)}</span>
        )}
      </div>
    </div>
  )
}

export default function PerfilSelecao({ selecao, jogos = [], selecaoAnterior, selecaoProxima, onNavegar }) {
  if (!selecao) return null

  const jogosEncerrados = jogos.filter(j => j.status === 'encerrado')
  const selecaoId = selecao.id

  const vitorias = jogosEncerrados.filter(j => {
    const ehA = j.selecao_a?.id === selecaoId
    const m = ehA ? j.gols_a : j.gols_b
    const d = ehA ? j.gols_b : j.gols_a
    return m > d
  }).length

  const empates = jogosEncerrados.filter(j => j.gols_a === j.gols_b).length
  const derrotas = jogosEncerrados.length - vitorias - empates

  const confCor = CONF_CORES[selecao.confederacao] || 'text-gray-400'

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="card p-0 overflow-hidden">
        <div className="relative bg-gradient-to-br from-copa-green/10 via-copa-card to-copa-dark px-6 py-8">
          {/* Bandeira em marca d'água */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[120px] leading-none opacity-10 select-none pointer-events-none" aria-hidden="true">
            {selecao.bandeira_emoji}
          </div>

          {/* Navegação prev/next */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => selecaoAnterior && onNavegar(selecaoAnterior)}
              disabled={!selecaoAnterior}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← {selecaoAnterior?.nome_pt ?? ''}
            </button>
            <button
              onClick={() => selecaoProxima && onNavegar(selecaoProxima)}
              disabled={!selecaoProxima}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              {selecaoProxima?.nome_pt ?? ''} →
            </button>
          </div>

          {/* Identidade */}
          <div className="flex items-center gap-4">
            <span className="text-6xl md:text-7xl leading-none">{selecao.bandeira_emoji}</span>
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-white leading-tight">{selecao.nome_pt}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={`text-sm font-semibold ${confCor}`}>{selecao.confederacao}</span>
                <span className="text-gray-700">·</span>
                <span className="text-sm font-bold bg-copa-green/20 text-copa-green px-2 py-0.5 rounded">
                  Grupo {selecao.grupo}
                </span>
                {selecao.eh_cabeca_chave && (
                  <span className="text-xs font-bold bg-copa-gold/20 text-copa-gold border border-copa-gold/30 px-1.5 py-0.5 rounded">
                    Cabeça de Chave
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-t border-copa-border/50">
          {[
            { label: 'Treinador',   value: selecao.treinador || '—' },
            { label: 'Ranking FIFA', value: selecao.ranking_fifa ? `#${selecao.ranking_fifa}` : '—' },
            { label: 'Pote',        value: `Pote ${selecao.pote}` },
            { label: 'Sede',        value: selecao.eh_sede ? 'País anfitrião 🏟️' : '—' },
          ].map(({ label, value }) => (
            <div key={label} className="px-4 py-3 border-r border-copa-border/50 last:border-0">
              <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">{label}</p>
              <p className="text-sm font-semibold text-white truncate">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Campanha na Copa */}
      {jogos.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl text-white">CAMPANHA NA COPA</h3>
            {jogosEncerrados.length > 0 && (
              <div className="flex gap-3 text-xs font-bold">
                <span className="text-copa-green">{vitorias}V</span>
                <span className="text-gray-400">{empates}E</span>
                <span className="text-red-400">{derrotas}D</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            {jogos.map(j => <MiniJogo key={j.id} jogo={j} selecaoId={selecao.id} />)}
          </div>
        </div>
      )}
    </div>
  )
}
