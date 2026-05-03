import { useState, useEffect, useMemo } from 'react'
import GridSelecoes from '../components/elenco/GridSelecoes.jsx'
import PerfilSelecao from '../components/elenco/PerfilSelecao.jsx'
import TabelaElenco from '../components/elenco/TabelaElenco.jsx'

export default function ElencoPage() {
  const [selecoes, setSelecoes]         = useState([])
  const [loadingSelecoes, setLoadingSelecoes] = useState(true)

  const [selecaoAtiva, setSelecaoAtiva] = useState(null)
  const [jogadores, setJogadores]       = useState([])
  const [jogos, setJogos]               = useState([])
  const [loadingDetalhe, setLoadingDetalhe] = useState(false)

  useEffect(() => { document.title = 'Elencos | Copa 2026' }, [])

  useEffect(() => {
    fetch('/api/selecoes')
      .then(r => r.ok ? r.json() : [])
      .then(data => { setSelecoes(data); setLoadingSelecoes(false) })
      .catch(() => setLoadingSelecoes(false))
  }, [])

  const selecaoOrdenada = useMemo(() =>
    [...selecoes].sort((a, b) => a.nome_pt.localeCompare(b.nome_pt, 'pt-BR')),
    [selecoes]
  )

  const indiceAtivo = selecaoAtiva
    ? selecaoOrdenada.findIndex(s => s.id === selecaoAtiva.id)
    : -1

  const selecaoAnterior = indiceAtivo > 0 ? selecaoOrdenada[indiceAtivo - 1] : null
  const selecaoProxima  = indiceAtivo < selecaoOrdenada.length - 1 ? selecaoOrdenada[indiceAtivo + 1] : null

  async function carregarSelecao(selecao) {
    setSelecaoAtiva(selecao)
    setJogadores([])
    setJogos([])
    setLoadingDetalhe(true)

    try {
      const [resJogadores, resJogos] = await Promise.all([
        fetch(`/api/selecoes/${selecao.id}/jogadores`),
        fetch(`/api/selecoes/${selecao.id}/jogos`),
      ])
      const [dataJogadores, dataJogos] = await Promise.all([
        resJogadores.ok ? resJogadores.json() : [],
        resJogos.ok ? resJogos.json() : [],
      ])
      setJogadores(dataJogadores)
      setJogos(dataJogos)
    } catch {
      // silencioso — tabela mostra vazio
    } finally {
      setLoadingDetalhe(false)
    }
  }

  function voltar() {
    setSelecaoAtiva(null)
    setJogadores([])
    setJogos([])
  }

  if (loadingSelecoes) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-6">
          <div className="h-10 bg-copa-border rounded w-64 animate-pulse mb-2" />
          <div className="h-4 bg-copa-border rounded w-40 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="card animate-pulse h-20" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Título */}
      <div className="mb-6">
        <h1 className="font-display text-4xl md:text-5xl text-white">ELENCOS DAS SELEÇÕES</h1>
        <p className="text-gray-500 text-sm mt-1">
          {selecaoAtiva
            ? `${selecoes.length} seleções · navegando por perfil`
            : `${selecoes.length} seleções classificadas · Copa do Mundo 2026`}
        </p>
      </div>

      {!selecaoAtiva ? (
        <GridSelecoes selecoes={selecaoOrdenada} onSelect={carregarSelecao} />
      ) : (
        <div>
          {/* Botão voltar */}
          <button
            onClick={voltar}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Voltar para todas as seleções
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna esquerda — perfil */}
            <div className="lg:col-span-1">
              <PerfilSelecao
                selecao={selecaoAtiva}
                jogos={jogos}
                selecaoAnterior={selecaoAnterior}
                selecaoProxima={selecaoProxima}
                onNavegar={carregarSelecao}
              />
            </div>

            {/* Coluna direita — elenco */}
            <div className="lg:col-span-2">
              <TabelaElenco jogadores={jogadores} loading={loadingDetalhe} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
