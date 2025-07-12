import { Tooltip } from '@shared/components/Tooltip'
import { motion } from 'motion/react'
import { FaFileDownload } from 'react-icons/fa'

// TODO: move
interface FileProps {
  url?: string
}

export const Resume = ({ url = 'assets/resume.pdf' }: FileProps) => {
  const handleClick = () => {
    window.open(url, '_blank')
  }

  return (
    <div className='absolute bottom-4 right-4 z-10'>
      <Tooltip text='Check my CV!'>
        <motion.div
          className='relative flex cursor-pointer items-center justify-center rounded-3xl p-3 outline outline-white'
          title='Download CV'
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          whileHover={{ scale: 1.2 }}
          onClick={handleClick}
        >
          <motion.div
            transition={{ duration: 0.2 }}
            whileHover={{ color: '#ffffff' }}
          >
            <FaFileDownload size={48} />
          </motion.div>
        </motion.div>
      </Tooltip>
    </div>
  )
}
