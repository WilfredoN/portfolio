import clsx from 'clsx'

interface NoFeedbacksProps {
  className?: string
  description?: string
  title?: string
}

export const NoFeedbacks = ({
  title = 'No feedback yet',
  description = 'Be the first to share your thoughts and experiences!',
  className = ''
}: NoFeedbacksProps) => {
  const icon = (
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
    <div className={clsx('py-12 text-center', className)}>
      <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800'>
        {icon}
      </div>
      <h3 className='mb-4 text-2xl font-medium'>{title}</h3>
      <p className='mx-auto mb-6 max-w-md text-lg opacity-70'>{description}</p>
    </div>
  )
}
