import { usePage } from '@app/hooks/usePage'
import { useTheme } from '@app/hooks/useTheme'
import { PageType } from '@features/types'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { NavigationButton } from './NavigationButton'
import { ThemeToggle } from './ThemeToggle'
import clsx from 'clsx'

export const Header = () => {
  const { currentPage, setCurrentPage } = usePage()
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

  const handlePageChange = (page: PageType) => {
    if (!isMobile) {
      setScrollPosition(0)
    }
    setCurrentPage(page)
  }

  return (
    <motion.header
      className={clsx(
        'flex flex-col h-fit mt-3 w-full md:w-fit min-h-[120px] px-12 py-6 items-center mb-8 rounded-3xl md:rounded-full',
        {
          'sticky top-3 z-10 transition-all duration-300':
            !isMobile && scrollPosition > 0,
          'transition-all duration-175': isMobile || scrollPosition === 0
        }
      )}
    >
      <nav className='w-full flex md:flex-row flex-col justify-center'>
        <NavigationButton
          isClicked={currentPage === PageType.About}
          onClick={() => handlePageChange(PageType.About)}
        >
          About Me
        </NavigationButton>
        <NavigationButton
          isClicked={currentPage === PageType.Projects}
          onClick={() => handlePageChange(PageType.Projects)}
        >
          Projects
        </NavigationButton>
        <NavigationButton
          isClicked={currentPage === PageType.Feedback}
          onClick={() => handlePageChange(PageType.Feedback)}
        >
          Feedback
        </NavigationButton>
        <ThemeToggle isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      </nav>
    </motion.header>
  )
}
