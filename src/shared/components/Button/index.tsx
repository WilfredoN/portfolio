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
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline'
  }
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
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
