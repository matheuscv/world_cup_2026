import { toHoraBrasilia } from '../../utils/formatDate.js'
import Flag from '../ui/Flag'

const STATUS_CONFIG = {
  agendado:     { label: 'Agendado',  className: 'badge-agendado' },
  em_andamento: { label: 'Ao Vivo',   className: 'badge-em-andamento' },
  encerrado:    { label: 'Encerrado', className: 'badge-encerrado' },
}

const FASE_LABELS = {
  grupo:    (g) => `Grupo ${g}`,
  oitavas:  ()  => 'Oitavas de Final',
  quartas:  ()  => 'Quartas de Final',
  semi:     ()  => 'Semifinal',
  terceiro: ()  => '3º Lugar',
  final:    ()  => 'Final',
}

export default function JogoCard({ jogo, onClick }) {
  const {
    selecao_a, selecao_b,
    gols_a, gols_b, penaltis_a, penaltis_b,
    status, data_hora_utc, estadio, cidade,
    fase, grupo, rodada,
  } = jogo

  const cfg     = STATUS_CONFIG[status] || STATUS_CONFIG.agendado
  const encerrado = status === 'encerrado'
  const aoVivo    = status === 'em_andamento'
  const temPlacar = encerrado || aoVivo

  const vitA = encerrado && gols_a > gols_b
  const vitB = encerrado && gols_b > gols_a

  const faseLabel = FASE_LABELS[fase]?.(grupo) ?? fase
  const rodadaLabel = fase === 'grupo' && rodada ? ` · Rodada ${rodada}` : ''

  const temPenaltis = penaltis_a != null && penaltis_b != null

  const handleKey = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      className={`
        card transition-all
        ${onClick ? 'cursor-pointer hover:border-copa-green/50 hover:bg-copa-green/[0.02]' : ''}
        ${aoVivo ? 'border-copa-green/40 shadow-[0_0_20px_rgba(0,156,59,0.1)]' : ''}
      `}
      onClick={onClick}
      onKeyDown={handleKey}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`${selecao_a?.nome_pt} vs ${selecao_b?.nome_pt}`}
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="font-semibold text-gray-400">{faseLabel}</span>
          <span className="text-gray-700">{rodadaLabel || ` · ${toHoraBrasilia(data_hora_utc)}`}</span>
          {!rodada && <span className="text-gray-700">· {toHoraBrasilia(data_hora_utc)}</span>}
        </div>
        <span className={cfg.className}>{cfg.label}</span>
      </div>

      {/* Confronto */}
      <div className="flex items-center justify-between gap-2">
        {/* Seleção A */}
        <div className={`flex flex-col items-center text-center flex-1 transition-opacity ${encerrado && vitB ? 'opacity-40' : 'opacity-100'}`}>
          <Flag codigoIso={selecao_a?.codigo_iso} nome={selecao_a?.nome_pt} size="lg" className="mb-2" />
          <span className={`text-sm font-semibold leading-tight ${vitA ? 'text-white' : 'text-gray-300'}`}>
            {selecao_a?.nome_pt}
          </span>
        </div>

        {/* Placar / VS */}
        <div className="flex flex-col items-center px-3 min-w-[80px]">
          {temPlacar ? (
            <>
              <div className="flex items-center gap-2">
                <span className={`font-mono font-bold text-2xl md:text-3xl ${vitA ? 'text-white' : 'text-gray-400'}`}>
                  {gols_a ?? 0}
                </span>
                <span className="text-gray-600 font-bold text-sm">–</span>
                <span className={`font-mono font-bold text-2xl md:text-3xl ${vitB ? 'text-white' : 'text-gray-400'}`}>
                  {gols_b ?? 0}
                </span>
              </div>
              {temPenaltis && (
                <span className="text-xs text-copa-gold mt-1">
                  (pen. {penaltis_a} – {penaltis_b})
                </span>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center">
              <span className="font-mono text-copa-gold font-bold text-lg">vs</span>
              <span className="text-xs text-gray-600 mt-1">{toHoraBrasilia(data_hora_utc)}</span>
            </div>
          )}
        </div>

        {/* Seleção B */}
        <div className={`flex flex-col items-center text-center flex-1 transition-opacity ${encerrado && vitA ? 'opacity-40' : 'opacity-100'}`}>
          <Flag codigoIso={selecao_b?.codigo_iso} nome={selecao_b?.nome_pt} size="lg" className="mb-2" />
          <span className={`text-sm font-semibold leading-tight ${vitB ? 'text-white' : 'text-gray-300'}`}>
            {selecao_b?.nome_pt}
          </span>
        </div>
      </div>

      {/* Rodapé */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-600 truncate">{estadio} · {cidade}</span>
        {onClick && (
          <span className="text-xs text-gray-700 hover:text-copa-green transition-colors ml-2 flex-shrink-0">
            Detalhes →
          </span>
        )}
      </div>
    </div>
  )
}
