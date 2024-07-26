import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import CustomNavLink from './CustomNavLink'
import ThemeToggle from './Input/ThemeToggle'
import { ThemeContext } from './ThemeContext'

const Header = ({
	currentPage,
	onPageChange
}: {
	currentPage: 'about' | 'projects'
	onPageChange: (page: 'about' | 'projects') => void
}) => {
	const [scrollPosition, setScrollPosition] = useState(0)
	const { theme } = useContext(ThemeContext)
	const checkScrollTop = () => {
		setScrollPosition(window.scrollY)
	}

	useEffect(() => {
		window.addEventListener('scroll', checkScrollTop)
		return () => window.removeEventListener('scroll', checkScrollTop)
	}, [])

	const isMobile = window.innerWidth <= 1024

	const totalScrollHeight = isMobile
		? 0
		: document.documentElement.scrollHeight - window.innerHeight
	const scaleFactor = isMobile
		? 1
		: Math.max(0.9, 1 - scrollPosition / totalScrollHeight / 2) || 1
	const handlePageChange = (page: 'about' | 'projects') => {
		if (!isMobile) {
			setScrollPosition(0)
		}
		onPageChange(page)
	}

	return (
		<motion.header
			className={`${theme} flex flex-col h-fit mt-3 w-full md:w-fit px-12 py-6 items-center mb-8 rounded-3xl md:rounded-full ${
				!isMobile && scrollPosition > 0
					? 'sticky top-3 z-10 transition-all duration-300 '
					: 'transition-all duration-175 '
			}`}
			style={{
				transform: `scale(${scaleFactor})`,
				boxShadow:
					!isMobile && scrollPosition > 0
						? '0 0 20px rgba(0, 0, 0, 0.1)'
						: 'none',
				backdropFilter: !isMobile && scrollPosition > 0 ? 'blur(10px)' : 'none',
				opacity: !isMobile && scrollPosition > 0 ? 0.95 : 1
			}}
		>
			<nav className="w-full flex md:flex-row flex-col justify-center">
				<CustomNavLink
					onClick={() => handlePageChange('about')}
					isClicked={currentPage === 'about'}
				>
					About Me
				</CustomNavLink>
				<CustomNavLink
					onClick={() => handlePageChange('projects')}
					isClicked={currentPage === 'projects'}
				>
					Projects
				</CustomNavLink>
				<ThemeToggle />
			</nav>
		</motion.header>
	)
}

export default Header
