import clsx from 'clsx'
import { motion } from 'motion/react'

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
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
      <textarea
        rows={rows}
        className={clsx(
          'rounded-lg min-h-20 max-h-72',
          error && 'error',
          className
        )}
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
