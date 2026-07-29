import { useTheme } from '@app/hooks/useTheme'
import { sendGAEvent } from '@features/shared/analytics/ga'
import { useOnClickOutside } from '@shared/hooks/useOnClickOutside'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import type { HeaderStage } from './hooks/useHeaderScroll'

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

  const { stage } = useHeaderScroll()

  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)

  const islandRef = useRef<HTMLDivElement>(null)

  const handleCloseMobile = useCallback(() => {
    setIsMobileExpanded(false)
  }, [])

  useOnClickOutside(islandRef, handleCloseMobile)

  const navItemPaths = useMemo(() => NAV_ITEMS.map((item) => item.path), [])
  const navStatuses = useAllNavStatuses(navItemPaths)

  const effectiveStage: HeaderStage =
    (!isMobile && isHovered) || isFocused || isMobileExpanded
      ? 'expanded'
      : stage

  const isHidden = effectiveStage === 'hidden'
  const isMicro = effectiveStage === 'micro' || effectiveStage === 'hidden'
  const isCompact = effectiveStage === 'compact'
  const isExpanded = effectiveStage === 'expanded'

  const handlePageChange = useCallback(
    (path: string, label: string) => {
      setIsMobileExpanded(false)
      setIsFocused(false)
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
      const rootEl = document.getElementById('root')
      if (rootEl) {
        rootEl.scrollTo({ top: 0, behavior: 'instant' })
      }
      window.scrollTo({ top: 0, behavior: 'instant' })

      if (location.pathname !== path) {
        navigate(path)
      }
      sendGAEvent({ action: 'navigation_click', category: 'Header', label })
    },
    [location.pathname, navigate]
  )

  useEffect(() => {
    const handleScroll = () => {
      if (
        isFocused &&
        document.activeElement instanceof HTMLElement &&
        islandRef.current?.contains(document.activeElement)
      ) {
        document.activeElement.blur()
        setIsFocused(false)
      }
    }
    const rootEl = document.getElementById('root')
    rootEl?.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      rootEl?.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isFocused])

  const handleOpenCommandPalette = useCallback(() => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: true })
    )
  }, [])

  const handleIslandClick = useCallback(() => {
    if ((isCompact || isMicro) && isMobile) {
      setIsMobileExpanded(true)
    }
  }, [isCompact, isMicro, isMobile])

  return (
    <motion.header
      animate={{
        opacity: isHidden ? 0 : 1,
        y: isHidden ? -80 : 0
      }}
      className='sticky top-2 z-9000 my-1 flex h-14 w-full flex-col items-center justify-center px-2 select-none sm:top-3 sm:my-2 sm:h-16 sm:px-4'
      initial={{ opacity: 0, y: -20 }}
      transition={FAST_SPRING}
    >
      <div
        ref={islandRef}
        className='flex max-w-full flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:gap-4.5'
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsFocused(false)
          }
        }}
        onFocusCapture={() => setIsFocused(true)}
      >
        <motion.div
          layout
          className={clsx(
            'flex max-w-full transform-gpu flex-wrap items-center justify-center border shadow-2xl backdrop-blur-xl sm:backdrop-blur-2xl',
            isMicro
              ? 'cursor-pointer gap-0 rounded-full px-2.5 py-1.5 shadow-lg'
              : isCompact
                ? 'cursor-pointer gap-2 rounded-full px-3 py-1.5 sm:gap-2.5 sm:px-4 sm:py-2 md:gap-3'
                : 'gap-2 rounded-[28px] px-3.5 py-2 sm:gap-3 sm:rounded-full sm:px-5 sm:py-2.5 md:gap-4 md:px-8 md:py-3.5',
            isDarkTheme
              ? 'border-white/20 bg-black/45 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
              : 'border-white/60 bg-white/45 text-zinc-900 shadow-[0_8px_32px_0_rgba(31,38,135,0.12)]'
          )}
          transition={FAST_SPRING}
          whileTap={{ scale: 0.96 }}
          onClick={handleIslandClick}
          onMouseEnter={() => {
            if (!isMobile) {
              setIsHovered(true)
            }
          }}
          onMouseLeave={() => {
            if (!isMobile) {
              setIsHovered(false)
            }
          }}
        >
          <ServerStatusLens />

          {!isMicro && (
            <nav className='flex items-center gap-1 sm:gap-1.5 md:gap-2'>
              {NAV_ITEMS.map((item) => {
                const isClicked = location.pathname === item.path

                if (isCompact && !isClicked) {
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
          )}

          {isCompact && (
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

          {isExpanded && (
            <div
              className={clsx(
                'hidden h-4 w-px shrink-0 sm:block sm:h-5 md:h-6',
                isDarkTheme ? 'bg-white/20' : 'bg-black/15'
              )}
            />
          )}

          {!isMicro && (
            <ThemeToggle isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
          )}
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              layout
              animate={{ opacity: 1, scale: 1, x: 0, width: 'auto' }}
              className='-m-1.5 transform-gpu overflow-hidden p-1.5 will-change-[opacity,transform,width]'
              exit={{
                opacity: 0,
                scale: 0.8,
                x: -10,
                width: 0,
                transition: { duration: 0.1 }
              }}
              initial={{ opacity: 0, scale: 0.8, x: -10, width: 0 }}
              transition={FAST_SPRING}
            >
              <CommandPaletteTrigger onClick={handleOpenCommandPalette} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
