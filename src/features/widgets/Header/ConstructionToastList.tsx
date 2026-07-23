import { AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'

import type { Toast } from './useConstructionToast'

interface ConstructionToastListProps {
  toasts: Toast[]
}

export const ConstructionToastList = ({
  toasts
}: ConstructionToastListProps) => {
  return createPortal(
    <div className='pointer-events-none fixed bottom-6 left-1/2 z-[9999] flex -translate-x-1/2 flex-col-reverse items-center gap-2 px-4'>
      <AnimatePresence initial={false} mode='popLayout'>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            className='rounded-2xl border-2 border-yellow-400/80 bg-yellow-400/10 px-5 py-3 text-center text-xl font-bold text-yellow-300 shadow-[0_0_24px_rgba(250,204,21,0.25)] backdrop-blur-sm'
            exit={{ opacity: 0, y: -16, scale: 0.92, filter: 'blur(4px)' }}
            initial={{ opacity: 0, y: 40, scale: 0.88, filter: 'blur(6px)' }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  )
}
