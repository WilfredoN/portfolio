import clsx from 'clsx'
import { motion } from 'motion/react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  required?: boolean
}

export const Input = ({
  label,
  error,
  required,
  className = '',
  ...props
}: InputProps) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className='w-full'
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className='block text-lg font-medium mb-2 text-current'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}
      <input
        aria-invalid={!!error}
        className={clsx('rounded-lg', error && 'error', className)}
        {...props}
      />
      {error && (
        <motion.p
          animate={{ opacity: 1 }}
          className='mt-2 text-sm text-red-500 dark:text-red-400'
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}
