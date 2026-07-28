import { AnimatePresence } from 'motion/react'

import type { ToastItem as ToastItemType } from '../types/toast'

import { ToastItem } from './ToastItem'

interface ToastContainerProps {
  onDismiss: (id: string) => void
  toasts: ToastItemType[]
}

export const ToastContainer = ({ toasts, onDismiss }: ToastContainerProps) => {
  return (
    <div className='pointer-events-none fixed top-5 right-5 z-50 flex w-full max-w-sm flex-col gap-2.5'>
      <AnimatePresence mode='sync'>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  )
}
