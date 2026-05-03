import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/landing/HeroSection.jsx'
import StatsSection from '../components/landing/StatsSection.jsx'
import ProximosJogos from '../components/landing/ProximosJogos.jsx'
import UltimosResultados from '../components/landing/UltimosResultados.jsx'

const quickLinks = [
  { to: '/tabela',   label: 'Tabela de Jogos',  desc: 'Todos os 104 jogos da Copa',    icon: '📅' },
  { to: '/grupos',   label: 'Grupos',            desc: 'Classificação dos 12 grupos',   icon: '🏆' },
  { to: '/elencos',  label: 'Elencos',           desc: 'Jogadores das 48 seleções',     icon: '⚽' },
  { to: '/bolao',    label: 'Bolão',             desc: 'Faça seus palpites e simule',   icon: '🎯' },
]

export default function HomePage() {
  useEffect(() => { document.title = 'Copa 2026 — FIFA World Cup' }, [])

  return (
    <div>
      <HeroSection />

      <StatsSection />

      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="font-display text-3xl md:text-4xl text-white mb-2">ACESSO RÁPIDO</h2>
        <p className="text-gray-500 text-sm mb-6">Explore todas as funcionalidades da Copa 2026</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map(({ to, label, desc, icon }) => (
            <Link
              key={to}
              to={to}
              className="card hover:border-copa-green/50 hover:bg-copa-green/5 transition-all group"
            >
              <div className="text-4xl mb-4" aria-hidden="true">{icon}</div>
              <div className="font-bold text-white group-hover:text-copa-green transition-colors mb-1 text-sm">
                {label}
              </div>
              <div className="text-xs text-gray-500">{desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <UltimosResultados />

      <ProximosJogos />

      <section className="max-w-7xl mx-auto px-4 py-12 pb-20">
        <div className="card bg-gradient-to-r from-copa-green/10 via-copa-card to-copa-gold/10 border-copa-green/20 text-center py-10">
          <p className="font-display text-4xl md:text-5xl text-white mb-2">MONTE SUA ESCALAÇÃO</p>
          <p className="text-gray-400 mb-6 text-sm">Defina os 11 titulares do Brasil com drag & drop</p>
          <Link to="/escalacao" className="btn-primary inline-block">
            🇧🇷 Escalar o Brasil
          </Link>
        </div>
      </section>
    </div>
  )
}
