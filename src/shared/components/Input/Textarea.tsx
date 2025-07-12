import clsx from 'clsx'
import { motion } from 'motion/react'

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
  required?: boolean
}

export const Textarea = ({
  label,
  error,
  required,
  className = '',
  rows = 4,
  ...props
}: TextareaProps) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className='w-full'
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className='mb-2 block text-lg font-medium text-current'>
          {label}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}
      <textarea
        aria-invalid={!!error}
        className={clsx(
          'max-h-72 min-h-20 rounded-lg',
          error && 'error',
          className
        )}
        rows={rows}
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
