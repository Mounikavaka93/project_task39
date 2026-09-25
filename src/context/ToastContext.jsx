import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback(
    (toast) => {
      const id = crypto.randomUUID()
      setToasts((current) => [...current, { id, ...toast }])
      window.setTimeout(() => dismiss(id), toast.duration ?? 3400)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toasts, pushToast, dismiss }), [toasts, pushToast, dismiss])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
