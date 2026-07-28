import { useTheme } from '@app/hooks/useTheme'
import { sendGAEvent } from '@features/shared/analytics/ga'
import { useOnClickOutside } from '@shared/hooks/useOnClickOutside'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { CommandPaletteTrigger } from './CommandPaletteTrigger'
import { ConstructionButton } from './ConstructionButton'
import { useHeaderScroll } from './hooks/useHeaderScroll'
import { useAllNavStatuses } from './hooks/useNavTabStatus'
import { NAV_ITEMS, NavStatus } from './navConfig'
import { NavigationButton } from './NavigationButton'
import { ServerStatusLens } from './ServerStatusLens'
import { ThemeToggle } from './ThemeToggle'

const FAST_SPRING = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 28,
  mass: 0.5
}

export const DynamicIslandHeader = () => {
  const { isDarkTheme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const isMobile = window.innerWidth <= 1024

  const { isScrolled } = useHeaderScroll({ thresholdDown: 60, thresholdUp: 20 })
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)

  const islandRef = useRef<HTMLDivElement>(null)

  // Collapse mobile expanded state when user taps outside the header
  useOnClickOutside(islandRef, () => {
    if (isMobileExpanded) {
      setIsMobileExpanded(false)
    }
  })

  const navStatuses = useAllNavStatuses(NAV_ITEMS.map((item) => item.path))

  const isMinimized =
    isScrolled && !isHovered && !isFocused && !isMobileExpanded

  const handlePageChange = (path: string, label: string) => {
    setIsMobileExpanded(false)
    if (!isMobile) {
      const rootEl = document.getElementById('root')
      if (rootEl) {
        rootEl.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
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
      className='sticky top-2 z-50 my-1 flex h-14 w-full flex-col items-center justify-center px-2 select-none sm:top-3 sm:my-2 sm:h-16 sm:px-4'
      initial={{ opacity: 0, y: -20 }}
      transition={FAST_SPRING}
    >
      <div
        ref={islandRef}
        className='flex max-w-full flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:gap-4.5'
      >
        <motion.div
          layout
          className={clsx(
            'flex max-w-full transform-gpu flex-wrap items-center justify-center border shadow-2xl backdrop-blur-xl sm:backdrop-blur-2xl',
            isMinimized
              ? 'gap-2 rounded-full px-3 py-1.5 sm:gap-2.5 sm:px-4 sm:py-2 md:gap-3'
              : 'gap-2 rounded-[28px] px-3.5 py-2 sm:gap-3 sm:rounded-full sm:px-5 sm:py-2.5 md:gap-4 md:px-8 md:py-3.5',
            isDarkTheme
              ? 'border-white/20 bg-black/45 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
              : 'border-white/60 bg-white/45 text-zinc-900 shadow-[0_8px_32px_0_rgba(31,38,135,0.12)]'
          )}
          transition={FAST_SPRING}
          whileTap={isMinimized ? { scale: 0.98 } : undefined}
          onBlurCapture={() => setIsFocused(false)}
          onFocusCapture={() => setIsFocused(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ServerStatusLens />

          <nav
            className='flex items-center gap-1 sm:gap-1.5 md:gap-2'
            onClick={() => {
              if (isMinimized && isMobile) {
                setIsMobileExpanded(true)
              }
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isClicked = location.pathname === item.path

              // When minimized, instantly hide non-active buttons (0ms delay, no ghost text)
              if (isMinimized && !isClicked) {
                return null
              }

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
                  isClicked={isClicked}
                  isProcessing={isProcessing}
                  onClick={() => handlePageChange(item.path, item.label)}
                >
                  {item.label}
                </NavigationButton>
              )
            })}
          </nav>

          {isMinimized && (
            <>
              <div
                className={clsx(
                  'h-3.5 w-px shrink-0',
                  isDarkTheme ? 'bg-white/20' : 'bg-black/15'
                )}
              />
              <CommandPaletteTrigger
                isCompact
                onClick={handleOpenCommandPalette}
              />
            </>
          )}

          {!isMinimized && (
            <div
              className={clsx(
                'hidden h-4 w-px shrink-0 sm:block sm:h-5 md:h-6',
                isDarkTheme ? 'bg-white/20' : 'bg-black/15'
              )}
            />
          )}

          <ThemeToggle isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
        </motion.div>

        {/* Persistent GPU layer for external search trigger to eliminate backdrop-blur delay */}
        <motion.div
          animate={{
            opacity: isMinimized ? 0 : 1,
            scale: isMinimized ? 0.8 : 1,
            x: isMinimized ? -10 : 0
          }}
          className={clsx(
            'transform-gpu [will-change:opacity,transform]',
            isMinimized ? 'pointer-events-none' : 'pointer-events-auto'
          )}
          initial={false}
          transition={FAST_SPRING}
        >
          <CommandPaletteTrigger onClick={handleOpenCommandPalette} />
        </motion.div>
      </div>
    </motion.header>
  )
}
