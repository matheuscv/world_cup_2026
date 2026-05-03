import { useState, useEffect, useMemo, useRef } from 'react'
import CampoFutebol, { FORMACOES } from '../components/escalacao/CampoFutebol.jsx'
import ListaConvocados from '../components/escalacao/ListaConvocados.jsx'

const FORMACOES_LISTA = Object.keys(FORMACOES)

function getSessionId() {
  let id = sessionStorage.getItem('copa_session_id')
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem('copa_session_id', id) }
  return id
}

export default function EscalacaoPage() {
  useEffect(() => { document.title = 'Escalação Brasil | Copa 2026' }, [])

  const sessionId = useMemo(getSessionId, [])

  const [jogadores, setJogadores]   = useState([])
  const [loading, setLoading]       = useState(true)

  const [formacao, setFormacao]     = useState('4-3-3')
  const [titulares, setTitulares]   = useState({})   // slotId → jogador
  const [slotAtivo, setSlotAtivo]   = useState(null) // slot aguardando jogador (modo clique)
  const [arrastando, setArrastando] = useState(null) // jogador sendo arrastado

  const [nomeEscalacao, setNomeEscalacao]     = useState('Minha Escalação')
  const [escalacoesSalvas, setEscalacoesSalvas] = useState([])
  const [salvando, setSalvando]               = useState(false)
  const [exportando, setExportando]           = useState(false)
  const [toast, setToast]                     = useState(null)

  const campoRef = useRef(null)

  // Carrega jogadores do Brasil
  useEffect(() => {
    fetch('/api/selecoes')
      .then(r => r.ok ? r.json() : [])
      .then(selecoes => {
        const brasil = selecoes.find(s => s.codigo_iso === 'BR')
        if (!brasil) { setLoading(false); return }
        return fetch(`/api/selecoes/${brasil.id}/jogadores`)
          .then(r => r.ok ? r.json() : [])
          .then(setJogadores)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Carrega escalações salvas da sessão
  useEffect(() => {
    fetch('/api/escalacoes', { headers: { 'X-Session-Id': sessionId } })
      .then(r => r.ok ? r.json() : [])
      .then(setEscalacoesSalvas)
      .catch(() => {})
  }, [sessionId])

  function mostrarToast(texto, tipo = 'ok') {
    setToast({ texto, tipo })
    setTimeout(() => setToast(null), 3000)
  }

  // ── Drag & Drop ──────────────────────────────────────────────

  function handleDragStart(e, jogador) {
    setArrastando(jogador)
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDrop(e, slot) {
    e.preventDefault()
    if (!arrastando) return
    alocarJogador(arrastando, slot)
    setArrastando(null)
  }

  // ── Lógica de alocação ────────────────────────────────────────

  function alocarJogador(jogador, slot) {
    setTitulares(prev => {
      const next = { ...prev }
      // Remove o jogador de qualquer slot anterior
      for (const k of Object.keys(next)) {
        if (next[k].id === jogador.id) delete next[k]
      }
      next[slot.id] = jogador
      return next
    })
    setSlotAtivo(null)
  }

  function handleSlotClick(slot) {
    if (titulares[slot.id]) {
      // Remove o jogador do slot
      setTitulares(prev => { const n = { ...prev }; delete n[slot.id]; return n })
      setSlotAtivo(null)
    } else if (slotAtivo?.id === slot.id) {
      setSlotAtivo(null)
    } else {
      setSlotAtivo(slot)
    }
  }

  function handlePlayerClick(jogador) {
    const isTitular = Object.values(titulares).some(t => t.id === jogador.id)
    if (isTitular || !slotAtivo) return
    alocarJogador(jogador, slotAtivo)
  }

  // ── Formação ──────────────────────────────────────────────────

  function handleFormacaoChange(novaFormacao) {
    setFormacao(novaFormacao)
    // Mantém apenas o goleiro ao trocar de formação
    setTitulares(prev => {
      const gkEntry = Object.entries(prev).find(([id]) => id === 'gk')
      return gkEntry ? { gk: gkEntry[1] } : {}
    })
    setSlotAtivo(null)
  }

  // ── Derived state ─────────────────────────────────────────────

  const titularIds = useMemo(
    () => new Set(Object.values(titulares).map(j => j.id)),
    [titulares]
  )

  const reservas = useMemo(
    () => jogadores.filter(j => !titularIds.has(j.id)),
    [jogadores, titularIds]
  )

  const totalTitulares = Object.keys(titulares).length

  // ── Salvar / Carregar ─────────────────────────────────────────

  async function salvarEscalacao() {
    if (totalTitulares < 11) {
      mostrarToast('Complete os 11 titulares antes de salvar.', 'erro')
      return
    }
    setSalvando(true)
    try {
      const titularesJson = JSON.stringify(
        Object.entries(titulares).map(([slot, j]) => ({ slot, jogador_id: j.id }))
      )
      const reservasJson = JSON.stringify(reservas.map(j => j.id))

      const res = await fetch('/api/escalacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
        body: JSON.stringify({ nome: nomeEscalacao, formacao, titulares_json: titularesJson, reservas_json: reservasJson }),
      })
      if (!res.ok) throw new Error()
      const nova = await res.json()
      setEscalacoesSalvas(prev => [nova, ...prev].slice(0, 10))
      mostrarToast('Escalação salva com sucesso!')
    } catch {
      mostrarToast('Erro ao salvar. Tente novamente.', 'erro')
    } finally {
      setSalvando(false)
    }
  }

  function carregarEscalacao(esc) {
    try {
      const entries = JSON.parse(esc.titulares_json)
      const loaded = {}
      entries.forEach(({ slot, jogador_id }) => {
        const j = jogadores.find(p => p.id === jogador_id)
        if (j) loaded[slot] = j
      })
      setFormacao(esc.formacao)
      setTitulares(loaded)
      setNomeEscalacao(esc.nome)
      setSlotAtivo(null)
      mostrarToast(`"${esc.nome}" carregada.`)
    } catch {
      mostrarToast('Erro ao carregar a escalação.', 'erro')
    }
  }

  async function deletarEscalacao(id) {
    try {
      await fetch(`/api/escalacoes/${id}`, {
        method: 'DELETE',
        headers: { 'X-Session-Id': sessionId },
      })
      setEscalacoesSalvas(prev => prev.filter(e => e.id !== id))
    } catch {}
  }

  function limparCampo() {
    setTitulares({})
    setSlotAtivo(null)
  }

  async function exportarImagem() {
    if (!campoRef.current) return
    setExportando(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(campoRef.current, {
        backgroundColor: '#141414',
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = `${nomeEscalacao.replace(/\s+/g, '_')}_copa2026.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      mostrarToast('Imagem exportada!')
    } catch {
      mostrarToast('Erro ao exportar. Tente novamente.', 'erro')
    } finally {
      setExportando(false)
    }
  }

  // ── Render ────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="h-10 bg-copa-border rounded w-72 animate-pulse mb-2" />
        <div className="h-4 bg-copa-border rounded w-48 animate-pulse mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card animate-pulse" style={{ height: '500px' }} />
          <div className="card animate-pulse" style={{ height: '500px' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Título */}
      <div className="mb-6">
        <h1 className="font-display text-4xl md:text-5xl text-white">ESCALAÇÃO DO BRASIL</h1>
        <p className="text-gray-500 text-sm mt-1">
          Monte sua seleção ideal · arraste jogadores para o campo ou clique nos slots
        </p>
      </div>

      {/* Seletor de formação */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-sm text-gray-400 font-semibold mr-1">Formação:</span>
        {FORMACOES_LISTA.map(f => (
          <button
            key={f}
            onClick={() => handleFormacaoChange(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-mono font-bold transition-colors ${
              formacao === f
                ? 'bg-copa-green text-white'
                : 'bg-copa-card border border-copa-border text-gray-400 hover:text-white hover:border-gray-500'
            }`}
          >
            {f}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={exportarImagem}
            disabled={exportando || totalTitulares === 0}
            className="text-xs text-gray-500 hover:text-copa-green transition-colors px-2 py-1.5 disabled:opacity-40"
            title="Exportar campo como PNG"
          >
            {exportando ? 'Exportando…' : '↓ PNG'}
          </button>
          <button
            onClick={limparCampo}
            className="text-xs text-gray-600 hover:text-red-400 transition-colors px-2 py-1.5"
          >
            Limpar campo
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`mb-4 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
          toast.tipo === 'ok'
            ? 'bg-copa-green/20 text-copa-green border border-copa-green/30'
            : 'bg-red-900/30 text-red-400 border border-red-900/50'
        }`}>
          {toast.texto}
        </div>
      )}

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Coluna esquerda — campo + banco + salvar */}
        <div className="lg:col-span-2 space-y-4">

          {/* Campo */}
          <div className="card p-4" ref={campoRef}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold text-copa-green">{totalTitulares}</span>
                <span className="text-sm text-gray-500">/11 titulares</span>
                {totalTitulares === 11 && (
                  <span className="text-[10px] font-bold bg-copa-green/20 text-copa-green px-2 py-0.5 rounded">
                    Campo completo
                  </span>
                )}
              </div>
              {slotAtivo && (
                <button
                  onClick={() => setSlotAtivo(null)}
                  className="text-xs text-gray-500 hover:text-white transition-colors"
                >
                  ✕ Cancelar seleção
                </button>
              )}
            </div>
            <CampoFutebol
              formacao={formacao}
              titulares={titulares}
              onDrop={handleDrop}
              onSlotClick={handleSlotClick}
            />
          </div>

          {/* Banco de reservas */}
          <div className="card">
            <h3 className="font-display text-lg text-white mb-3">
              BANCO DE RESERVAS
              <span className="text-sm font-sans font-normal text-gray-600 ml-2">{reservas.length} jogadores</span>
            </h3>
            {reservas.length === 0 ? (
              <p className="text-sm text-gray-600">Todos os jogadores estão escalados</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {reservas.map(j => (
                  <div
                    key={j.id}
                    draggable
                    onDragStart={e => handleDragStart(e, j)}
                    className="flex items-center gap-1.5 bg-copa-dark border border-copa-border/50 rounded-lg px-2.5 py-1.5 cursor-grab hover:border-copa-green/40 hover:bg-copa-green/5 transition-colors group"
                  >
                    <span className="font-mono text-[10px] text-gray-600 group-hover:text-gray-500">{j.numero ?? '—'}</span>
                    <span className="text-xs text-gray-300 group-hover:text-white">
                      {j.nome_curto || j.nome.split(' ').slice(-1)[0]}
                    </span>
                    {j.eh_capitao === 1 && (
                      <span className="text-[8px] font-bold text-copa-gold">CAP</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Salvar escalação */}
          <div className="card">
            <h3 className="font-display text-lg text-white mb-3">SALVAR ESCALAÇÃO</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={nomeEscalacao}
                onChange={e => setNomeEscalacao(e.target.value)}
                placeholder="Nome da escalação..."
                maxLength={60}
                className="flex-1 bg-copa-dark border border-copa-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-copa-green transition-colors"
              />
              <button
                onClick={salvarEscalacao}
                disabled={salvando}
                className="bg-copa-green text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm whitespace-nowrap"
              >
                {salvando ? 'Salvando…' : 'Salvar'}
              </button>
            </div>

            {escalacoesSalvas.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-[10px] text-gray-600 uppercase tracking-wider">Escalações salvas ({escalacoesSalvas.length}/10)</p>
                {escalacoesSalvas.map(esc => (
                  <div key={esc.id} className="flex items-center gap-3 bg-copa-dark border border-copa-border/40 rounded-lg px-3 py-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-semibold truncate">{esc.nome}</p>
                      <p className="text-[10px] text-gray-600 font-mono">{esc.formacao}</p>
                    </div>
                    <button
                      onClick={() => carregarEscalacao(esc)}
                      className="text-xs text-copa-green hover:text-green-300 font-semibold transition-colors"
                    >
                      Carregar
                    </button>
                    <button
                      onClick={() => deletarEscalacao(esc.id)}
                      className="text-xs text-gray-600 hover:text-red-400 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Coluna direita — lista de convocados */}
        <div className="lg:col-span-1">
          <ListaConvocados
            jogadores={jogadores}
            titulares={titulares}
            slotAtivo={slotAtivo}
            onDragStart={handleDragStart}
            onPlayerClick={handlePlayerClick}
          />
        </div>

      </div>
    </div>
  )
}
