import { tooltipVariant } from '@shared/components/Tooltip/variants'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import React, { useState } from 'react'

export type TooltipPosition = 'right' | 'left'

interface TooltipProps {
  children: React.ReactNode
  className?: string
  text: React.ReactNode
}

export const Tooltip = ({ children, text, className = '' }: TooltipProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className='group relative inline-block'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence mode='wait'>
        {isHovered && (
          <motion.div
            animate='animate'
            className={clsx(
              'absolute z-50 flex items-center rounded-lg bg-black px-4 py-2 text-3xl whitespace-nowrap text-white',
              'top-4 left-full -translate-y-1/2',
              'md:left-full md:ml-4',
              'max-md:right-full max-md:left-auto max-md:mr-2 max-md:ml-0',
              className
            )}
            exit='exit'
            initial='initial'
            variants={tooltipVariant}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
