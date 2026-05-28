import { useState, useEffect, useMemo } from 'react'
import { toDataBrasilia, toHoraBrasilia } from '../utils/formatDate.js'
import Flag from '../components/ui/Flag'
import useAppStore from '../store/useAppStore.js'

const STATUS_COR = {
  agendado:     'bg-gray-700/80 text-gray-300',
  em_andamento: 'bg-green-800/80 text-green-400 animate-pulse',
  encerrado:    'bg-gray-800/80 text-gray-500',
}
const STATUS_LABEL = { agendado: 'Agendado', em_andamento: 'Ao vivo', encerrado: 'Encerrado' }
const COR_POS = { GK: 'text-yellow-400', DEF: 'text-blue-400', MID: 'text-green-400', FWD: 'text-red-400' }

const FASES_TAB = [
  { id: 'todos',    label: 'Todos' },
  { id: 'grupo',    label: 'Grupos' },
  { id: 'oitavas',  label: 'Oitavas' },
  { id: 'quartas',  label: 'Quartas' },
  { id: 'semi',     label: 'Semis' },
  { id: 'terceiro', label: '3° Lugar' },
  { id: 'final',    label: 'Final' },
]

// ── Modal de edição de jogo ───────────────────────────────────────────────────

function ModalEditar({ jogo, adminKey, onSave, onClose }) {
  const { addToast } = useAppStore()
  const [gols_a,  setGolsA]  = useState(jogo.gols_a  ?? '')
  const [gols_b,  setGolsB]  = useState(jogo.gols_b  ?? '')
  const [pens_a,  setPensA]  = useState(jogo.penaltis_a ?? '')
  const [pens_b,  setPensB]  = useState(jogo.penaltis_b ?? '')
  const [status,  setStatus] = useState(jogo.status)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  async function salvar() {
    setSalvando(true)
    setErro('')
    try {
      const toNum = v => v !== '' && v !== null ? parseInt(v) : null
      const res = await fetch(`/api/admin/jogos/${jogo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey },
        body: JSON.stringify({
          status,
          gols_a:     toNum(gols_a),
          gols_b:     toNum(gols_b),
          penaltis_a: toNum(pens_a),
          penaltis_b: toNum(pens_b),
        }),
      })
      if (res.status === 401) { setErro('Chave de admin inválida.'); return }
      if (!res.ok)            { setErro('Erro ao salvar. Tente novamente.'); return }
      const atualizado = await res.json()
      addToast('Jogo atualizado com sucesso!', 'success')
      onSave(atualizado)
    } catch {
      setErro('Falha de rede. Verifique a conexão.')
    } finally {
      setSalvando(false)
    }
  }

  const nomeA = jogo.selecao_a?.nome_pt || '—'
  const nomeB = jogo.selecao_b?.nome_pt || '—'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="card w-full max-w-md">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">
              {jogo.grupo ? `Grupo ${jogo.grupo} · Rodada ${jogo.rodada}` : jogo.fase}
            </p>
            <h3 className="font-display text-xl text-white flex items-center gap-2 flex-wrap">
              <Flag codigoIso={jogo.selecao_a?.codigo_iso} nome={jogo.selecao_a?.nome_pt} size="xs" /> {nomeA}
              <span className="text-gray-500">×</span>
              <Flag codigoIso={jogo.selecao_b?.codigo_iso} nome={jogo.selecao_b?.nome_pt} size="xs" /> {nomeB}
            </h3>
            <p className="text-xs text-gray-600 mt-1">{toDataBrasilia(jogo.data_hora_utc)}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl leading-none ml-4 flex-shrink-0">×</button>
        </div>

        <div className="mb-5">
          <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 block">Placar</label>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-[10px] text-gray-600 text-center mb-1 flex items-center justify-center gap-1"><Flag codigoIso={jogo.selecao_a?.codigo_iso} nome={jogo.selecao_a?.nome_pt} size="xs" /> {nomeA.split(' ')[0]}</p>
              <input
                type="number" min="0" max="30" value={gols_a} onChange={e => setGolsA(e.target.value)}
                className="w-full bg-copa-dark border border-copa-border rounded-lg px-3 py-2.5 text-center font-mono text-2xl font-bold text-white focus:outline-none focus:border-copa-green transition-colors"
                placeholder="—"
              />
            </div>
            <span className="text-gray-500 text-xl mt-4">×</span>
            <div className="flex-1">
              <p className="text-[10px] text-gray-600 text-center mb-1 flex items-center justify-center gap-1"><Flag codigoIso={jogo.selecao_b?.codigo_iso} nome={jogo.selecao_b?.nome_pt} size="xs" /> {nomeB.split(' ')[0]}</p>
              <input
                type="number" min="0" max="30" value={gols_b} onChange={e => setGolsB(e.target.value)}
                className="w-full bg-copa-dark border border-copa-border rounded-lg px-3 py-2.5 text-center font-mono text-2xl font-bold text-white focus:outline-none focus:border-copa-green transition-colors"
                placeholder="—"
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 block">
            Pênaltis <span className="normal-case">(deixe em branco se não houver)</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number" min="0" max="20" value={pens_a} onChange={e => setPensA(e.target.value)}
              className="flex-1 bg-copa-dark border border-copa-border rounded-lg px-3 py-2 text-center font-mono text-white focus:outline-none focus:border-copa-green transition-colors"
              placeholder="—"
            />
            <span className="text-gray-500">×</span>
            <input
              type="number" min="0" max="20" value={pens_b} onChange={e => setPensB(e.target.value)}
              className="flex-1 bg-copa-dark border border-copa-border rounded-lg px-3 py-2 text-center font-mono text-white focus:outline-none focus:border-copa-green transition-colors"
              placeholder="—"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 block">Status</label>
          <div className="flex gap-2">
            {[
              { id: 'agendado',     label: 'Agendado',  cor: 'hover:bg-gray-700' },
              { id: 'em_andamento', label: 'Ao vivo',   cor: 'hover:bg-green-800' },
              { id: 'encerrado',    label: 'Encerrado', cor: 'hover:bg-gray-700' },
            ].map(({ id, label, cor }) => (
              <button
                key={id}
                onClick={() => setStatus(id)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors border ${
                  status === id
                    ? id === 'em_andamento'
                      ? 'bg-green-800 border-green-600 text-white'
                      : 'bg-copa-dark border-copa-green text-copa-green'
                    : `bg-copa-dark border-copa-border text-gray-500 ${cor} hover:border-gray-500 hover:text-gray-300`
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {erro && <p className="text-red-400 text-sm mb-4 bg-red-900/20 px-3 py-2 rounded-lg">{erro}</p>}

        <div className="flex gap-3">
          <button
            onClick={salvar} disabled={salvando}
            className="flex-1 bg-copa-green text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
          >
            {salvando ? 'Salvando…' : 'Salvar alterações'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-copa-card border border-copa-border text-gray-400 font-bold py-2.5 rounded-lg hover:text-white transition-colors text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Aba de gestão de elencos ──────────────────────────────────────────────────

function ElencoAdmin({ adminKey }) {
  const { addToast } = useAppStore()
  const [selecoes, setSelecoes]   = useState([])
  const [selecaoId, setSelecaoId] = useState('')
  const [jogadores, setJogadores] = useState([])
  const [loadingJogs, setLoadingJogs] = useState(false)
  const [showForm, setShowForm]   = useState(false)
  const [adicionando, setAdicionando] = useState(false)
  const [form, setForm] = useState({
    nome: '', nome_curto: '', posicao: 'MID', numero: '', clube: '', idade: '', eh_capitao: 0,
  })

  useEffect(() => {
    fetch('/api/admin/selecoes', { headers: { 'X-Admin-Key': adminKey } })
      .then(r => r.ok ? r.json() : [])
      .then(setSelecoes)
      .catch(() => {})
  }, [adminKey])

  useEffect(() => {
    if (!selecaoId) return
    setLoadingJogs(true)
    fetch(`/api/admin/jogadores?selecao_id=${selecaoId}`, { headers: { 'X-Admin-Key': adminKey } })
      .then(r => r.ok ? r.json() : [])
      .then(setJogadores)
      .catch(() => {})
      .finally(() => setLoadingJogs(false))
  }, [selecaoId, adminKey])

  function fieldChange(k, v) { setForm(p => ({ ...p, [k]: v })) }

  async function adicionar() {
    if (!form.nome.trim() || !selecaoId) return
    setAdicionando(true)
    try {
      const res = await fetch('/api/admin/jogadores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey },
        body: JSON.stringify({
          selecao_id: parseInt(selecaoId),
          nome: form.nome,
          nome_curto: form.nome_curto || null,
          posicao: form.posicao,
          numero: form.numero ? parseInt(form.numero) : null,
          clube: form.clube || null,
          idade: form.idade ? parseInt(form.idade) : null,
          eh_capitao: form.eh_capitao,
        }),
      })
      if (!res.ok) throw new Error()
      const novo = await res.json()
      setJogadores(prev => [...prev, novo])
      setForm({ nome: '', nome_curto: '', posicao: 'MID', numero: '', clube: '', idade: '', eh_capitao: 0 })
      setShowForm(false)
      addToast('Jogador adicionado!', 'success')
    } catch {
      addToast('Erro ao adicionar jogador.', 'error')
    } finally {
      setAdicionando(false)
    }
  }

  async function remover(id) {
    try {
      await fetch(`/api/admin/jogadores/${id}`, { method: 'DELETE', headers: { 'X-Admin-Key': adminKey } })
      setJogadores(prev => prev.filter(j => j.id !== id))
      addToast('Jogador removido.', 'info')
    } catch {
      addToast('Erro ao remover jogador.', 'error')
    }
  }

  const inputCls = 'w-full bg-copa-dark border border-copa-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-copa-green transition-colors'

  return (
    <div>
      {/* Seletor */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={selecaoId}
          onChange={e => { setSelecaoId(e.target.value); setShowForm(false) }}
          className="bg-copa-card border border-copa-border text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-copa-green"
        >
          <option value="">Selecione uma seleção…</option>
          {selecoes.map(s => (
            <option key={s.id} value={s.id}>{s.bandeira_emoji} {s.nome_pt}</option>
          ))}
        </select>
        {selecaoId && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-copa-green text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            + Adicionar jogador
          </button>
        )}
      </div>

      {/* Formulário de adição */}
      {showForm && (
        <div className="card mb-6">
          <h3 className="font-display text-xl text-white mb-4">NOVO JOGADOR</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1 block">Nome *</label>
              <input type="text" value={form.nome} onChange={e => fieldChange('nome', e.target.value)}
                placeholder="Nome completo" className={inputCls} autoFocus />
            </div>
            <div>
              <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1 block">Nome curto</label>
              <input type="text" value={form.nome_curto} onChange={e => fieldChange('nome_curto', e.target.value)}
                placeholder="Apelido" className={inputCls} />
            </div>
            <div>
              <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1 block">Posição *</label>
              <select value={form.posicao} onChange={e => fieldChange('posicao', e.target.value)} className={inputCls}>
                <option value="GK">Goleiro</option>
                <option value="DEF">Defensor</option>
                <option value="MID">Meia</option>
                <option value="FWD">Atacante</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1 block">Número</label>
              <input type="number" min="1" max="99" value={form.numero} onChange={e => fieldChange('numero', e.target.value)}
                placeholder="—" className={inputCls} />
            </div>
            <div>
              <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1 block">Clube</label>
              <input type="text" value={form.clube} onChange={e => fieldChange('clube', e.target.value)}
                placeholder="Clube atual" className={inputCls} />
            </div>
            <div>
              <label className="text-[10px] text-gray-600 uppercase tracking-wider mb-1 block">Idade</label>
              <input type="number" min="15" max="50" value={form.idade} onChange={e => fieldChange('idade', e.target.value)}
                placeholder="—" className={inputCls} />
            </div>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none">
              <input
                type="checkbox" checked={!!form.eh_capitao}
                onChange={e => fieldChange('eh_capitao', e.target.checked ? 1 : 0)}
                className="accent-copa-green"
              />
              Capitão
            </label>
          </div>
          <div className="flex gap-3">
            <button
              onClick={adicionar} disabled={adicionando || !form.nome.trim()}
              className="bg-copa-green text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
            >
              {adicionando ? 'Adicionando…' : 'Adicionar'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-copa-card border border-copa-border text-gray-400 font-bold py-2 px-6 rounded-lg hover:text-white transition-colors text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista */}
      {selecaoId && (
        loadingJogs ? (
          <div className="card p-4 space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 bg-copa-border rounded animate-pulse" />
            ))}
          </div>
        ) : jogadores.length === 0 ? (
          <div className="card text-center py-12 text-gray-600">
            Nenhum jogador cadastrado para esta seleção
          </div>
        ) : (
          <div className="card p-0 overflow-hidden">
            <p className="text-[10px] text-gray-600 px-4 pt-3 pb-1">{jogadores.length} jogadores</p>
            <table className="w-full">
              <thead>
                <tr className="text-[10px] text-gray-600 uppercase tracking-wide border-b border-copa-border/50">
                  <th className="text-center py-2.5 pl-4 w-10">#</th>
                  <th className="text-left py-2.5 px-3">Nome</th>
                  <th className="text-center py-2.5 px-3 w-14">Pos.</th>
                  <th className="text-left py-2.5 px-3 hidden md:table-cell">Clube</th>
                  <th className="text-center py-2.5 px-3 w-12 hidden sm:table-cell">Idade</th>
                  <th className="py-2.5 pr-4 w-16" />
                </tr>
              </thead>
              <tbody>
                {jogadores.map(j => (
                  <tr key={j.id} className="border-b border-copa-border/20 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="text-center pl-4 py-2.5 text-xs font-mono text-gray-500">{j.numero ?? '—'}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-white">{j.nome_curto || j.nome}</span>
                        {!!j.eh_capitao && <span className="text-copa-gold text-[10px] font-bold">(C)</span>}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`text-xs font-bold ${COR_POS[j.posicao] || 'text-gray-400'}`}>{j.posicao}</span>
                    </td>
                    <td className="py-2.5 px-3 hidden md:table-cell">
                      <span className="text-xs text-gray-400">{j.clube || '—'}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center hidden sm:table-cell">
                      <span className="text-xs text-gray-500">{j.idade ?? '—'}</span>
                    </td>
                    <td className="py-2.5 pr-4 text-right">
                      <button
                        onClick={() => remover(j.id)}
                        className="text-xs text-gray-600 hover:text-red-400 transition-colors"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {!selecaoId && (
        <div className="card text-center py-16 text-gray-600">
          Selecione uma seleção para gerenciar o elenco
        </div>
      )}
    </div>
  )
}

// ── Login ─────────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [key, setKey] = useState('')
  return (
    <div className="max-w-sm mx-auto px-4 py-20">
      <div className="card text-center">
        <div className="text-4xl mb-4">🔐</div>
        <h1 className="font-display text-3xl text-white mb-2">PAINEL ADMIN</h1>
        <p className="text-gray-500 text-sm mb-6">Digite a chave de administrador para continuar</p>
        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onLogin(key)}
          placeholder="Chave de admin…"
          className="w-full bg-copa-dark border border-copa-border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-copa-green transition-colors mb-4 text-center tracking-widest"
          autoFocus
        />
        <button
          onClick={() => onLogin(key)}
          disabled={!key.trim()}
          className="w-full bg-copa-green text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          Entrar
        </button>
      </div>
    </div>
  )
}

// ── Página principal ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const { addToast } = useAppStore()

  useEffect(() => { document.title = 'Admin | Copa 2026' }, [])

  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem('copa_admin_key') || '')
  const [autenticado, setAuth]  = useState(() => !!sessionStorage.getItem('copa_admin_key'))

  const [abaAtiva, setAbaAtiva] = useState('jogos')

  // ── Jogos ──────────────────────────────────────────────────────────────────
  const [jogos, setJogos]             = useState([])
  const [loading, setLoading]         = useState(false)
  const [faseFiltro, setFaseFiltro]   = useState('todos')
  const [busca, setBusca]             = useState('')
  const [jogoEditando, setJogoEditando] = useState(null)

  useEffect(() => {
    if (!autenticado) return
    setLoading(true)
    fetch('/api/jogos?limit=300')
      .then(r => r.ok ? r.json() : [])
      .then(setJogos)
      .catch(() => addToast('Erro ao carregar jogos.', 'error'))
      .finally(() => setLoading(false))
  }, [autenticado])

  function handleLogin(key) {
    if (!key.trim()) return
    sessionStorage.setItem('copa_admin_key', key.trim())
    setAdminKey(key.trim())
    setAuth(true)
  }

  function handleLogout() {
    sessionStorage.removeItem('copa_admin_key')
    setAdminKey('')
    setAuth(false)
    setJogos([])
  }

  function handleSave(jogoAtualizado) {
    setJogos(prev => prev.map(j => j.id === jogoAtualizado.id
      ? {
          ...j,
          gols_a: jogoAtualizado.gols_a,
          gols_b: jogoAtualizado.gols_b,
          penaltis_a: jogoAtualizado.penaltis_a,
          penaltis_b: jogoAtualizado.penaltis_b,
          status: jogoAtualizado.status,
          selecao_a: jogoAtualizado.selecao_a || j.selecao_a,
          selecao_b: jogoAtualizado.selecao_b || j.selecao_b,
        }
      : j
    ))
    setJogoEditando(null)
  }

  const jogosFiltrados = useMemo(() => {
    let lista = faseFiltro === 'todos' ? jogos : jogos.filter(j => j.fase === faseFiltro)
    if (busca.trim()) {
      const q = busca.toLowerCase()
      lista = lista.filter(j =>
        j.selecao_a?.nome_pt?.toLowerCase().includes(q) ||
        j.selecao_b?.nome_pt?.toLowerCase().includes(q) ||
        j.grupo?.toLowerCase().includes(q) ||
        j.estadio?.toLowerCase().includes(q)
      )
    }
    return lista
  }, [jogos, faseFiltro, busca])

  const contadores = useMemo(() => ({
    agendado:     jogos.filter(j => j.status === 'agendado').length,
    em_andamento: jogos.filter(j => j.status === 'em_andamento').length,
    encerrado:    jogos.filter(j => j.status === 'encerrado').length,
  }), [jogos])

  if (!autenticado) return <LoginScreen onLogin={handleLogin} />

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-4xl text-white">PAINEL ADMIN</h1>
          <p className="text-gray-500 text-sm mt-1">Copa do Mundo 2026 · Gerenciamento</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2 text-xs">
            <span className="bg-green-900/50 text-green-400 px-2 py-1 rounded font-mono">{contadores.em_andamento} ao vivo</span>
            <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded font-mono">{contadores.encerrado} encerrados</span>
            <span className="bg-gray-700/50 text-gray-500 px-2 py-1 rounded font-mono">{contadores.agendado} agendados</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-600 hover:text-red-400 transition-colors px-2 py-1.5"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Abas */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'jogos',   label: 'Jogos' },
          { id: 'elencos', label: 'Elencos' },
        ].map(aba => (
          <button
            key={aba.id}
            onClick={() => setAbaAtiva(aba.id)}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors ${
              abaAtiva === aba.id
                ? 'bg-copa-green text-white'
                : 'bg-copa-card border border-copa-border text-gray-400 hover:text-white'
            }`}
          >
            {aba.label}
          </button>
        ))}
      </div>

      {/* ── Aba Jogos ── */}
      {abaAtiva === 'jogos' && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {FASES_TAB.map(f => (
              <button
                key={f.id}
                onClick={() => setFaseFiltro(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  faseFiltro === f.id
                    ? 'bg-copa-green text-white'
                    : 'bg-copa-card border border-copa-border text-gray-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
            <input
              type="text"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar seleção, estádio…"
              className="ml-auto bg-copa-card border border-copa-border rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-copa-green transition-colors"
            />
          </div>

          <p className="text-xs text-gray-600 mb-4">{jogosFiltrados.length} jogos</p>

          {loading ? (
            <div className="card p-4 space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="h-4 w-20 bg-copa-border rounded" />
                  <div className="h-4 flex-1 bg-copa-border rounded" />
                  <div className="h-4 w-24 bg-copa-border rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-[10px] text-gray-600 uppercase tracking-wide border-b border-copa-border/50">
                      <th className="text-left py-2.5 pl-4 pr-2 w-28">Status</th>
                      <th className="text-left py-2.5 pr-3 w-20 hidden sm:table-cell">Fase</th>
                      <th className="text-left py-2.5 pr-3">Time A</th>
                      <th className="text-center py-2.5 pr-3 w-28">Placar / Horário</th>
                      <th className="text-left py-2.5 pr-3">Time B</th>
                      <th className="text-left py-2.5 pr-4 w-16 hidden md:table-cell">Data</th>
                      <th className="py-2.5 pr-4 w-16" />
                    </tr>
                  </thead>
                  <tbody>
                    {jogosFiltrados.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-10 text-gray-600">
                          Nenhum jogo encontrado
                        </td>
                      </tr>
                    ) : jogosFiltrados.map(jogo => (
                      <tr
                        key={jogo.id}
                        className="border-b border-copa-border/20 last:border-0 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-3 pl-4 pr-2">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${STATUS_COR[jogo.status]}`}>
                            {STATUS_LABEL[jogo.status]}
                          </span>
                        </td>
                        <td className="py-3 pr-3 hidden sm:table-cell">
                          <span className="text-[10px] text-gray-600 font-mono">
                            {jogo.grupo ? `G${jogo.grupo}·R${jogo.rodada}` : jogo.fase}
                          </span>
                        </td>
                        <td className="py-3 pr-3">
                          <div className="flex items-center gap-1.5">
                            <Flag codigoIso={jogo.selecao_a?.codigo_iso} nome={jogo.selecao_a?.nome_pt} size="xs" />
                            <span className="text-sm text-gray-300 truncate max-w-[100px]">{jogo.selecao_a?.nome_pt}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-3 text-center">
                          {jogo.gols_a != null ? (
                            <span className="font-mono font-bold text-white text-sm">
                              {jogo.gols_a} × {jogo.gols_b}
                              {jogo.penaltis_a != null && (
                                <span className="text-copa-gold text-[10px] ml-1">
                                  ({jogo.penaltis_a}×{jogo.penaltis_b})
                                </span>
                              )}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-600 font-mono">{toHoraBrasilia(jogo.data_hora_utc)}</span>
                          )}
                        </td>
                        <td className="py-3 pr-3">
                          <div className="flex items-center gap-1.5">
                            <Flag codigoIso={jogo.selecao_b?.codigo_iso} nome={jogo.selecao_b?.nome_pt} size="xs" />
                            <span className="text-sm text-gray-300 truncate max-w-[100px]">{jogo.selecao_b?.nome_pt}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-3 hidden md:table-cell">
                          <span className="text-[10px] text-gray-600">{toDataBrasilia(jogo.data_hora_utc)}</span>
                        </td>
                        <td className="py-3 pr-4 text-right">
                          <button
                            onClick={() => setJogoEditando(jogo)}
                            className="text-xs font-semibold text-copa-green hover:text-green-300 transition-colors"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {jogoEditando && (
            <ModalEditar
              jogo={jogoEditando}
              adminKey={adminKey}
              onSave={handleSave}
              onClose={() => setJogoEditando(null)}
            />
          )}
        </>
      )}

      {/* ── Aba Elencos ── */}
      {abaAtiva === 'elencos' && (
        <ElencoAdmin adminKey={adminKey} />
      )}
    </div>
  )
}
