import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toHoraBrasilia, toDataBrasilia } from '../../utils/formatDate.js'

function Skeleton() {
  return (
    <div className="card min-w-[280px] animate-pulse flex-shrink-0">
      <div className="flex justify-between mb-4">
        <div className="h-3 bg-copa-border rounded w-20" />
        <div className="h-3 bg-copa-border rounded w-14" />
      </div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-10 h-8 bg-copa-border rounded" />
          <div className="h-3 bg-copa-border rounded w-16" />
        </div>
        <div className="h-5 w-6 bg-copa-border rounded" />
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-10 h-8 bg-copa-border rounded" />
          <div className="h-3 bg-copa-border rounded w-16" />
        </div>
      </div>
      <div className="h-3 bg-copa-border rounded w-32 mx-auto" />
    </div>
  )
}

function JogoMiniCard({ jogo }) {
  const { selecao_a, selecao_b, data_hora_utc, estadio, cidade, grupo, fase } = jogo
  return (
    <div className="card min-w-[280px] max-w-[300px] flex-shrink-0 hover:border-copa-green/50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500 font-medium uppercase">
          {fase === 'grupo' ? `Grupo ${grupo}` : fase}
        </span>
        <span className="text-xs text-copa-gold font-mono font-semibold">
          {toHoraBrasilia(data_hora_utc)}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex flex-col items-center text-center flex-1">
          <span className="text-3xl leading-none mb-1">{selecao_a?.bandeira_emoji}</span>
          <span className="text-xs font-semibold text-white leading-tight">{selecao_a?.nome_pt}</span>
        </div>
        <span className="text-gray-600 font-bold text-sm px-1">vs</span>
        <div className="flex flex-col items-center text-center flex-1">
          <span className="text-3xl leading-none mb-1">{selecao_b?.bandeira_emoji}</span>
          <span className="text-xs font-semibold text-white leading-tight">{selecao_b?.nome_pt}</span>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 truncate">{estadio} · {cidade}</p>
    </div>
  )
}

export default function ProximosJogos() {
  const [jogos, setJogos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/jogos?status=agendado&limit=6')
      .then(r => r.ok ? r.json() : [])
      .then(setJogos)
      .catch(() => setJogos([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-3xl md:text-4xl text-white">PRÓXIMOS JOGOS</h2>
        <Link to="/tabela" className="text-sm text-copa-green hover:text-green-400 transition-colors font-semibold">
          Ver todos →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-thin">
        {loading
          ? [1, 2, 3].map(i => <Skeleton key={i} />)
          : jogos.length === 0
          ? (
            <div className="card w-full text-center py-8 text-gray-400">
              Nenhum jogo agendado encontrado.
            </div>
          )
          : jogos.map(j => <JogoMiniCard key={j.id} jogo={j} />)
        }
      </div>
    </section>
  )
}
