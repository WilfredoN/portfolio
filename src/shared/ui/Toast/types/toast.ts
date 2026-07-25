export type ToastType = 'success' | 'info' | 'warning' | 'error'

export interface ToastItem {
  duration?: number
  id: string
  message: string
  type?: ToastType
}

export interface ToastContextValue {
  removeToast: (id: string) => void
  showToast: (message: string, type?: ToastType, duration?: number) => void
  toasts: ToastItem[]
}
