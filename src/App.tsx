import { useState } from 'react'
import './App.css'
import { BinaryBackground } from './components/BinaryBackground'
import { CookieConsent } from './components/CookieConsent'
import { Header } from './components/Header'
import { ScrollButton } from './components/input/ScrollButton'
import { ThemeContext } from './components/ThemeContext'
import { Main } from './pages/Main'
import { PageType } from './types/PageType'

export const App = () => {
	const [currentPage, setCurrentPage] = useState<PageType>(PageType.About)
	const [theme, setTheme] = useState('dark')

	const handlePageChange = (page: PageType) => {
		setCurrentPage(page)
	}

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<BinaryBackground />
			<main
				className={`${theme} flex flex-col justify-start items-center py-2 min-h-[100vh]`}
			>
				<Header
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
				<Main currentPage={currentPage} />
				<CookieConsent />
				<ScrollButton />
			</main>
		</ThemeContext.Provider>
	)
}

export default App
