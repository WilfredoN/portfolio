import type { ReactNode } from 'react'

import { createContext, useCallback, useState } from 'react'

import type { ToastContextValue, ToastItem, ToastType } from '../types/toast'

import { ToastContainer } from '../components/ToastContainer'

export const ToastContext = createContext<ToastContextValue | null>(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', duration?: number) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
      setToasts((prev) => [...prev, { id, message, type, duration }])
    },
    []
  )

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  )
}
