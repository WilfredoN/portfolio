import { useTheme } from '@app/hooks/useTheme'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { memo } from 'react'

interface NavigationLinkProps {
  children: React.ReactNode
  isClicked: boolean
  isProcessing?: boolean
  onClick: () => void
}

export const NavigationButton = memo(
  ({
    onClick,
    children,
    isClicked,
    isProcessing = false
  }: NavigationLinkProps) => {
    const { isDarkTheme } = useTheme()

    return (
      <button
        aria-current={isClicked ? 'page' : undefined}
        className={clsx(
          'relative flex shrink-0 items-center justify-center rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none sm:px-4 sm:py-2 sm:text-sm md:px-5 md:py-2.5 md:text-base',
          isProcessing
            ? 'pointer-events-none cursor-default opacity-50'
            : 'cursor-pointer',
          isClicked
            ? isDarkTheme
              ? 'text-white'
              : 'font-extrabold text-zinc-950'
            : isDarkTheme
              ? 'text-zinc-400 hover:bg-white/10 hover:text-zinc-100'
              : 'text-zinc-600 hover:bg-black/5 hover:text-zinc-900'
        )}
        disabled={isProcessing}
        onClick={isProcessing ? undefined : onClick}
      >
        {isClicked && (
          <motion.div
            className={clsx(
              'absolute inset-0 rounded-full shadow-sm',
              isDarkTheme ? 'bg-white/20' : 'bg-black/10'
            )}
            layoutId='island-active-pill'
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
        <span className='relative z-10 shrink-0 tracking-wide whitespace-nowrap'>
          {children}
        </span>
      </button>
    )
  }
)

NavigationButton.displayName = 'NavigationButton'
