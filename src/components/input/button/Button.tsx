import clsx from 'clsx'
import { motion } from 'motion/react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

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
  // Use CSS classes and variables for styling
  const baseClasses = 'btn-base'
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline'
  }
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg'
  }

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
    >
      {isLoading ? (
        <>
          <svg
            className='animate-spin -ml-1 mr-2 h-4 w-4'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  )
}
