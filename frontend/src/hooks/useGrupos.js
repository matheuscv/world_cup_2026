import { useState, useEffect } from 'react'
import { fetchRetry } from '../utils/fetchRetry.js'

export function useGrupos() {
  const [grupos, setGrupos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRetry('/api/grupos')
      .then(r => { if (!r.ok) throw new Error('Erro ao buscar grupos'); return r.json() })
      .then(setGrupos)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { grupos, loading, error }
}
