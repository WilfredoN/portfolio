import { useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import './App.css'
import { CookieConsent } from './components/CookieConsent'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ScrollButton } from './components/input/ScrollButton'
import { ThemeContext } from './components/ThemeContext'
import { Main } from './pages/Main'
import { PageType } from './types/PageType'

export const App = () => {
	const VITE_TRACKING_ID = import.meta.env.VITE_TRACKING_ID
	const [currentPage, setCurrentPage] = useState<PageType>(PageType.About)
	const [theme, setTheme] = useState('dark')
	const [consent, setConsent] = useState(
		localStorage.getItem('cookieConsent') === 'true'
	)

	useEffect(() => {
		if (consent) {
			ReactGA.initialize(VITE_TRACKING_ID)
			ReactGA.send({
				hitType: 'pageview',
				page: window.location.pathname + window.location.search
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage, consent])

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
				<CookieConsent onConsent={() => setConsent(true)} />
				<ScrollButton />
			</main>
		</ThemeContext.Provider>
	)
}
