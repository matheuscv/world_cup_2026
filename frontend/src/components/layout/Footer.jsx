import { NavLink } from 'react-router-dom'

const links = [
  { to: '/tabela',    label: 'Tabela' },
  { to: '/grupos',    label: 'Grupos' },
  { to: '/elencos',   label: 'Elencos' },
  { to: '/escalacao', label: 'Escalação' },
  { to: '/bolao',     label: 'Bolão' },
]

export default function Footer() {
  return (
    <footer className="bg-copa-card border-t border-copa-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display text-xl text-copa-green mb-1">COPA 2026</div>
            <p className="text-xs text-gray-600">FIFA World Cup · EUA · México · Canadá</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-4 md:gap-6" aria-label="Links do rodapé">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <p className="text-xs text-gray-600 text-center">
            Dados não oficiais · Apenas para fins informativos
          </p>
        </div>
      </div>
    </footer>
  )
}
