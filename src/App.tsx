import { useState } from 'react'
import './App.css'
import CookieConsest from './components/CookieConsent'
import Footer from './components/Footer'
import Header from './components/Header'
import { ThemeContext } from './components/ThemeContext'
import { Main } from './pages/Main'
import { PageType } from './types/PageType'
function App() {
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
			<main
				className={`${theme} flex flex-col justify-start items-center py-2 
        h-full`}
			>
				<Header
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
				<Main currentPage={currentPage} />
				<Footer />
				<CookieConsest />
			</main>
		</ThemeContext.Provider>
	)
}

export default App
