import Countdown from '../countdown/Countdown.jsx'
import { Link } from 'react-router-dom'

const DECORATIONS = ['🇧🇷', '🏆', '⚽', '🇦🇷', '🇫🇷', '🇩🇪', '🇵🇹', '🇪🇸']

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(0,156,59,0.25) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-copa-green/8 via-transparent to-copa-dark pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-copa-dark/60 via-transparent to-copa-dark/60 pointer-events-none" aria-hidden="true" />

      {/* Floating decorations — desktop only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block" aria-hidden="true">
        {DECORATIONS.map((emoji, i) => (
          <span
            key={i}
            className="absolute text-4xl opacity-10 select-none"
            style={{
              left: `${8 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              transform: `rotate(${-20 + i * 7}deg)`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Watermark "2026" */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[20vw] text-white/3 select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        2026
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-copa-gold font-semibold tracking-[0.4em] uppercase text-xs md:text-sm mb-6">
          FIFA World Cup · EUA · México · Canadá
        </p>

        <h1 className="font-display leading-none mb-2">
          <span className="block text-[clamp(3rem,12vw,8rem)] text-white">COPA DO</span>
          <span className="block text-[clamp(3rem,12vw,8rem)] text-copa-green relative">
            MUNDO 2026
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-copa-gold" />
          </span>
        </h1>

        <p className="text-gray-400 font-light tracking-[0.5em] uppercase text-sm md:text-base mt-8 mb-12">
          We Are 26 &nbsp;·&nbsp; 11 Jun – 19 Jul 2026
        </p>

        <div className="mb-12">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Abertura em</p>
          <Countdown />
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/tabela" className="btn-primary text-sm px-8 py-3">
            Ver Tabela de Jogos
          </Link>
          <Link to="/grupos" className="btn-secondary text-sm px-8 py-3">
            Classificação dos Grupos
          </Link>
        </div>
      </div>
    </section>
  )
}
