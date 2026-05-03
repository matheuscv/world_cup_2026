import { toHoraBrasilia } from '../../utils/formatDate.js'

const STATUS_CFG = {
  agendado:     { label: 'Agendado',  cls: 'badge-agendado' },
  em_andamento: { label: 'Ao Vivo',   cls: 'badge-em-andamento' },
  encerrado:    { label: 'Encerrado', cls: 'badge-encerrado' },
}

function LinhaClassificacao({ item, pos, onClickSelecao }) {
  const classificado = pos <= 2
  const terceiro     = pos === 3
  const eliminado    = pos === 4

  const corBorda = classificado
    ? 'border-l-2 border-copa-green'
    : terceiro
      ? 'border-l-2 border-copa-gold/60'
      : 'border-l-2 border-red-800/50'

  const corFundo = classificado
    ? 'bg-copa-green/5'
    : terceiro
      ? 'bg-copa-gold/5'
      : ''

  return (
    <tr className={`${corBorda} ${corFundo} border-b border-copa-border/30 last:border-0 group`}>
      <td className="py-2 pl-3 pr-2 text-gray-500 text-xs w-6">{pos}</td>
      <td className="py-2 pr-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-lg leading-none flex-shrink-0">{item.bandeira_emoji}</span>
          <span className={`font-semibold text-sm truncate ${classificado ? 'text-white' : 'text-gray-300'}`}>
            {item.nome_pt}
          </span>
          {item.eh_cabeca_chave && (
            <span className="flex-shrink-0 text-[9px] font-bold bg-copa-gold/20 text-copa-gold border border-copa-gold/30 px-1 py-0.5 rounded hidden sm:inline">
              C1
            </span>
          )}
        </div>
      </td>
      <td className="text-center py-2 text-gray-500 text-xs w-7">{item.jogos}</td>
      <td className="text-center py-2 text-gray-500 text-xs w-7">{item.vitorias}</td>
      <td className="text-center py-2 text-gray-500 text-xs w-7">{item.empates}</td>
      <td className="text-center py-2 text-gray-500 text-xs w-7">{item.derrotas}</td>
      <td className="text-center py-2 text-gray-400 text-xs w-7">{item.gols_pro}</td>
      <td className="text-center py-2 text-gray-400 text-xs w-7">{item.gols_contra}</td>
      <td className={`text-center py-2 text-xs w-8 font-medium ${item.saldo_gols > 0 ? 'text-copa-green' : item.saldo_gols < 0 ? 'text-red-400' : 'text-gray-400'}`}>
        {item.saldo_gols > 0 ? `+${item.saldo_gols}` : item.saldo_gols}
      </td>
      <td className="text-center py-2 font-bold text-white text-sm w-8 pr-2">{item.pontos}</td>
    </tr>
  )
}

function JogoRodada({ jogo }) {
  const cfg      = STATUS_CFG[jogo.status] || STATUS_CFG.agendado
  const encerrado = jogo.status === 'encerrado'
  const aoVivo    = jogo.status === 'em_andamento'
  const vitA      = encerrado && jogo.gols_a > jogo.gols_b
  const vitB      = encerrado && jogo.gols_b > jogo.gols_a

  return (
    <div className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm
      ${aoVivo ? 'bg-copa-green/10 border border-copa-green/20' : 'hover:bg-white/5 transition-colors'}`}
    >
      <div className={`flex items-center gap-2 flex-1 justify-end ${encerrado && vitB ? 'opacity-40' : ''}`}>
        <span className={`font-medium text-right text-xs truncate max-w-[80px] ${vitA ? 'text-white' : 'text-gray-400'}`}>
          {jogo.selecao_a?.nome_pt}
        </span>
        <span className="text-base flex-shrink-0">{jogo.selecao_a?.bandeira_emoji}</span>
      </div>

      <div className="flex items-center mx-3 min-w-[56px] justify-center">
        {encerrado || aoVivo ? (
          <span className="font-mono font-bold text-sm text-white">
            {jogo.gols_a} – {jogo.gols_b}
          </span>
        ) : (
          <span className="text-copa-gold font-mono text-xs font-semibold">
            {toHoraBrasilia(jogo.data_hora_utc)}
          </span>
        )}
      </div>

      <div className={`flex items-center gap-2 flex-1 ${encerrado && vitA ? 'opacity-40' : ''}`}>
        <span className="text-base flex-shrink-0">{jogo.selecao_b?.bandeira_emoji}</span>
        <span className={`font-medium text-xs truncate max-w-[80px] ${vitB ? 'text-white' : 'text-gray-400'}`}>
          {jogo.selecao_b?.nome_pt}
        </span>
      </div>

      <span className={`${cfg.cls} flex-shrink-0 ml-2 hidden sm:inline`}>{cfg.label}</span>
    </div>
  )
}

export default function TabelaGrupo({ letra, classificacao = [], jogos = [], onClick }) {
  const cabecaChave = classificacao.find(s => s.eh_cabeca_chave)

  const jogosPorRodada = jogos.reduce((acc, j) => {
    const r = j.rodada || 1
    if (!acc[r]) acc[r] = []
    acc[r].push(j)
    return acc
  }, {})

  return (
    <div
      className={`card flex flex-col gap-0 p-0 overflow-hidden
        ${onClick ? 'cursor-pointer hover:border-copa-green/50 transition-colors' : ''}`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-copa-border/50">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl text-copa-gold">GRUPO {letra}</span>
          {cabecaChave && (
            <span className="text-lg" title={`Cabeça de chave: ${cabecaChave.nome_pt}`}>
              {cabecaChave.bandeira_emoji}
            </span>
          )}
        </div>
        {cabecaChave && (
          <span className="text-xs text-gray-600 hidden sm:block">
            {cabecaChave.nome_pt} · Cabeça de Chave
          </span>
        )}
      </div>

      {/* Tabela de classificação */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-600 text-[10px] uppercase tracking-wide">
              <th className="text-left py-1.5 pl-3 pr-2 w-6">#</th>
              <th className="text-left py-1.5">Seleção</th>
              <th className="text-center py-1.5 w-7">J</th>
              <th className="text-center py-1.5 w-7">V</th>
              <th className="text-center py-1.5 w-7">E</th>
              <th className="text-center py-1.5 w-7">D</th>
              <th className="text-center py-1.5 w-7">GP</th>
              <th className="text-center py-1.5 w-7">GC</th>
              <th className="text-center py-1.5 w-8">SG</th>
              <th className="text-center py-1.5 w-8 text-gray-400 pr-2">Pts</th>
            </tr>
          </thead>
          <tbody>
            {classificacao.map((item, idx) => (
              <LinhaClassificacao key={item.selecao_id} item={item} pos={idx + 1} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Jogos por rodada (visível somente quando passado) */}
      {Object.keys(jogosPorRodada).length > 0 && (
        <div className="border-t border-copa-border/50 px-3 pb-3 pt-2 flex flex-col gap-1">
          {Object.entries(jogosPorRodada).map(([rodada, jogosDaRodada]) => (
            <div key={rodada}>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider py-1 px-1">Rodada {rodada}</p>
              {jogosDaRodada.map(j => <JogoRodada key={j.id} jogo={j} />)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
