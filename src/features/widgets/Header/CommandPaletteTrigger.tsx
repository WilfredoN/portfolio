import { getOSKeySymbol } from '@shared/helpers/os'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'

interface CommandPaletteTriggerProps {
  onClick: () => void
}

export const CommandPaletteTrigger = ({
  onClick
}: CommandPaletteTriggerProps) => {
  const osKey = useMemo(() => getOSKeySymbol(), [])
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      layout
      aria-label='Open Command Palette'
      className='relative flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/15 bg-black/90 px-3.5 py-2 text-xs text-white shadow-md backdrop-blur-md transition-colors hover:border-white/30 hover:bg-black sm:gap-2.5 sm:px-4 sm:py-2.5 sm:text-sm md:px-5 md:py-3 md:text-base'
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
        <span className='hidden font-mono text-xs font-bold text-zinc-300 sm:inline md:text-sm'>
          Search
        </span>
        <kbd className='rounded-md border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white shadow-inner sm:px-2 sm:py-0.5 sm:text-xs'>
          {osKey.label}
        </kbd>
      </motion.div>
    </motion.button>
  )
}
