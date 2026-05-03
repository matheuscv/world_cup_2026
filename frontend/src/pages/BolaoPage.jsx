import { useState, useEffect, useMemo, useRef } from 'react'
import SimuladorGrupos from '../components/bolao/SimuladorGrupos.jsx'
import Chaveamento from '../components/bolao/Chaveamento.jsx'
import { calcularClassificacao, computarOitavas, computarBracket } from '../utils/classificacao.js'

// ── Helpers ───────────────────────────────────────────────────────────────────

function getSessionId() {
  let id = sessionStorage.getItem('copa_session_id')
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem('copa_session_id', id) }
  return id
}

function bracketVazio() {
  const v = () => ({ gols_a: null, gols_b: null, pens_a: null, pens_b: null })
  return {
    oitavas:   Array(16).fill(null).map(v),
    quartas:   Array(8).fill(null).map(v),
    semis:     Array(4).fill(null).map(v),
    semiFinal: Array(2).fill(null).map(v),
    terceiro:  v(),
    final:     v(),
  }
}

const ABAS = [
  { id: 'grupos',   label: 'Grupos' },
  { id: 'oitavas',  label: 'Oitavas' },
  { id: 'quartas',  label: 'Quartas' },
  { id: 'semis',    label: 'Semis' },
  { id: 'final',    label: 'Final' },
]

// ── Componente principal ──────────────────────────────────────────────────────

