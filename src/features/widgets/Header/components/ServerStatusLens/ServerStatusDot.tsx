import { clsx } from 'clsx'
import { motion } from 'motion/react'
import { memo } from 'react'

interface ServerStatusDotProps {
  isDarkTheme: boolean
  onClick: () => void
  statusColor: string
}

export const ServerStatusDot = memo(
  ({ statusColor, isDarkTheme, onClick }: ServerStatusDotProps) => {
    return (
      <motion.button
        aria-label='Server Status & Diagnostics'
        className={clsx(
          'group flex h-6 w-6 cursor-pointer items-center justify-center rounded-full backdrop-blur-xl transition-transform select-none',
          isDarkTheme
            ? 'border border-white/20 bg-black/45 shadow-sm ring-1 ring-white/20'
            : 'border border-white/60 bg-white/45 shadow-sm ring-1 ring-black/10'
        )}
        title='Click to view Hetzner Server Diagnostics'
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
      >
        <motion.span
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.85, 1, 0.85]
          }}
          className={clsx(
            'h-3 w-3 rounded-full transition-colors duration-300',
            statusColor
          )}
          transition={{
            duration: 2.4,
            ease: 'easeInOut',
            repeat: Infinity
          }}
        />
      </motion.button>
    )
  }
)

ServerStatusDot.displayName = 'ServerStatusDot'
