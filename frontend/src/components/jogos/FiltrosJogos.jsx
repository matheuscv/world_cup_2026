import { useState, useEffect } from 'react'

const FASES = [
  { value: '',        label: 'Todas as fases' },
  { value: 'grupo',   label: 'Fase de Grupos' },
  { value: 'oitavas', label: 'Oitavas de Final' },
  { value: 'quartas', label: 'Quartas de Final' },
  { value: 'semi',    label: 'Semifinais' },
  { value: 'terceiro',label: '3º Lugar' },
  { value: 'final',   label: 'Final' },
]

const GRUPOS = ['A','B','C','D','E','F','G','H','I','J','K','L']

const STATUS_OPTS = [
  { value: '',            label: 'Todos os status' },
  { value: 'agendado',    label: 'Agendados' },
  { value: 'em_andamento',label: 'Ao Vivo' },
  { value: 'encerrado',   label: 'Encerrados' },
]

const SELECT_CLASS = `
  bg-copa-card border border-copa-border text-gray-300 rounded-lg px-3 py-2 text-sm
  focus:outline-none focus:border-copa-green cursor-pointer
  hover:border-gray-600 transition-colors
`

export default function FiltrosJogos({
  fase, setFase,
  grupo, setGrupo,
  status, setStatus,
  selecaoId, setSelecaoId,
}) {
  const [selecoes, setSelecoes] = useState([])

  useEffect(() => {
    fetch('/api/selecoes')
      .then(r => r.ok ? r.json() : [])
      .then(setSelecoes)
      .catch(() => [])
  }, [])

  const temFiltro = fase || grupo || status || selecaoId

  const limpar = () => {
    setFase('')
    setGrupo('')
    setStatus('')
    setSelecaoId('')
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <select value={fase} onChange={e => setFase(e.target.value)} className={SELECT_CLASS}>
          {FASES.map(f => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>

        <select
          value={grupo}
          onChange={e => setGrupo(e.target.value)}
          className={SELECT_CLASS}
          disabled={fase && fase !== 'grupo'}
        >
          <option value="">Todos os grupos</option>
          {GRUPOS.map(g => (
            <option key={g} value={g}>Grupo {g}</option>
          ))}
        </select>

        <select value={status} onChange={e => setStatus(e.target.value)} className={SELECT_CLASS}>
          {STATUS_OPTS.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <select
          value={selecaoId}
          onChange={e => setSelecaoId(e.target.value)}
          className={SELECT_CLASS}
        >
          <option value="">Todas as seleções</option>
          {selecoes.map(s => (
            <option key={s.id} value={s.id}>
              {s.bandeira_emoji} {s.nome_pt}
            </option>
          ))}
        </select>

        {temFiltro && (
          <button onClick={limpar} className="btn-secondary text-sm py-2 px-4">
            ✕ Limpar filtros
          </button>
        )}
      </div>

      {/* Badges dos filtros ativos */}
      {temFiltro && (
        <div className="flex flex-wrap gap-2">
          {fase && (
            <span className="inline-flex items-center gap-1 bg-copa-green/10 border border-copa-green/30 text-copa-green text-xs px-2 py-1 rounded-full">
              {FASES.find(f => f.value === fase)?.label}
              <button onClick={() => setFase('')} className="hover:text-white ml-1">×</button>
            </span>
          )}
          {grupo && (
            <span className="inline-flex items-center gap-1 bg-copa-green/10 border border-copa-green/30 text-copa-green text-xs px-2 py-1 rounded-full">
              Grupo {grupo}
              <button onClick={() => setGrupo('')} className="hover:text-white ml-1">×</button>
            </span>
          )}
          {status && (
            <span className="inline-flex items-center gap-1 bg-copa-green/10 border border-copa-green/30 text-copa-green text-xs px-2 py-1 rounded-full">
              {STATUS_OPTS.find(s => s.value === status)?.label}
              <button onClick={() => setStatus('')} className="hover:text-white ml-1">×</button>
            </span>
          )}
          {selecaoId && (
            <span className="inline-flex items-center gap-1 bg-copa-green/10 border border-copa-green/30 text-copa-green text-xs px-2 py-1 rounded-full">
              {selecoes.find(s => String(s.id) === String(selecaoId))?.nome_pt}
              <button onClick={() => setSelecaoId('')} className="hover:text-white ml-1">×</button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
