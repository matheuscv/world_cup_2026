import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useAppStore from '../../store/useAppStore.js'

const navLinks = [
  { to: '/tabela',   label: 'Tabela' },
  { to: '/grupos',   label: 'Grupos' },
  { to: '/elencos',  label: 'Elencos' },
  { to: '/escalacao', label: '🇧🇷 Brasil' },
  { to: '/bolao',    label: 'Bolão' },
]

function IconSun() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  )
}

function IconMoon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const tema = useAppStore(s => s.tema)
  const toggleTema = useAppStore(s => s.toggleTema)

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-copa-green font-semibold transition-colors'
      : 'text-gray-400 hover:text-white transition-colors'

  return (
    <header className="sticky top-0 z-50 bg-copa-dark/95 backdrop-blur border-b border-copa-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-display text-2xl text-copa-green tracking-wider hover:text-green-400 transition-colors">
          COPA 2026
        </NavLink>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={toggleTema}
          className="text-gray-400 hover:text-copa-green transition-colors p-2 rounded-lg"
          aria-label={tema === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          title={tema === 'dark' ? 'Modo claro' : 'Modo escuro'}
        >
          {tema === 'dark' ? <IconSun /> : <IconMoon />}
        </button>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <nav
          className="md:hidden border-t border-copa-border bg-copa-card px-4 py-4 flex flex-col gap-1"
          aria-label="Menu mobile"
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-copa-green/10 text-copa-green'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
