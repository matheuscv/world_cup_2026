import { useState, useEffect } from 'react'

const POTES = [1, 2, 3, 4]

const POTE_LABELS = {
  1: { label: 'Pote 1', desc: 'Cabeças de Chave', cor: 'text-copa-gold border-copa-gold/30 bg-copa-gold/10' },
  2: { label: 'Pote 2', desc: 'Top seeds',        cor: 'text-gray-300 border-gray-600/30 bg-white/5' },
  3: { label: 'Pote 3', desc: 'Mid seeds',        cor: 'text-gray-400 border-gray-700/30 bg-white/[0.02]' },
  4: { label: 'Pote 4', desc: 'Lower seeds',      cor: 'text-gray-500 border-gray-700/30 bg-white/[0.02]' },
}

function SelecaoItem({ selecao }) {
  return (
    <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors group">
      <span className="text-xl leading-none flex-shrink-0">{selecao.bandeira_emoji}</span>
      <div className="min-w-0">
        <span className={`text-sm font-medium truncate block ${selecao.eh_cabeca_chave ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
          {selecao.nome_pt}
        </span>
        <span className="text-[10px] text-gray-600">Grupo {selecao.grupo}</span>
      </div>
      {selecao.eh_cabeca_chave && (
        <span className="flex-shrink-0 text-[9px] font-bold bg-copa-gold/20 text-copa-gold border border-copa-gold/30 px-1.5 py-0.5 rounded ml-auto">
          C1
        </span>
      )}
    </div>
  )
}

export default function PotesSection() {
  const [selecoes, setSelecoes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/selecoes')
      .then(r => r.ok ? r.json() : [])
      .then(setSelecoes)
      .catch(() => [])
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        {POTES.map(p => (
          <div key={p} className="card animate-pulse">
            <div className="h-5 bg-copa-border rounded w-20 mb-4" />
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-8 bg-copa-border rounded mb-1" />
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-12">
      <div className="mb-6">
        <h2 className="font-display text-3xl md:text-4xl text-white">DISTRIBUIÇÃO POR POTES</h2>
        <p className="text-gray-500 text-sm mt-1">As 48 seleções organizadas conforme o sorteio da FIFA</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {POTES.map(pote => {
          const cfg = POTE_LABELS[pote]
          const times = selecoes
            .filter(s => s.pote === pote)
            .sort((a, b) => a.grupo.localeCompare(b.grupo))

          return (
            <div key={pote} className={`card border ${cfg.cor} flex flex-col`}>
              <div className="mb-3 pb-2 border-b border-current/20">
                <p className={`font-display text-lg ${cfg.cor.split(' ')[0]}`}>{cfg.label}</p>
                <p className="text-[11px] text-gray-500">{cfg.desc} · {times.length} seleções</p>
              </div>
              <div className="flex flex-col">
                {times.map(s => <SelecaoItem key={s.id} selecao={s} />)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
