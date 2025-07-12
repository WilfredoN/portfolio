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
        'mb-8 mt-3 flex h-fit min-h-[120px] w-full flex-col items-center rounded-3xl px-12 py-6 md:w-fit md:rounded-full',
        {
          'sticky top-3 z-10 transition-all duration-300':
            !isMobile && scrollPosition > 0,
          'duration-175 transition-all': isMobile || scrollPosition === 0
        }
      )}
    >
      <nav className='flex w-full flex-col justify-center md:flex-row'>
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
