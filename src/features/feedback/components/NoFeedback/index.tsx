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
      className='w-10 h-10 opacity-50'
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
      className={`text-center py-12 ${className}`}
      initial={{ opacity: 0, y: 20 }}
    >
      <div className='w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6'>
        {icon || defaultIcon}
      </div>
      <h3 className='text-2xl font-medium mb-4'>{title}</h3>
      <p className='text-lg opacity-70 mb-6 max-w-md mx-auto'>{description}</p>
      {action && action}
    </motion.div>
  )
}
