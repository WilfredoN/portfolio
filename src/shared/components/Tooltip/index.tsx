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
      className='relative inline-block group'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence mode='wait'>
        {isHovered && (
          <motion.div
            animate='animate'
            className={clsx(
              'absolute text-3xl bg-black text-white px-4 py-2 rounded-lg whitespace-nowrap z-50 flex items-center',
              'left-full top-4 -translate-y-1/2',
              'md:left-full md:ml-4',
              'max-md:right-full max-md:mr-2 max-md:left-auto max-md:ml-0',
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
