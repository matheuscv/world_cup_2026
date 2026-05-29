import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Em produção, redireciona todas as chamadas /api/* para o backend no Render.
// Em dev, fica vazio e o proxy do Vite encaminha para localhost:8000.
const API_BASE = import.meta.env.VITE_API_URL || ''
if (API_BASE) {
  const _fetch = window.fetch.bind(window)
  window.fetch = (url, options) => {
    if (typeof url === 'string' && url.startsWith('/')) {
      return _fetch(API_BASE + url, options)
    }
    return _fetch(url, options)
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
