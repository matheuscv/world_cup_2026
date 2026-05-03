import { useState, useEffect } from 'react'
import { useGrupos } from '../hooks/useGrupos.js'
import TabelaGrupo from '../components/grupos/TabelaGrupo.jsx'
import PotesSection from '../components/grupos/PotesSection.jsx'

const LETRAS = ['A','B','C','D','E','F','G','H','I','J','K','L']

function GrupoSkeleton() {
  return (
    <div className="card p-0 overflow-hidden animate-pulse">
      <div className="px-4 py-3 border-b border-copa-border/50">
        <div className="h-5 bg-copa-border rounded w-24" />
      </div>
      <div className="p-4 space-y-3">
        {[1,2,3,4].map(i => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-3 w-4 bg-copa-border rounded" />
            <div className="h-5 w-5 bg-copa-border rounded" />
            <div className="h-3 bg-copa-border rounded flex-1" />
            <div className="flex gap-1">
              {[1,2,3,4,5,6].map(j => <div key={j} className="h-3 w-5 bg-copa-border rounded" />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GruposPage() {
  useEffect(() => { document.title = 'Grupos | Copa 2026' }, [])

  const { grupos, loading, error } = useGrupos()
  const [grupoSelecionado, setGrupoSelecionado] = useState(null)

  const grupoAtual = grupoSelecionado
    ? grupos.find(g => g.letra === grupoSelecionado)
    : null

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Título */}
      <div className="mb-6">
        <h1 className="font-display text-4xl md:text-5xl text-white">GRUPOS DA COPA 2026</h1>
        <p className="text-gray-500 text-sm mt-1">12 grupos · 48 seleções · Fase de grupos: 11 jun – 2 jul 2026</p>
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-6">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-copa-green inline-block" />
          Classificados (top 2)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-copa-gold/50 inline-block" />
          Possível 3º classificado
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-red-800/50 inline-block" />
          Eliminado
        </span>
        <span className="flex items-center gap-1.5 ml-auto">
          <span className="text-[9px] font-bold bg-copa-gold/20 text-copa-gold border border-copa-gold/30 px-1.5 py-0.5 rounded">C1</span>
          Cabeça de Chave (Pote 1)
        </span>
      </div>

      {/* Tabs de grupos */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        <button
          onClick={() => setGrupoSelecionado(null)}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
            !grupoSelecionado
              ? 'bg-copa-green text-white'
              : 'bg-copa-card border border-copa-border text-gray-400 hover:text-white hover:border-gray-600'
          }`}
        >
          Todos
        </button>
        {LETRAS.map(letra => (
          <button
            key={letra}
            onClick={() => setGrupoSelecionado(letra === grupoSelecionado ? null : letra)}
            className={`w-10 py-1.5 rounded-lg text-sm font-bold transition-colors ${
              grupoSelecionado === letra
                ? 'bg-copa-green text-white'
                : 'bg-copa-card border border-copa-border text-gray-400 hover:text-white hover:border-gray-600'
            }`}
          >
            {letra}
          </button>
        ))}
      </div>

      {/* Erro */}
      {error && (
        <div className="card border-red-900/50 text-red-400 text-center py-8">
          Erro ao carregar grupos: {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, i) => <GrupoSkeleton key={i} />)}
        </div>
      )}

      {/* Vista: grupo específico */}
      {!loading && !error && grupoAtual && (
        <div className="space-y-6">
          <TabelaGrupo
            letra={grupoAtual.letra}
            classificacao={grupoAtual.classificacao}
            jogos={grupoAtual.jogos}
          />
        </div>
      )}

      {/* Vista: todos os grupos (grid) */}
      {!loading && !error && !grupoSelecionado && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {grupos.map(grupo => (
            <TabelaGrupo
              key={grupo.letra}
              letra={grupo.letra}
              classificacao={grupo.classificacao}
              onClick={() => setGrupoSelecionado(grupo.letra)}
            />
          ))}
        </div>
      )}

      {/* Seção de potes — sempre visível */}
      {!loading && !error && (
        <PotesSection />
      )}
    </div>
  )
}
