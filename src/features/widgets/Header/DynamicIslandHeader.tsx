import { useTheme } from '@app/hooks/useTheme'
import { sendGAEvent } from '@features/shared/analytics/ga'
import { motion } from 'motion/react'
import { useLocation, useNavigate } from 'react-router-dom'

import { CommandPaletteTrigger } from './CommandPaletteTrigger'
import { ConstructionButton } from './ConstructionButton'
import { useAllNavStatuses } from './hooks/useNavTabStatus'
import { NAV_ITEMS, NavStatus } from './navConfig'
import { NavigationButton } from './NavigationButton'
import { ServerStatusLens } from './ServerStatusLens'
import { ThemeToggle } from './ThemeToggle'

export const DynamicIslandHeader = () => {
  const { isDarkTheme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const isMobile = window.innerWidth <= 1024

  const navStatuses = useAllNavStatuses(NAV_ITEMS.map((item) => item.path))

  const handlePageChange = (path: string, label: string) => {
    if (!isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    navigate(path)
    sendGAEvent({ action: 'navigation_click', category: 'Header', label })
  }

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true })
    )
  }

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className='sticky top-3 z-50 my-3 flex w-full flex-col items-center justify-center px-2 select-none sm:px-4 md:top-5 md:my-4'
      initial={{ opacity: 0, y: -20 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      <div className='flex max-w-full flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:gap-4.5'>
        <motion.div
          layout
          className='flex max-w-full flex-wrap items-center justify-center gap-2 rounded-[28px] border border-white/15 bg-black/90 px-3.5 py-2 shadow-md backdrop-blur-xl sm:gap-3 sm:rounded-full sm:px-5 sm:py-2.5 md:gap-4 md:px-8 md:py-3.5'
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          <ServerStatusLens />

          <nav className='flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 md:gap-2'>
            {NAV_ITEMS.map((item) => {
              const status = navStatuses[item.path] ?? NavStatus.READY

              if (status === NavStatus.IN_CONSTRUCTION) {
                return (
                  <ConstructionButton key={item.path}>
                    {item.label}
                  </ConstructionButton>
                )
              }

              const isProcessing = status === NavStatus.PROCESSING

              return (
                <NavigationButton
                  key={item.path}
                  isClicked={location.pathname === item.path}
                  isProcessing={isProcessing}
                  onClick={() => handlePageChange(item.path, item.label)}
                >
                  {item.label}
                </NavigationButton>
              )
            })}
          </nav>

          <div className='hidden h-4 w-px bg-white/15 sm:block sm:h-5 md:h-6' />

          <ThemeToggle isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
        </motion.div>

        <CommandPaletteTrigger onClick={handleOpenCommandPalette} />
      </div>
    </motion.header>
  )
}
