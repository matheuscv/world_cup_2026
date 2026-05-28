import { useEffect, useState } from 'react'
import { toHoraBrasilia, toDataBrasilia } from '../../utils/formatDate.js'
import Flag from '../ui/Flag'

const FASE_LABELS = {
  grupo:    (g, r) => `Fase de Grupos — Grupo ${g}${r ? ` · Rodada ${r}` : ''}`,
  oitavas:  ()     => 'Oitavas de Final',
  quartas:  ()     => 'Quartas de Final',
  semi:     ()     => 'Semifinal',
  terceiro: ()     => 'Disputa pelo 3º Lugar',
  final:    ()     => 'Final',
}

function MiniTabela({ classificacao, selecaoAId, selecaoBId }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-gray-600 uppercase">
            <th className="text-left py-1 pr-2 font-medium">#</th>
            <th className="text-left py-1 font-medium">Seleção</th>
            <th className="text-center py-1 w-6">J</th>
            <th className="text-center py-1 w-6">V</th>
            <th className="text-center py-1 w-6">E</th>
            <th className="text-center py-1 w-6">D</th>
            <th className="text-center py-1 w-8">SG</th>
            <th className="text-center py-1 w-8 font-bold text-gray-400">Pts</th>
          </tr>
        </thead>
        <tbody>
          {classificacao.map((item, idx) => {
            const isDestaque = item.selecao_id === selecaoAId || item.selecao_id === selecaoBId
            const corBorda = idx < 2 ? 'border-copa-green' : idx === 2 ? 'border-copa-gold/40' : 'border-red-800/40'
            return (
              <tr
                key={item.selecao_id}
                className={`border-b border-copa-border/30 last:border-0 border-l-2 ${corBorda} ${isDestaque ? 'bg-white/5' : ''}`}
              >
                <td className="py-1.5 pr-2 pl-2 text-gray-500">{idx + 1}</td>
                <td className="py-1.5">
                  <div className="flex items-center gap-1.5">
                    <Flag codigoIso={item.codigo_iso} nome={item.nome_pt} size="xs" />
                    <span className={`font-medium truncate max-w-[100px] ${isDestaque ? 'text-white' : 'text-gray-400'}`}>
                      {item.nome_pt}
                    </span>
                    {isDestaque && <span className="text-copa-gold text-[10px]">●</span>}
                  </div>
                </td>
                <td className="text-center py-1.5 text-gray-500">{item.jogos ?? 0}</td>
                <td className="text-center py-1.5 text-gray-500">{item.vitorias ?? 0}</td>
                <td className="text-center py-1.5 text-gray-500">{item.empates ?? 0}</td>
                <td className="text-center py-1.5 text-gray-500">{item.derrotas ?? 0}</td>
                <td className="text-center py-1.5 text-gray-500">{item.saldo_gols ?? 0}</td>
                <td className="text-center py-1.5 font-bold text-white">{item.pontos ?? 0}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function JogoDetalheModal({ jogo, onClose }) {
  const [grupoData, setGrupoData] = useState(null)
  const [loadingGrupo, setLoadingGrupo] = useState(false)

  // Fechar com ESC
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Travar scroll do body
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Buscar dados do grupo
  useEffect(() => {
    if (!jogo?.grupo) return
    setLoadingGrupo(true)
    fetch(`/api/grupos/${jogo.grupo}`)
      .then(r => r.ok ? r.json() : null)
      .then(setGrupoData)
      .catch(() => null)
      .finally(() => setLoadingGrupo(false))
  }, [jogo?.grupo])

  if (!jogo) return null

  const {
    selecao_a, selecao_b,
    gols_a, gols_b, penaltis_a, penaltis_b,
    status, data_hora_utc, estadio, cidade, pais_sede,
    fase, grupo, rodada,
  } = jogo

  const encerrado    = status === 'encerrado'
  const aoVivo       = status === 'em_andamento'
  const temPlacar    = encerrado || aoVivo
  const temPenaltis  = penaltis_a != null && penaltis_b != null
  const vitA         = encerrado && gols_a > gols_b
  const vitB         = encerrado && gols_b > gols_a
  const faseLabel    = FASE_LABELS[fase]?.(grupo, rodada) ?? fase

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Detalhes do jogo"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Painel */}
      <div className="relative bg-copa-card border border-copa-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-copa-border">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{faseLabel}</p>
            <p className="text-sm text-gray-400 mt-0.5">{toDataBrasilia(data_hora_utc)}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {/* Confronto principal */}
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            {/* Seleção A */}
            <div className={`flex flex-col items-center text-center flex-1 ${encerrado && vitB ? 'opacity-40' : ''}`}>
              <Flag codigoIso={selecao_a?.codigo_iso} nome={selecao_a?.nome_pt} size="xl" className="mb-3" />
              <span className={`font-bold text-base ${vitA ? 'text-white' : 'text-gray-300'}`}>
                {selecao_a?.nome_pt}
              </span>
            </div>

            {/* Placar */}
            <div className="flex flex-col items-center min-w-[90px]">
              {temPlacar ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono font-bold text-4xl ${vitA ? 'text-white' : 'text-gray-500'}`}>
                      {gols_a ?? 0}
                    </span>
                    <span className="text-gray-600 font-bold">–</span>
                    <span className={`font-mono font-bold text-4xl ${vitB ? 'text-white' : 'text-gray-500'}`}>
                      {gols_b ?? 0}
                    </span>
                  </div>
                  {temPenaltis && (
                    <span className="text-sm text-copa-gold mt-1">
                      Pênaltis: {penaltis_a} – {penaltis_b}
                    </span>
                  )}
                  {aoVivo && (
                    <span className="text-xs text-copa-green animate-pulse mt-1 font-semibold">
                      AO VIVO
                    </span>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <span className="font-mono text-copa-gold font-bold text-2xl block">vs</span>
                  <span className="text-copa-gold font-mono font-bold text-sm mt-1 block">
                    {toHoraBrasilia(data_hora_utc)}
                  </span>
                </div>
              )}
            </div>

            {/* Seleção B */}
            <div className={`flex flex-col items-center text-center flex-1 ${encerrado && vitA ? 'opacity-40' : ''}`}>
              <Flag codigoIso={selecao_b?.codigo_iso} nome={selecao_b?.nome_pt} size="xl" className="mb-3" />
              <span className={`font-bold text-base ${vitB ? 'text-white' : 'text-gray-300'}`}>
                {selecao_b?.nome_pt}
              </span>
            </div>
          </div>
        </div>

        {/* Informações do jogo */}
        <div className="px-6 pb-4 grid grid-cols-2 gap-3">
          <div className="bg-copa-dark/50 rounded-lg p-3">
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Estádio</p>
            <p className="text-sm text-gray-300 font-medium">{estadio}</p>
          </div>
          <div className="bg-copa-dark/50 rounded-lg p-3">
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Local</p>
            <p className="text-sm text-gray-300 font-medium">{cidade}, {pais_sede}</p>
          </div>
          <div className="bg-copa-dark/50 rounded-lg p-3">
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Horário (Brasília)</p>
            <p className="text-sm text-copa-gold font-mono font-bold">{toHoraBrasilia(data_hora_utc)}</p>
          </div>
          <div className="bg-copa-dark/50 rounded-lg p-3">
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Status</p>
            <p className="text-sm text-gray-300 font-medium capitalize">{
              status === 'agendado' ? 'Agendado' :
              status === 'em_andamento' ? '🟢 Ao Vivo' :
              'Encerrado'
            }</p>
          </div>
        </div>

        {/* Mini-tabela do grupo */}
        {grupo && (
          <div className="px-6 pb-6">
            <div className="border-t border-copa-border pt-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                Classificação — Grupo {grupo}
              </p>
              {loadingGrupo ? (
                <div className="space-y-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-7 bg-copa-dark/50 rounded animate-pulse" />
                  ))}
                </div>
              ) : grupoData?.classificacao ? (
                <MiniTabela
                  classificacao={grupoData.classificacao}
                  selecaoAId={selecao_a?.id}
                  selecaoBId={selecao_b?.id}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
