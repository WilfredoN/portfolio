import { useTheme } from '@app/hooks/useTheme'
import { getOSKeySymbol } from '@shared/helpers/os'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'

interface CommandPaletteTriggerProps {
  onClick: () => void
}

export const CommandPaletteTrigger = ({
  onClick
}: CommandPaletteTriggerProps) => {
  const { isDarkTheme } = useTheme()
  const osKey = useMemo(() => getOSKeySymbol(), [])
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      aria-label='Open Command Palette'
      className={clsx(
        'relative hidden cursor-pointer items-center justify-center gap-2 rounded-full border px-3.5 py-2 text-xs shadow-xl backdrop-blur-xl transition-all duration-200 transform-gpu sm:flex sm:gap-2.5 sm:px-4 sm:py-2.5 sm:text-sm md:px-5 md:py-3 md:text-base sm:backdrop-blur-2xl',
        isDarkTheme
          ? 'border-white/20 bg-black/45 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/35 hover:bg-black/60'
          : 'border-white/60 bg-white/45 text-zinc-900 shadow-[0_8px_32px_0_rgba(31,38,135,0.12)] hover:border-white/80 hover:bg-white/65'
      )}
      title={`Command Palette (${osKey.name})`}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className='text-sm select-none sm:text-base md:text-lg'>🔍</span>

      <motion.div
        animate={{ width: isHovered ? 'auto' : 'auto', opacity: 1 }}
        className='flex items-center gap-1.5 overflow-hidden sm:gap-2'
        initial={false}
      >
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
      </motion.div>
    </motion.button>
  )
}
