import { getOSKeySymbol } from '@shared/helpers/os'
import { motion } from 'motion/react'
import { useMemo } from 'react'

interface CommandPaletteTriggerProps {
  onClick: () => void
}

export const CommandPaletteTrigger = ({
  onClick
}: CommandPaletteTriggerProps) => {
  const osKey = useMemo(() => getOSKeySymbol(), [])

  return (
    <motion.button
      aria-label='Open Command Palette'
      className='flex cursor-pointer items-center gap-2 rounded-full border border-(--color-border) bg-(--color-bg-elevated) px-3.5 py-1.5 text-xs text-(--color-text) hover:bg-current/10'
      title={`Command Palette (${osKey.name})`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <span>🔍</span>
      <kbd className='rounded bg-current/10 px-1.5 py-0.5 font-mono text-[10px] opacity-80'>
        {osKey.label}
      </kbd>
    </motion.button>
  )
}
