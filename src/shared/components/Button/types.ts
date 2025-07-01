import type { ReactNode } from 'react'

export interface ButtonProps {
  children: ReactNode
  className?: string
  disabled?: boolean
  isLoading?: boolean
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline'
}
