import { useState, useEffect, useCallback } from 'react'
import useAppStore from '../store/useAppStore.js'

export function useBolao() {
  const { sessionId } = useAppStore()
  const [boloes, setBoloes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBoloes = useCallback(async () => {
    try {
      const res = await fetch('/api/boloes', { headers: { 'X-Session-Id': sessionId } })
      if (res.ok) setBoloes(await res.json())
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  useEffect(() => { fetchBoloes() }, [fetchBoloes])

  const criarBolao = async (nome) => {
    const res = await fetch('/api/boloes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Session-Id': sessionId },
      body: JSON.stringify({ nome }),
    })
    if (res.ok) { await fetchBoloes(); return res.json() }
    throw new Error('Erro ao criar bolao')
  }

  const deletarBolao = async (id) => {
    await fetch(`/api/boloes/${id}`, { method: 'DELETE', headers: { 'X-Session-Id': sessionId } })
    await fetchBoloes()
  }

  return { boloes, loading, criarBolao, deletarBolao, refetch: fetchBoloes }
}
