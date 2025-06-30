import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import React, { useState } from 'react'

import { tooltipVariants } from '../../../types/tooltipVariants'

export type TooltipPosition = 'right' | 'left'

interface TooltipProps {
  children: React.ReactNode
  text: React.ReactNode
  className?: string
}

export const Tooltip = ({ children, text, className = '' }: TooltipProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='relative inline-block group'
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={clsx(
              'absolute text-3xl bg-black text-white px-4 py-2 rounded-lg whitespace-nowrap z-50 flex items-center',
              'left-full top-4 -translate-y-1/2',
              'md:left-full md:ml-4',
              'max-md:right-full max-md:mr-2 max-md:left-auto max-md:ml-0',
              className
            )}
            variants={tooltipVariants.right}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
