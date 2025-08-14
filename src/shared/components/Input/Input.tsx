import clsx from 'clsx'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  required?: boolean
}

const InputComponent = ({
  label,
  error,
  required,
  className = '',
  ...props
}: InputProps) => {
  return (
    <div className='w-full'>
      {label && (
        <label className='mb-2 block text-lg font-medium text-current'>
          {label}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}
      <input
        aria-invalid={!!error}
        className={clsx('rounded-lg', error && 'error', className)}
        {...props}
      />
      {error && (
        <p className='mt-2 text-sm text-red-500 dark:text-red-400'>{error}</p>
      )}
    </div>
  )
}

export const Input = React.memo(InputComponent)
