import { sendGAEvent } from '@features/shared/analytics/ga'
import { Tooltip } from '@shared/components/Tooltip'
import { motion } from 'motion/react'

// TODO: move
interface FileProps {
  url?: string
}

export const Resume = ({ url = 'resume.pdf' }: FileProps) => {
  const handleClick = () => {
    sendGAEvent({
      action: 'resume_view',
      category: 'Resume',
      label: url
    })
    window.open(url, '_blank')
  }

  return (
    <div className='absolute right-4 bottom-4 z-10'>
      <Tooltip text='Check my CV!'>
        <motion.div
          className='relative flex cursor-pointer items-center justify-center rounded-3xl p-3 outline outline-white'
          title='Download CV'
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          whileHover={{ scale: 1.2 }}
          onClick={handleClick}
        >
          <svg
            fill='currentColor'
            height='48'
            viewBox='0 0 24 24'
            width='48'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M12 3a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L11 12.586V4a1 1 0 011-1z' />
            <path d='M5 20a2 2 0 012-2h10a2 2 0 012 2 1 1 0 11-2 0H7a1 1 0 10-2 0 1 1 0 11-2 0 4 4 0 014-4h10a4 4 0 014 4 3 3 0 01-3 3H6a3 3 0 01-3-3 1 1 0 112 0z' />
          </svg>
        </motion.div>
      </Tooltip>
    </div>
  )
}
