import { motion } from 'motion/react'
import { useEffect } from 'react'

import type { ToastItem as ToastItemType } from '../types/toast'

import { DEFAULT_TOAST_DURATION } from '../constants/toast'

interface ToastItemProps {
  onDismiss: (id: string) => void
  toast: ToastItemType
}

export const ToastItem = ({ toast, onDismiss }: ToastItemProps) => {
  const {
    id,
    message,
    type = 'info',
    duration = DEFAULT_TOAST_DURATION
  } = toast

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id)
    }, duration)
    return () => clearTimeout(timer)
  }, [id, duration, onDismiss])

  const getStatusStyles = () => {
    switch (type) {
      case 'success':
        return {
          borderColor: 'var(--color-status-success-border)',
          backgroundColor: 'var(--color-status-success-bg)',
          color: 'var(--color-status-success)'
        }
      case 'error':
        return {
          borderColor: 'var(--color-status-error-border)',
          backgroundColor: 'var(--color-status-error-bg)',
          color: 'var(--color-status-error)'
        }
      case 'warning':
        return {
          borderColor: 'var(--color-status-warning-border)',
          backgroundColor: 'var(--color-status-warning-bg)',
          color: 'var(--color-status-warning)'
        }
      default:
        return {
          borderColor: 'var(--color-status-info-border)',
          backgroundColor: 'var(--color-status-info-bg)',
          color: 'var(--color-status-info)'
        }
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      default:
        return 'ℹ'
    }
  }

  const statusStyles = getStatusStyles()

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className='pointer-events-auto flex items-center justify-between rounded-xl border px-4 py-3 shadow-lg'
      exit={{ opacity: 0, y: -8 }}
      initial={{ opacity: 0, y: -12 }}
      style={{
        backgroundColor: 'var(--color-toast-bg)',
        color: 'var(--color-toast-text)',
        borderColor: statusStyles.borderColor
      }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <motion.div className='flex flex-row items-center gap-3'>
        <span
          className='flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold shadow-xs'
          style={{
            backgroundColor: statusStyles.backgroundColor,
            color: statusStyles.color
          }}
        >
          {getIcon()}
        </span>
        <span className='text-sm font-medium'>{message}</span>
      </motion.div>
      <button
        aria-label='Dismiss toast'
        className='ml-2 text-xs opacity-60 transition-opacity hover:opacity-100'
        onClick={() => onDismiss(id)}
      >
        ✕
      </button>
    </motion.div>
  )
}
