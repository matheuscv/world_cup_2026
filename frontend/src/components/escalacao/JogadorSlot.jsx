const COR_POS = {
  GK:  'bg-yellow-500 border-yellow-300 shadow-yellow-500/40',
  DEF: 'bg-blue-600   border-blue-400   shadow-blue-500/40',
  MID: 'bg-emerald-600 border-emerald-400 shadow-emerald-500/40',
  FWD: 'bg-red-600    border-red-400    shadow-red-500/40',
}

export default function JogadorSlot({ slot, jogador, isDragOver, onDragOver, onDragLeave, onDrop, onClick }) {
  const cor = COR_POS[slot.pos] || 'bg-gray-600 border-gray-400 shadow-gray-500/40'

  const base = 'absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer select-none'

  if (jogador) {
    return (
      <div
        className={base}
        style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={onClick}
        title={`${jogador.nome} — clique para remover`}
      >
        <div className={`w-11 h-11 rounded-full border-2 flex flex-col items-center justify-center shadow-lg ${cor} ${isDragOver ? 'scale-110' : ''} transition-transform`}>
          <span className="text-white font-mono text-[11px] font-bold leading-none">
            {jogador.numero ?? '?'}
          </span>
        </div>
        <div className="mt-0.5 text-center max-w-[56px]">
          <p className="text-white text-[9px] font-bold leading-tight drop-shadow-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            {jogador.nome_curto || jogador.nome.split(' ').slice(-1)[0]}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={base}
      style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
      title={`${slot.label} — clique ou arraste um jogador`}
    >
      <div className={`w-11 h-11 rounded-full border-2 border-dashed flex items-center justify-center transition-colors ${
        isDragOver
          ? 'border-white bg-white/25 scale-110'
          : 'border-white/35 bg-black/20 hover:border-white/60 hover:bg-white/10'
      }`}>
        <span className="text-white/60 text-[9px] font-bold">{slot.label}</span>
      </div>
      <div className="mt-0.5 h-3" />
    </div>
  )
}
