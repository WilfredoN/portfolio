import { useEffect, useState } from 'react'

import './App.css'
import BinaryBackground from './components/BinaryBackground'
import { CookieConsent } from './components/CookieConsent'
import { Header } from './components/Header'
import { ScrollButton } from './components/input/button/ScrollButton'
import { Main } from './pages/Main'
import { PageType } from './types/PageType'
import { applyTheme, getInitialTheme, saveTheme } from './utils/theme'

export const App = () => {
  const [currentPage, setCurrentPage] = useState<PageType>(PageType.About)
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialTheme())

  useEffect(() => {
    applyTheme(isDarkTheme)
  }, [isDarkTheme])

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page)
  }

  const toggleTheme = () => {
    const newTheme = !isDarkTheme
    setIsDarkTheme(newTheme)
    saveTheme(newTheme)
  }

  return (
    <>
      <BinaryBackground />
      <main className='flex flex-col justify-start items-center py-2 min-h-[100vh]'>
        <Header
          currentPage={currentPage}
          onPageChange={handlePageChange}
          toggleTheme={toggleTheme}
          isDarkTheme={isDarkTheme}
        />
        <Main currentPage={currentPage} />
        <CookieConsent />
        <ScrollButton />
      </main>
    </>
  )
}

export default App
