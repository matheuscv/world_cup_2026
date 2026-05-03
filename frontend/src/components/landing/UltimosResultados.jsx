import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ResultadoCard({ jogo }) {
  const { selecao_a, selecao_b, gols_a, gols_b, grupo, fase, cidade } = jogo
  const vitA = gols_a > gols_b
  const vitB = gols_b > gols_a
  const empate = gols_a === gols_b

  return (
    <div className="card min-w-[260px] max-w-[280px] flex-shrink-0">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 font-medium uppercase">
          {fase === 'grupo' ? `Grupo ${grupo}` : fase}
        </span>
        <span className="badge-encerrado">Encerrado</span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className={`flex flex-col items-center text-center flex-1 ${vitA ? 'opacity-100' : 'opacity-50'}`}>
          <span className="text-3xl leading-none mb-1">{selecao_a?.bandeira_emoji}</span>
          <span className="text-xs font-semibold text-white leading-tight">{selecao_a?.nome_pt}</span>
        </div>

        <div className="flex items-center gap-1 px-2">
          <span className={`font-mono font-bold text-2xl ${vitA ? 'text-white' : 'text-gray-500'}`}>{gols_a}</span>
          <span className="text-gray-600 font-bold text-sm">–</span>
          <span className={`font-mono font-bold text-2xl ${vitB ? 'text-white' : 'text-gray-500'}`}>{gols_b}</span>
        </div>

        <div className={`flex flex-col items-center text-center flex-1 ${vitB ? 'opacity-100' : 'opacity-50'}`}>
          <span className="text-3xl leading-none mb-1">{selecao_b?.bandeira_emoji}</span>
          <span className="text-xs font-semibold text-white leading-tight">{selecao_b?.nome_pt}</span>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 mt-2">{cidade}</p>
    </div>
  )
}

export default function UltimosResultados() {
  const [jogos, setJogos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/jogos?status=encerrado&limit=6')
      .then(r => r.ok ? r.json() : [])
      .then(setJogos)
      .catch(() => setJogos([]))
      .finally(() => setLoading(false))
  }, [])

  if (!loading && jogos.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl md:text-4xl text-white">ÚLTIMOS RESULTADOS</h2>
        <Link to="/tabela?status=encerrado" className="text-sm text-copa-green hover:text-green-400 transition-colors font-semibold">
          Ver todos →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3">
        {loading
          ? [1, 2, 3].map(i => (
            <div key={i} className="card min-w-[260px] animate-pulse">
              <div className="h-20 bg-copa-border rounded" />
            </div>
          ))
          : jogos.map(j => <ResultadoCard key={j.id} jogo={j} />)
        }
      </div>
    </section>
  )
}
