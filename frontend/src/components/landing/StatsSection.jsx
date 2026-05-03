import { useState, useEffect, useRef } from 'react'

const STATS = [
  { valor: 48,   sufixo: '',  label: 'Seleções',    icon: '🌍', desc: 'de 6 confederações' },
  { valor: 104,  sufixo: '',  label: 'Jogos',        icon: '⚽', desc: '11 jun – 19 jul 2026' },
  { valor: 16,   sufixo: '',  label: 'Cidades-Sede', icon: '🏟️', desc: '3 países anfitriões' },
  { valor: 3,    sufixo: '',  label: 'Países',       icon: '🗺️', desc: 'EUA, México e Canadá' },
]

function useCountUp(target, duration, active) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, active])

  return count
}

function StatCard({ valor, sufixo, label, icon, desc, active }) {
  const count = useCountUp(valor, 1200, active)
  return (
    <div className="card text-center group hover:border-copa-green/40 transition-colors">
      <div className="text-3xl mb-3" aria-hidden="true">{icon}</div>
      <div className="font-display text-5xl md:text-6xl text-copa-gold mb-1 tabular-nums">
        {active ? count : 0}{sufixo}
      </div>
      <div className="font-bold text-white text-sm uppercase tracking-wider mb-1">{label}</div>
      <div className="text-xs text-gray-500">{desc}</div>
    </div>
  )
}

export default function StatsSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="font-display text-3xl md:text-4xl text-white mb-2">A MAIOR COPA DA HISTÓRIA</h2>
      <p className="text-gray-400 mb-8 text-sm">O torneio com o maior número de seleções e jogos de todos os tempos</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} active={visible} />
        ))}
      </div>
    </section>
  )
}
