import { useCallback, useRef, useState } from 'react'

export interface Toast {
  id: number
  message: string
}

const MAX_TOASTS = 3

export const useConstructionToast = (message: string) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const counterRef = useRef(0)

  const addToast = useCallback(() => {
    setToasts((prev) => {
      const base = prev.length >= MAX_TOASTS ? prev.slice(1) : prev
      const id = ++counterRef.current
      setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== id))
      }, 3000)
      return [...base, { id, message }]
    })
  }, [message])

  return { toasts, addToast }
}
