import { motion } from 'motion/react'
import React from 'react'
import { FaFileDownload } from 'react-icons/fa'

import { Tooltip } from './Tooltip'

interface DownloadButtonProps {
  pdfUrl: string
}

export const DownloadButton = React.memo(({ pdfUrl }: DownloadButtonProps) => {
  const handleDownload = () => {
    window.open(pdfUrl, '_blank')
  }

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <Tooltip text="Check my CV!">
        <motion.div
          onClick={handleDownload}
          className="relative p-3 outline cursor-pointer rounded-3xl flex items-center justify-center outline-white"
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          title="Download CV"
        >
          <motion.div
            whileHover={{ color: '#ffffff' }}
            transition={{ duration: 0.2 }}
          >
            <FaFileDownload size={48} />
          </motion.div>
        </motion.div>
      </Tooltip>
    </div>
  )
})
