import { useState, useEffect } from 'react'
import { useJogos } from '../hooks/useJogos.js'
import JogoCard from '../components/jogos/JogoCard.jsx'
import FiltrosJogos from '../components/jogos/FiltrosJogos.jsx'
import JogoDetalheModal from '../components/jogos/JogoDetalheModal.jsx'
import { toDataBrasilia } from '../utils/formatDate.js'

function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-3 bg-copa-border rounded w-32" />
        <div className="h-5 bg-copa-border rounded w-16" />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col items-center flex-1 gap-2">
          <div className="w-10 h-8 bg-copa-border rounded" />
          <div className="h-3 bg-copa-border rounded w-20" />
        </div>
        <div className="h-8 w-16 bg-copa-border rounded" />
        <div className="flex flex-col items-center flex-1 gap-2">
          <div className="w-10 h-8 bg-copa-border rounded" />
          <div className="h-3 bg-copa-border rounded w-20" />
        </div>
      </div>
      <div className="mt-4 h-3 bg-copa-border rounded w-40" />
    </div>
  )
}

function agruparPorData(jogos) {
  const mapa = new Map()
  jogos.forEach(j => {
    const chave = j.data_hora_utc.slice(0, 10) // YYYY-MM-DD para ordenação
    if (!mapa.has(chave)) mapa.set(chave, [])
    mapa.get(chave).push(j)
  })
  return mapa
}

export default function TabelaPage() {
  useEffect(() => { document.title = 'Tabela de Jogos | Copa 2026' }, [])

  const [fase,      setFase]      = useState('')
  const [grupo,     setGrupo]     = useState('')
  const [status,    setStatus]    = useState('')
  const [selecaoId, setSelecaoId] = useState('')
  const [jogoAberto, setJogoAberto] = useState(null)

  const filtros = {}
  if (fase)      filtros.fase      = fase
  if (grupo)     filtros.grupo     = grupo
  if (status)    filtros.status    = status
  if (selecaoId) filtros.selecao_id = selecaoId

  const { jogos, loading, error } = useJogos(filtros)

  const jogosPorData = agruparPorData(jogos)
  const totalJogos   = jogos.length

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Título */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-white">TABELA DE JOGOS</h1>
          {!loading && !error && (
            <p className="text-gray-500 text-sm mt-1">
              {totalJogos} {totalJogos === 1 ? 'jogo encontrado' : 'jogos encontrados'}
            </p>
          )}
        </div>

        {/* Filtros */}
        <div className="mb-8">
          <FiltrosJogos
            fase={fase}           setFase={setFase}
            grupo={grupo}         setGrupo={setGrupo}
            status={status}       setStatus={setStatus}
            selecaoId={selecaoId} setSelecaoId={setSelecaoId}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map(i => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Erro */}
        {error && (
          <div className="card border-red-900/50 bg-red-900/10 text-red-400 text-center py-8">
            <p className="font-semibold mb-1">Erro ao carregar jogos</p>
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {/* Vazio */}
        {!loading && !error && jogos.length === 0 && (
          <div className="card text-center py-16 text-gray-500">
            <p className="text-4xl mb-3">⚽</p>
            <p className="text-lg font-semibold text-gray-400 mb-1">Nenhum jogo encontrado</p>
            <p className="text-sm">Tente alterar os filtros acima</p>
          </div>
        )}

        {/* Lista agrupada por data */}
        {!loading && !error && [...jogosPorData.entries()].map(([dataKey, jogosDoDia]) => {
          const dataFormatada = toDataBrasilia(jogosDoDia[0].data_hora_utc)
          return (
            <div key={dataKey} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-sm font-bold text-copa-gold uppercase tracking-wider capitalize">
                  {dataFormatada}
                </h2>
                <div className="flex-1 h-px bg-copa-border" />
                <span className="text-xs text-gray-600">
                  {jogosDoDia.length} {jogosDoDia.length === 1 ? 'jogo' : 'jogos'}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {jogosDoDia.map(jogo => (
                  <JogoCard
                    key={jogo.id}
                    jogo={jogo}
                    onClick={() => setJogoAberto(jogo)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal de detalhe */}
      {jogoAberto && (
        <JogoDetalheModal
          jogo={jogoAberto}
          onClose={() => setJogoAberto(null)}
        />
      )}
    </>
  )
}
