import { useState } from 'react'
import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import { ThemeContext } from './Components/ThemeContext'
import About from './Pages/About'
import Projects from './Pages/Projects'
import CookieConsest from './Components/CookieConsent'
function App() {
	const [currentPage, setCurrentPage] = useState<'about' | 'projects'>('about')
	const [theme, setTheme] = useState('dark')
	const handlePageChange = (page: 'about' | 'projects') => {
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
				{currentPage === 'about' ? <About /> : <Projects />}
				<Footer />
				<CookieConsest />
			</main>
		</ThemeContext.Provider>
	)
}

export default App