export default function BolaoPage() {
  useEffect(() => { document.title = 'Bolão | Copa 2026' }, [])

  const sessionId = useMemo(getSessionId, [])

  // ── Dados base ──────────────────────────────────────────────────────────────
  const [jogosGrupo, setJogosGrupo] = useState([])
  const [selecoes, setSelecoes]     = useState([])
  const [loadingData, setLoadingData] = useState(true)

  // ── Bolão ───────────────────────────────────────────────────────────────────
  const [boloes, setBoloes]           = useState([])
  const [bolaoAtivo, setBolaoAtivo]   = useState(null)
  const [nomeBolao, setNomeBolao]     = useState('Meu Bolão')
  const [mostraCriar, setMostraCriar] = useState(false)
  const [criando, setCriando]         = useState(false)
  const [duplicando, setDuplicando]   = useState(false)

  // ── Palpites (grupo) ────────────────────────────────────────────────────────
  const [palpites, setPalpites]       = useState({}) // { [jogoId]: { gols_a, gols_b } }
  const [statusSave, setStatusSave]   = useState('idle') // 'idle' | 'salvando' | 'salvo'
  const saveTimerRef = useRef(null)

  // ── Bracket (local) ─────────────────────────────────────────────────────────
  const [bracketState, setBracketState] = useState(bracketVazio)

  // ── Navegação ───────────────────────────────────────────────────────────────
  const [abaAtiva, setAbaAtiva] = useState('grupos')

  // ── Carregamento inicial ────────────────────────────────────────────────────
  useEffect(() => {
    Promise.all([
      fetch('/api/jogos?fase=grupo&limit=200').then(r => r.ok ? r.json() : []),
      fetch('/api/selecoes').then(r => r.ok ? r.json() : []),
      fetch('/api/boloes', { headers: { 'X-Session-Id': sessionId } }).then(r => r.ok ? r.json() : []),
    ])
      .then(([jogos, sels, bols]) => {
        setJogosGrupo(jogos)
        setSelecoes(sels)
        setBoloes(bols)
        if (bols.length > 0) setBolaoAtivo(bols[0])
      })
      .catch(() => {})
      .finally(() => setLoadingData(false))
  }, [sessionId])

  // ── Carrega palpites ao trocar de bolão ─────────────────────────────────────
  useEffect(() => {
    if (!bolaoAtivo) return
    setPalpites({})
    fetch(`/api/boloes/${bolaoAtivo.id}/palpites`, { headers: { 'X-Session-Id': sessionId } })
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        const map = {}
        data.forEach(p => { map[p.jogo_id] = { gols_a: p.gols_a, gols_b: p.gols_b } })
        setPalpites(map)
      })
      .catch(() => {})
  }, [bolaoAtivo, sessionId])

  // ── Classificações derivadas ────────────────────────────────────────────────
  const grupos = useMemo(() => {
    const letras = [...new Set(jogosGrupo.map(j => j.grupo))].filter(Boolean).sort()
    return letras.map(letra => {
      const jogosDoGrupo = jogosGrupo.filter(j => j.grupo === letra)
      const selecoesDoGrupo = selecoes.filter(s => s.grupo === letra)
      const jogosComPalpites = jogosDoGrupo.map(j => ({
        ...j,
        real_gols_a: j.gols_a,
        real_gols_b: j.gols_b,
        gols_a: palpites[j.id]?.gols_a ?? null,
        gols_b: palpites[j.id]?.gols_b ?? null,
        selecao_a_id: j.selecao_a?.id,
        selecao_b_id: j.selecao_b?.id,
      }))
      const classificacao = calcularClassificacao(jogosComPalpites, selecoesDoGrupo)
      return { letra, jogos: jogosDoGrupo, selecoes: selecoesDoGrupo, classificacao }
    })
  }, [jogosGrupo, selecoes, palpites])

  const classificacoes = useMemo(() => {
    const r = {}
    grupos.forEach(g => { r[g.letra] = g.classificacao })
    return r
  }, [grupos])

  const oitavasBase = useMemo(() => computarOitavas(classificacoes), [classificacoes])

  // ── Estatísticas de acerto (grupo) ─────────────────────────────────────────
  const acertos = useMemo(() => {
    let exato = 0, resultado = 0, errado = 0, total = 0
    jogosGrupo.forEach(j => {
      if (j.gols_a == null || j.gols_b == null) return
      const p = palpites[j.id]
      if (p == null || p.gols_a == null) return
      total++
      if (p.gols_a === j.gols_a && p.gols_b === j.gols_b) {
        exato++
      } else {
        const resReal = j.gols_a > j.gols_b ? 'A' : j.gols_b > j.gols_a ? 'B' : 'E'
        const resPal  = p.gols_a > p.gols_b ? 'A' : p.gols_b > p.gols_a ? 'B' : 'E'
        if (resReal === resPal) resultado++
        else errado++
      }
    })
    return { exato, resultado, errado, total }
  }, [jogosGrupo, palpites])

  const bracket = useMemo(() => computarBracket(oitavasBase, bracketState), [oitavasBase, bracketState])

  // ── Auto-save de palpites ───────────────────────────────────────────────────
  function agendarSave(jogoId, gols_a, gols_b) {
    if (!bolaoAtivo) return
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    setStatusSave('salvando')
    saveTimerRef.current = setTimeout(async () => {
      try {
        await fetch(`/api/boloes/${bolaoAtivo.id}/palpites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
          body: JSON.stringify({ jogo_id: jogoId, gols_a, gols_b }),
        })
        setStatusSave('salvo')
        setTimeout(() => setStatusSave('idle'), 2000)
      } catch {
        setStatusSave('idle')
      }
    }, 800)
  }

  function handlePalpiteChange(jogoId, gols_a, gols_b) {
    setPalpites(prev => ({ ...prev, [jogoId]: { gols_a, gols_b } }))
    agendarSave(jogoId, gols_a, gols_b)
  }

  // ── Bracket handlers ────────────────────────────────────────────────────────
  function handleBracketArray(fase, index, field, value) {
    setBracketState(prev => {
      const arr = [...prev[fase]]
      arr[index] = { ...arr[index], [field]: value }
      return { ...prev, [fase]: arr }
    })
  }

  function handleBracketSingle(fase, field, value) {
    setBracketState(prev => ({ ...prev, [fase]: { ...prev[fase], [field]: value } }))
  }

  // ── CRUD bolões ─────────────────────────────────────────────────────────────
  async function criarBolao() {
    if (!nomeBolao.trim()) return
    setCriando(true)
    try {
      const res = await fetch('/api/boloes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
        body: JSON.stringify({ nome: nomeBolao }),
      })
      if (!res.ok) throw new Error()
      const novo = await res.json()
      setBoloes(prev => [novo, ...prev])
      setBolaoAtivo(novo)
      setPalpites({})
      setBracketState(bracketVazio())
      setMostraCriar(false)
      setAbaAtiva('grupos')
    } catch {}
    finally { setCriando(false) }
  }

  async function duplicarBolao() {
    if (!bolaoAtivo || duplicando) return
    setDuplicando(true)
    try {
      const res = await fetch('/api/boloes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
        body: JSON.stringify({ nome: `${bolaoAtivo.nome} (cópia)` }),
      })
      if (!res.ok) throw new Error()
      const novo = await res.json()

      const palRes = await fetch(`/api/boloes/${bolaoAtivo.id}/palpites`, {
        headers: { 'X-Session-Id': sessionId },
      })
      const palData = palRes.ok ? await palRes.json() : []

      await Promise.all(palData.map(p =>
        fetch(`/api/boloes/${novo.id}/palpites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
          body: JSON.stringify({ jogo_id: p.jogo_id, gols_a: p.gols_a, gols_b: p.gols_b }),
        })
      ))

      setBoloes(prev => [novo, ...prev])
      setBolaoAtivo(novo)
      setBracketState(bracketVazio())
    } catch {}
    finally { setDuplicando(false) }
  }

  async function deletarBolao(id) {
    try {
      await fetch(`/api/boloes/${id}`, { method: 'DELETE', headers: { 'X-Session-Id': sessionId } })
      setBoloes(prev => {
        const rest = prev.filter(b => b.id !== id)
        const next = rest[0] || null
        setBolaoAtivo(next)
        if (!next) { setPalpites({}); setBracketState(bracketVazio()) }
        return rest
      })
    } catch {}
  }

  // ── Dados para renderizar aba atual ────────────────────────────────────────
  const confrontosFase = useMemo(() => {
    if (abaAtiva === 'oitavas') {
      return bracket.oitavas.map((c, i) => ({ ...c, label: `Jogo ${i + 1}` }))
    }
    if (abaAtiva === 'quartas') {
      return bracket.quartas.map((c, i) => ({ ...c, label: `Quartas ${i + 1}` }))
    }
    if (abaAtiva === 'semis') {
      return bracket.semis.map((c, i) => ({ ...c, label: `Semis ${i + 1}` }))
    }
    if (abaAtiva === 'final') {
      return [
        { ...bracket.semiFinal[0], label: 'Semi-final 1' },
        { ...bracket.semiFinal[1], label: 'Semi-final 2' },
        { ...bracket.terceiro, label: 'Disputa do 3° Lugar' },
        { ...bracket.final, label: 'Grande Final' },
      ]
    }
    return []
  }, [abaAtiva, bracket])

  function handleConfrontosChange(i, field, value) {
    if (abaAtiva === 'oitavas')  handleBracketArray('oitavas',   i, field, value)
    if (abaAtiva === 'quartas')  handleBracketArray('quartas',   i, field, value)
    if (abaAtiva === 'semis')    handleBracketArray('semis',     i, field, value)
    if (abaAtiva === 'final') {
      if (i === 0) handleBracketArray('semiFinal', 0, field, value)
      if (i === 1) handleBracketArray('semiFinal', 1, field, value)
      if (i === 2) handleBracketSingle('terceiro', field, value)
      if (i === 3) handleBracketSingle('final',    field, value)
    }
  }

  const totalPalpites = Object.keys(palpites).length

  // ── Render ─────────────────────────────────────────────────────────────────
  if (loadingData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="h-10 bg-copa-border rounded w-72 animate-pulse mb-2" />
        <div className="h-4 bg-copa-border rounded w-48 animate-pulse mb-8" />
        <div className="card animate-pulse h-96" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* ── Cabeçalho ── */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-white">BOLÃO DA COPA 2026</h1>
          <p className="text-gray-500 text-sm mt-1">
            Simule todos os jogos e descubra seu campeão
          </p>
        </div>

        {/* Status de save */}
        {statusSave !== 'idle' && (
          <div className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
            statusSave === 'salvando'
              ? 'bg-copa-dark text-gray-400 animate-pulse'
              : 'bg-copa-green/20 text-copa-green'
          }`}>
            {statusSave === 'salvando' ? '● Salvando…' : '✓ Salvo'}
          </div>
        )}
      </div>

      {/* ── Seletor de bolão ── */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {boloes.length > 0 && (
          <select
            value={bolaoAtivo?.id ?? ''}
            onChange={e => {
              const b = boloes.find(b => b.id === parseInt(e.target.value))
              if (b) { setBolaoAtivo(b); setBracketState(bracketVazio()) }
            }}
            className="bg-copa-card border border-copa-border text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-copa-green transition-colors"
          >
            {boloes.map(b => (
              <option key={b.id} value={b.id}>{b.nome}</option>
            ))}
          </select>
        )}
        <button
          onClick={() => setMostraCriar(true)}
          className="bg-copa-green text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          + Novo bolão
        </button>
        {bolaoAtivo && (
          <button
            onClick={duplicarBolao}
            disabled={duplicando}
            className="text-xs text-gray-500 hover:text-copa-green transition-colors px-2 py-2 disabled:opacity-50"
            title="Duplicar este bolão"
          >
            {duplicando ? 'Duplicando…' : 'Duplicar'}
          </button>
        )}
        {bolaoAtivo && (
          <button
            onClick={() => deletarBolao(bolaoAtivo.id)}
            className="text-xs text-gray-600 hover:text-red-400 transition-colors px-2 py-2"
          >
            Excluir
          </button>
        )}
        {bolaoAtivo && (
          <span className="ml-auto text-xs text-gray-600">
            {totalPalpites}/72 palpites de grupos
          </span>
        )}
      </div>

      {/* ── Modal: criar bolão ── */}
      {mostraCriar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="card w-full max-w-sm">
            <h3 className="font-display text-2xl text-white mb-4">NOVO BOLÃO</h3>
            <input
              type="text"
              value={nomeBolao}
              onChange={e => setNomeBolao(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && criarBolao()}
              placeholder="Nome do bolão..."
              className="w-full bg-copa-dark border border-copa-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-copa-green transition-colors mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={criarBolao}
                disabled={criando || !nomeBolao.trim()}
                className="flex-1 bg-copa-green text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
              >
                {criando ? 'Criando…' : 'Criar'}
              </button>
              <button
                onClick={() => setMostraCriar(false)}
                className="flex-1 bg-copa-card border border-copa-border text-gray-400 font-bold py-2.5 rounded-lg hover:text-white transition-colors text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Estado vazio ── */}
      {!bolaoAtivo && !mostraCriar && (
        <div className="card text-center py-16">
          <p className="text-4xl mb-4">🎯</p>
          <h3 className="font-display text-2xl text-white mb-2">CRIE SEU BOLÃO</h3>
          <p className="text-gray-500 text-sm mb-6">
            Simule todos os jogos da Copa e descubra seu campeão
          </p>
          <button
            onClick={() => setMostraCriar(true)}
            className="bg-copa-green text-white font-bold py-2.5 px-8 rounded-lg hover:bg-green-700 transition-colors"
          >
            Criar meu bolão
          </button>
        </div>
      )}

      {/* ── Conteúdo do bolão ── */}
      {bolaoAtivo && (
        <>
          {/* Barra de progresso */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1.5">
              <span>Progresso da fase de grupos</span>
              <span className="font-mono">{totalPalpites}/72</span>
            </div>
            <div className="h-1.5 bg-copa-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-copa-green rounded-full transition-all duration-300"
                style={{ width: `${(totalPalpites / 72) * 100}%` }}
              />
            </div>
          </div>

          {/* Estatísticas de acerto */}
          {acertos.total > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="text-xs text-gray-500 font-semibold">Acertos ({acertos.total} jogos encerrados):</span>
              <span className="flex items-center gap-1 text-xs font-bold text-copa-green bg-copa-green/10 px-2.5 py-1 rounded-full">
                ✓ {acertos.exato} exatos
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-copa-gold bg-copa-gold/10 px-2.5 py-1 rounded-full">
                ≈ {acertos.resultado} resultados
              </span>
              {acertos.errado > 0 && (
                <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-900/20 px-2.5 py-1 rounded-full">
                  ✗ {acertos.errado} errados
                </span>
              )}
              <span className="text-xs text-gray-600 ml-auto">
                {Math.round(((acertos.exato + acertos.resultado) / acertos.total) * 100)}% de aproveitamento
              </span>
            </div>
          )}

          {/* Abas */}
          <div className="flex gap-1 flex-wrap mb-6">
            {ABAS.map(aba => (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                  abaAtiva === aba.id
                    ? 'bg-copa-green text-white'
                    : 'bg-copa-card border border-copa-border text-gray-400 hover:text-white hover:border-gray-500'
                }`}
              >
                {aba.label}
              </button>
            ))}
          </div>

          {/* Aviso sobre oitavas sem grupos completos */}
          {abaAtiva !== 'grupos' && totalPalpites < 72 && (
            <div className="mb-4 px-4 py-3 bg-copa-gold/10 border border-copa-gold/30 rounded-lg text-sm text-copa-gold">
              Preencha os 72 palpites da fase de grupos para ver o chaveamento completo.
              <span className="text-copa-gold/60 ml-1">({72 - totalPalpites} restantes)</span>
            </div>
          )}

          {/* Conteúdo da aba */}
          {abaAtiva === 'grupos' && (
            <SimuladorGrupos
              grupos={grupos}
              palpites={palpites}
              onPalpiteChange={handlePalpiteChange}
            />
          )}

          {abaAtiva !== 'grupos' && (
            <div>
              {abaAtiva === 'final' ? (
                <div className="space-y-6">
                  {/* Semi-finais */}
                  <div>
                    <h3 className="font-display text-xl text-white mb-4">SEMI-FINAIS</h3>
                    <Chaveamento
                      confrontos={confrontosFase.slice(0, 2)}
                      onPalpiteChange={(i, field, value) => handleConfrontosChange(i, field, value)}
                      cols={2}
                    />
                  </div>

                  {/* 3° Lugar + Final */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-display text-xl text-gray-400 mb-4">DISPUTA DO 3° LUGAR</h3>
                      <Chaveamento
                        confrontos={[confrontosFase[2]]}
                        onPalpiteChange={(i, field, value) => handleConfrontosChange(2, field, value)}
                        cols={1}
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-copa-gold mb-4">GRANDE FINAL</h3>
                      <Chaveamento
                        confrontos={[confrontosFase[3]]}
                        onPalpiteChange={(i, field, value) => handleConfrontosChange(3, field, value)}
                        cols={1}
                        destaquesIdx={[0]}
                      />
                      {/* Campeão */}
                      {(() => {
                        const f = confrontosFase[3]
                        if (!f || f.gols_a == null || f.gols_b == null) return null
                        let campeao = null
                        if (f.gols_a > f.gols_b) campeao = f.selecaoA
                        else if (f.gols_b > f.gols_a) campeao = f.selecaoB
                        else if (f.pens_a != null && f.pens_b != null) {
                          if (f.pens_a > f.pens_b) campeao = f.selecaoA
                          else if (f.pens_b > f.pens_a) campeao = f.selecaoB
                        }
                        if (!campeao) return null
                        return (
                          <div className="mt-4 card bg-copa-gold/10 border-copa-gold/40 text-center py-6">
                            <p className="text-5xl mb-2">{campeao.bandeira_emoji}</p>
                            <p className="font-display text-2xl text-copa-gold">{campeao.nome_pt}</p>
                            <p className="text-sm text-copa-gold/60 mt-1">Campeão do Mundo 2026 🏆</p>
                          </div>
                        )
                      })()}
                    </div>
                  </div>
                </div>
              ) : (
                <Chaveamento
                  confrontos={confrontosFase}
                  onPalpiteChange={handleConfrontosChange}
                  cols={abaAtiva === 'semis' ? 2 : 2}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
