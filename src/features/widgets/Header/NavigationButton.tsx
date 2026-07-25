import clsx from 'clsx'
import { motion } from 'motion/react'

interface NavigationLinkProps {
  children: React.ReactNode
  isClicked: boolean
  isProcessing?: boolean
  onClick: () => void
}

export const NavigationButton = ({
  onClick,
  children,
  isClicked,
  isProcessing = false
}: NavigationLinkProps) => (
  <button
    aria-current={isClicked ? 'page' : undefined}
    className={clsx(
      'relative flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 select-none sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-2.5 md:text-base focus:outline-none',
      isProcessing
        ? 'pointer-events-none cursor-default opacity-50'
        : 'cursor-pointer',
      isClicked
        ? 'text-white'
        : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/10'
    )}
    disabled={isProcessing}
    onClick={isProcessing ? undefined : onClick}
  >
    {isClicked && (
      <motion.div
        className='absolute inset-0 rounded-full bg-white/20 shadow-inner'
        layoutId='island-active-pill'
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
    )}
    <span className='relative z-10 tracking-wide'>{children}</span>
  </button>
)
