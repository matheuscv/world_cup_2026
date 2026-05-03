import { useState, useEffect, useCallback } from 'react'
import { fetchRetry } from '../utils/fetchRetry.js'

export function useJogos(filtros = {}) {
  const [jogos, setJogos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchJogos = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      Object.entries(filtros).forEach(([k, v]) => { if (v) params.set(k, v) })
      const res = await fetchRetry(`/api/jogos?${params}`)
      if (!res.ok) throw new Error('Erro ao buscar jogos')
      const data = await res.json()
      setJogos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filtros)])

  useEffect(() => { fetchJogos() }, [fetchJogos])

  return { jogos, loading, error, refetch: fetchJogos }
}
