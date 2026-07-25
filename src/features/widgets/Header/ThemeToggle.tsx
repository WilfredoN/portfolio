import { motion } from 'motion/react'

interface ThemeToggleProps {
  isDarkTheme: boolean
  toggleTheme: () => void
}

export const ThemeToggle = ({ toggleTheme, isDarkTheme }: ThemeToggleProps) => {
  return (
    <motion.button
      aria-label='Toggle Theme'
      className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm text-white transition-colors hover:bg-white/20'
      title={`Switch to ${isDarkTheme ? 'Light' : 'Dark'} Theme`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
    >
      <span>{isDarkTheme ? '🌙' : '☀️'}</span>
    </motion.button>
  )
}
