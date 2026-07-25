import clsx from 'clsx'
import { motion } from 'motion/react'

interface ThemeToggleProps {
  isDarkTheme: boolean
  toggleTheme: () => void
}

export const ThemeToggle = ({
  toggleTheme,
  isDarkTheme
}: ThemeToggleProps) => {
  return (
    <motion.button
      aria-label='Toggle Theme'
      className={clsx(
        'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-sm transition-colors',
        isDarkTheme
          ? 'border-white/15 bg-white/10 text-white hover:bg-white/20'
          : 'border-black/15 bg-black/5 text-zinc-800 hover:bg-black/10'
      )}
      title={`Switch to ${isDarkTheme ? 'Light' : 'Dark'} Theme`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
    >
      <span>{isDarkTheme ? '🌙' : '☀️'}</span>
    </motion.button>
  )
}
