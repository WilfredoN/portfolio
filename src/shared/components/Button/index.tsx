import { Spinner } from '@shared/components/Spinner'
import clsx from 'clsx'
import { motion } from 'motion/react'

import type { ButtonProps } from './types'

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  children,
  disabled,
  onClick,
  type = 'button'
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-full outline-none border-none cursor-pointer relative select-none box-border transition-colors duration-200 ease-in-out gap-2 min-w-[2.5rem] min-h-[2.5rem] leading-[1.2]'
  const variantClasses = {
    primary:
      'bg-[var(--color-accent)] text-white shadow-[0_2px_8px_0_rgba(0,86,179,0.08)] hover:bg-[#003d80]:not(:disabled) focus-visible:bg-[#003d80]:not(:disabled)',
    secondary:
      'bg-[#6b7280] text-white shadow-[0_2px_8px_0_rgba(107,114,128,0.08)] hover:bg-[#374151]:not(:disabled) focus-visible:bg-[#374151]:not(:disabled)',
    outline:
      'bg-transparent border-2 border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-nav)]:not(:disabled) hover:text-[var(--color-accent)]:not(:disabled) focus-visible:bg-[var(--color-nav)]:not(:disabled) focus-visible:text-[var(--color-accent)]:not(:disabled)'
  }
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  const disabledClasses = 'opacity-50 cursor-not-allowed'

  return (
    <motion.button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled || isLoading ? disabledClasses : '',
        className
      )}
      disabled={disabled || isLoading}
      type={type}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Spinner />
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  )
}
