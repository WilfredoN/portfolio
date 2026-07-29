import { useTheme } from '@app/hooks/useTheme'
import { getOSKeySymbol } from '@shared/helpers/os'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { memo, useMemo } from 'react'

interface CommandPaletteTriggerProps {
  isCompact?: boolean
  onClick: () => void
}

const FAST_SPRING = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 28,
  mass: 0.6
}

export const CommandPaletteTrigger = memo(
  ({ onClick, isCompact = false }: CommandPaletteTriggerProps) => {
    const { isDarkTheme } = useTheme()
    const osKey = useMemo(() => getOSKeySymbol(), [])

    if (isCompact) {
      return (
        <motion.button
          aria-label='Open Command Palette'
          className={clsx(
            'flex h-7 w-7 transform-gpu cursor-pointer items-center justify-center rounded-full border text-xs shadow-md backdrop-blur-xl will-change-[backdrop-filter,transform] select-none sm:h-8 sm:w-8 sm:text-sm',
            isDarkTheme
              ? 'border-white/20 bg-black/45 text-white shadow-[0_4px_16px_0_rgba(0,0,0,0.37)] hover:border-white/35 hover:bg-black/60'
              : 'border-white/60 bg-white/45 text-zinc-900 shadow-[0_4px_16px_0_rgba(31,38,135,0.12)] hover:border-white/80 hover:bg-white/65'
          )}
          title={`Command Palette (${osKey.name})`}
          transition={FAST_SPRING}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={onClick}
        >
          <span className='text-xs sm:text-sm'>🔍</span>
        </motion.button>
      )
    }

    return (
      <motion.button
        aria-label='Open Command Palette'
        className={clsx(
          'relative hidden transform-gpu cursor-pointer items-center justify-center gap-2 rounded-full border px-3.5 py-2 text-xs shadow-xl backdrop-blur-xl will-change-[backdrop-filter,transform] sm:flex sm:gap-2.5 sm:px-4 sm:py-2.5 sm:text-sm sm:backdrop-blur-2xl md:px-5 md:py-3 md:text-base',
          isDarkTheme
            ? 'border-white/20 bg-black/45 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/35 hover:bg-black/60'
            : 'border-white/60 bg-white/45 text-zinc-900 shadow-[0_8px_32px_0_rgba(31,38,135,0.12)] hover:border-white/80 hover:bg-white/65'
        )}
        title={`Command Palette (${osKey.name})`}
        transition={FAST_SPRING}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        <span className='text-sm select-none sm:text-base md:text-lg'>🔍</span>

        <div className='flex items-center gap-1.5 overflow-hidden sm:gap-2'>
          <span
            className={clsx(
              'hidden font-mono text-xs font-bold sm:inline md:text-sm',
              isDarkTheme ? 'text-zinc-300' : 'text-zinc-700'
            )}
          >
            Search
          </span>
          <kbd
            className={clsx(
              'rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-bold shadow-inner sm:px-2 sm:py-0.5 sm:text-xs',
              isDarkTheme
                ? 'border-white/20 bg-white/10 text-white'
                : 'border-black/15 bg-black/5 text-zinc-800'
            )}
          >
            {osKey.label}
          </kbd>
        </div>
      </motion.button>
    )
  }
)

CommandPaletteTrigger.displayName = 'CommandPaletteTrigger'
