import clsx from 'clsx'

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
    <div className='w-full'>
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
        <p className='mt-2 text-sm text-red-500 dark:text-red-400'>{error}</p>
      )}
    </div>
  )
}
