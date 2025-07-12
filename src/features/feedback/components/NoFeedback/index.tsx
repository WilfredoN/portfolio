import { motion } from 'motion/react'

interface NoFeedbacksProps {
  action?: React.ReactNode
  className?: string
  description: string
  icon?: React.ReactNode
  title: string
}

export const NoFeedbacks = ({
  title,
  description,
  icon,
  action,
  className = ''
}: NoFeedbacksProps) => {
  const defaultIcon = (
    <svg
      className='h-10 w-10 opacity-50'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      />
    </svg>
  )

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={`py-12 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
    >
      <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800'>
        {icon || defaultIcon}
      </div>
      <h3 className='mb-4 text-2xl font-medium'>{title}</h3>
      <p className='mx-auto mb-6 max-w-md text-lg opacity-70'>{description}</p>
      {action && action}
    </motion.div>
  )
}
