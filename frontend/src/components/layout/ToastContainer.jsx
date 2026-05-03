import useAppStore from '../../store/useAppStore.js'

const CORES = {
  success: 'bg-copa-green/20 border-copa-green/40 text-copa-green',
  error:   'bg-red-900/30   border-red-700/40    text-red-400',
  info:    'bg-blue-900/30  border-blue-700/40   text-blue-400',
  warning: 'bg-copa-gold/20 border-copa-gold/40  text-copa-gold',
}

const ICONES = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' }

export default function ToastContainer() {
  const { toasts, removeToast } = useAppStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none" role="status" aria-live="polite">
      {toasts.map(toast => {
        const cor = CORES[toast.type] || CORES.success
        const icone = ICONES[toast.type] || ICONES.success
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm shadow-lg pointer-events-auto max-w-xs ${cor}`}
            style={{ animation: 'slideInRight 0.25s ease-out' }}
          >
            <span className="font-bold text-sm flex-shrink-0">{icone}</span>
            <span className="text-sm font-medium flex-1">{toast.msg}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="opacity-60 hover:opacity-100 transition-opacity text-sm leading-none flex-shrink-0"
              aria-label="Fechar"
            >
              ×
            </button>
          </div>
        )
      })}
    </div>
  )
}
