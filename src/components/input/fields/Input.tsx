import clsx from 'clsx'
import { motion } from 'motion/react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
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
      className='w-full'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className='block text-lg font-medium mb-2 text-current'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}
      <input
        className={clsx('rounded-lg', error && 'error', className)}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <motion.p
          className='mt-2 text-sm text-red-500 dark:text-red-400'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}

export default Input
