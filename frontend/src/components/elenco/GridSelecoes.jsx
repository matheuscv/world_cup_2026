import { useState, useMemo } from 'react'
import Flag from '../ui/Flag'

const CONFEDERACOES = ['CONMEBOL', 'UEFA', 'CAF', 'CONCACAF', 'AFC', 'OFC']

function CardSelecao({ selecao, onClick }) {
  return (
    <button
      onClick={() => onClick(selecao)}
      className="card text-left hover:border-copa-green/50 hover:bg-copa-green/5 transition-all group p-4 w-full"
    >
      <div className="flex items-center gap-3">
        <Flag codigoIso={selecao.codigo_iso} nome={selecao.nome_pt} size="lg" className="flex-shrink-0 group-hover:scale-110 transition-transform" />
        <div className="min-w-0">
          <p className="font-bold text-sm text-white truncate group-hover:text-copa-green transition-colors">
            {selecao.nome_pt}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] font-bold bg-copa-green/20 text-copa-green px-1.5 py-0.5 rounded">
              Grupo {selecao.grupo}
            </span>
            {selecao.eh_cabeca_chave ? (
              <span className="text-[10px] font-bold bg-copa-gold/20 text-copa-gold border border-copa-gold/30 px-1.5 py-0.5 rounded">
                C1
              </span>
            ) : (
              <span className="text-[10px] text-gray-600">P{selecao.pote}</span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

export default function GridSelecoes({ selecoes, onSelect }) {
  const [busca, setBusca]           = useState('')
  const [confFiltro, setConfFiltro] = useState('')
  const [grupoFiltro, setGrupoFiltro] = useState('')

  const grupos = useMemo(() => {
    const set = new Set(selecoes.map(s => s.grupo))
    return [...set].sort()
  }, [selecoes])

  const filtradas = useMemo(() => {
    const q = busca.toLowerCase().trim()
    return selecoes.filter(s => {
      if (q && !s.nome_pt.toLowerCase().includes(q) && !s.nome?.toLowerCase().includes(q)) return false
      if (confFiltro && s.confederacao !== confFiltro) return false
      if (grupoFiltro && s.grupo !== grupoFiltro) return false
      return true
    })
  }, [selecoes, busca, confFiltro, grupoFiltro])

  const temFiltro = busca || confFiltro || grupoFiltro

  return (
    <div>
      {/* Barra de busca */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
          <input
            type="text"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar seleção..."
            className="w-full bg-copa-card border border-copa-border rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-copa-green transition-colors"
          />
        </div>
        <select
          value={confFiltro}
          onChange={e => setConfFiltro(e.target.value)}
          className="bg-copa-card border border-copa-border text-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-copa-green cursor-pointer"
        >
          <option value="">Todas as confederações</option>
          {CONFEDERACOES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={grupoFiltro}
          onChange={e => setGrupoFiltro(e.target.value)}
          className="bg-copa-card border border-copa-border text-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-copa-green cursor-pointer"
        >
          <option value="">Todos os grupos</option>
          {grupos.map(g => <option key={g} value={g}>Grupo {g}</option>)}
        </select>
        {temFiltro && (
          <button
            onClick={() => { setBusca(''); setConfFiltro(''); setGrupoFiltro('') }}
            className="btn-secondary text-sm py-2.5 px-4 whitespace-nowrap"
          >
            ✕ Limpar
          </button>
        )}
      </div>

      {/* Contador */}
      <p className="text-xs text-gray-600 mb-4">
        {filtradas.length} {filtradas.length === 1 ? 'seleção' : 'seleções'}
        {temFiltro && ` (de ${selecoes.length})`}
      </p>

      {/* Grid */}
      {filtradas.length === 0 ? (
        <div className="card text-center py-16 text-gray-500">
          <p className="text-3xl mb-3">🔍</p>
          <p className="font-semibold text-gray-400">Nenhuma seleção encontrada</p>
          <p className="text-sm mt-1">Tente alterar os filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtradas.map(s => (
            <CardSelecao key={s.id} selecao={s} onClick={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}
