import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import TabelaPage from './pages/TabelaPage.jsx'
import GruposPage from './pages/GruposPage.jsx'
import ElencoPage from './pages/ElencoPage.jsx'
import EscalacaoPage from './pages/EscalacaoPage.jsx'
import BolaoPage from './pages/BolaoPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import useAppStore from './store/useAppStore.js'

export default function App() {
  const tema = useAppStore(s => s.tema)

  useEffect(() => {
    const html = document.documentElement
    if (tema === 'light') {
      html.classList.add('light')
    } else {
      html.classList.remove('light')
    }
  }, [tema])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tabela" element={<TabelaPage />} />
        <Route path="grupos" element={<GruposPage />} />
        <Route path="elencos" element={<ElencoPage />} />
        <Route path="escalacao" element={<EscalacaoPage />} />
        <Route path="bolao" element={<BolaoPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>
    </Routes>
  )
}
