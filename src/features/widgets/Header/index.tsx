import { useTheme } from '@app/hooks/useTheme'
import { sendGAEvent } from '@features/shared/analytics/ga'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { NavigationButton } from './NavigationButton'
import { ThemeToggle } from './ThemeToggle'

export const Header = () => {
  const { isDarkTheme, toggleTheme } = useTheme()
  const [scrollPosition, setScrollPosition] = useState(0)
  const checkScrollTop = () => {
    setScrollPosition(window.scrollY)
  }
  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop)
    return () => window.removeEventListener('scroll', checkScrollTop)
  }, [])
  const isMobile = window.innerWidth <= 1024
  const location = useLocation()
  const navigate = useNavigate()
  const handlePageChange = (path: string, label: string) => {
    if (!isMobile) {
      setScrollPosition(0)
    }
    navigate(path)
    sendGAEvent({
      action: 'navigation_click',
      category: 'Header',
      label
    })
  }
  const headerClass = [
    'mt-3 mb-8 flex h-fit min-h-[120px] w-full flex-col items-center rounded-3xl bg-(--color-nav)/90 md:w-fit md:rounded-full',
    !isMobile && scrollPosition > 0
      ? 'sticky top-3 z-10 transition-all duration-300'
      : 'transition-all duration-175'
  ].join(' ')
  return (
    <motion.header
      className={headerClass}
      style={{
        padding: '24px 48px',
        minHeight: 120
      }}
    >
      <nav className='flex w-full flex-col justify-center md:flex-row'>
        <NavigationButton
          isClicked={location.pathname === '/about'}
          onClick={() => handlePageChange('/about', 'About')}
        >
          About Me
        </NavigationButton>
        <NavigationButton
          isClicked={location.pathname === '/projects'}
          onClick={() => handlePageChange('/projects', 'Projects')}
        >
          Projects
        </NavigationButton>
        <NavigationButton
          isClicked={location.pathname === '/feedback'}
          onClick={() => handlePageChange('/feedback', 'Feedback')}
        >
          Feedback
        </NavigationButton>
        <ThemeToggle isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      </nav>
    </motion.header>
  )
}
