import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useCallback } from 'react'

import { ConstructionToastList } from './ConstructionToastList'
import { useConstructionToast } from './useConstructionToast'

interface ConstructionButtonProps {
  children: React.ReactNode
}

const RESTING_SAG = 6
const IMPULSE_SAG = 28

export const ConstructionButton = ({
  children
}: ConstructionButtonProps) => {
  const { toasts, addToast } = useConstructionToast(
    'This page is in construction! Wait few centuries!'
  )

  const controlY = useMotionValue(RESTING_SAG)
  const springY = useSpring(controlY, { damping: 7, mass: 0.35, stiffness: 160 })

  const pathD = useTransform(
    springY,
    (cy) => `M 0 34 Q 75 ${20 + cy} 150 6`
  )

  const interact = useCallback(() => {
    addToast()
    controlY.set(IMPULSE_SAG)
    setTimeout(() => controlY.set(RESTING_SAG), 55)
  }, [addToast, controlY])

  return (
    <>
      <div
        className='relative mb-4 cursor-pointer md:mr-8 md:mb-0'
        role='button'
        tabIndex={0}
        onClick={interact}
        onKeyDown={(e) => e.key === 'Enter' && interact()}
        onMouseEnter={interact}
      >
        <span
          aria-disabled='true'
          className='pointer-events-none block rounded-full p-4 opacity-50 select-none'
          style={{ fontSize: '2.5rem' }}
        >
          {children}
        </span>

        <svg
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 h-full w-full overflow-visible'
          preserveAspectRatio='none'
          viewBox='0 0 150 40'
        >
          <defs>
            <filter id='tape-glow' height='500%' width='140%' x='-20%' y='-200%'>
              <feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='2.5' />
              <feMerge>
                <feMergeNode in='blur' />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>

            <linearGradient gradientUnits='userSpaceOnUse' id='shimmer' x1='0' x2='150' y1='0' y2='0'>
              <motion.stop
                animate={{ stopColor: ['rgba(250,204,21,0.6)', 'rgba(255,240,120,1)', 'rgba(250,204,21,0.6)'] }}
                offset='0%'
                transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
              />
              <motion.stop
                animate={{ stopColor: ['rgba(255,240,120,1)', 'rgba(250,204,21,0.6)', 'rgba(255,240,120,1)'] }}
                offset='50%'
                transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
              />
              <motion.stop
                animate={{ stopColor: ['rgba(250,204,21,0.6)', 'rgba(255,240,120,1)', 'rgba(250,204,21,0.6)'] }}
                offset='100%'
                transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
              />
            </linearGradient>
          </defs>

          <motion.path
            d={pathD}
            fill='none'
            filter='url(#tape-glow)'
            stroke='url(#shimmer)'
            strokeLinecap='round'
            strokeWidth='3'
          />
        </svg>
      </div>

      <ConstructionToastList toasts={toasts} />
    </>
  )
}
