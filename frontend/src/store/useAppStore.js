import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      sessionId: crypto.randomUUID(),

      tema: 'dark',
      toggleTema: () => set((s) => ({ tema: s.tema === 'dark' ? 'light' : 'dark' })),

      bolaoAtivo: null,
      setBolaoAtivo: (bolao) => set({ bolaoAtivo: bolao }),

      filtroFase: 'todos',
      filtroGrupo: '',
      setFiltroFase: (fase) => set({ filtroFase: fase }),
      setFiltroGrupo: (grupo) => set({ filtroGrupo: grupo }),

      toasts: [],
      addToast: (msg, type = 'success') => {
        const id = Date.now()
        set((state) => ({ toasts: [...state.toasts, { id, msg, type }] }))
        setTimeout(() => set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) })), 3000)
      },
      removeToast: (id) => set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) })),
    }),
    {
      name: 'copa2026-store',
      partialize: (state) => ({ sessionId: state.sessionId, bolaoAtivo: state.bolaoAtivo, tema: state.tema }),
    }
  )
)

export default useAppStore
