import { useState, useEffect } from 'react'

const TARGET = new Date('2026-06-11T20:00:00Z')

function calcularRestante() {
  const diff = TARGET - new Date()
  if (diff <= 0) return null
  return {
    dias:     Math.floor(diff / 86400000),
    horas:    Math.floor((diff % 86400000) / 3600000),
    minutos:  Math.floor((diff % 3600000) / 60000),
    segundos: Math.floor((diff % 60000) / 1000),
  }
}

function Bloco({ valor, label, pulsa }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          relative bg-copa-card border rounded-xl
          w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28
          flex items-center justify-center
          ${pulsa ? 'border-copa-gold/60 shadow-[0_0_12px_rgba(200,169,81,0.25)]' : 'border-copa-border'}
          transition-all duration-300
        `}
      >
        <span className="font-mono font-bold text-2xl sm:text-3xl md:text-5xl text-copa-gold tabular-nums">
          {String(valor).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs text-gray-500 mt-2 uppercase tracking-widest">{label}</span>
    </div>
  )
}

function Separador() {
  return (
    <div className="flex items-center pb-6 text-copa-border font-bold text-xl md:text-3xl select-none">
      :
    </div>
  )
}

export default function Countdown() {
  const [restante, setRestante] = useState(calcularRestante())

  useEffect(() => {
    const timer = setInterval(() => setRestante(calcularRestante()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!restante) {
    return (
      <div className="text-center py-4">
        <p className="font-display text-4xl md:text-5xl text-copa-green">A Copa Começou! 🏆</p>
      </div>
    )
  }

  return (
    <div className="flex gap-2 sm:gap-3 md:gap-5 justify-center items-start">
      <Bloco valor={restante.dias}     label="Dias"    pulsa={false} />
      <Separador />
      <Bloco valor={restante.horas}   label="Horas"   pulsa={false} />
      <Separador />
      <Bloco valor={restante.minutos} label="Min"     pulsa={false} />
      <Separador />
      <Bloco valor={restante.segundos} label="Seg"   pulsa={true}  />
    </div>
  )
}
