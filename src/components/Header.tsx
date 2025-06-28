import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { PageType } from '../types/PageType'
import { CustomNavLink } from './CustomNavLink'
import { ThemeToggle } from './input/ThemeToggle'

interface HeaderProps {
	currentPage: PageType
	onPageChange: (page: PageType) => void
	toggleTheme: () => void
	isDarkTheme: boolean
}

export const Header = ({
	currentPage,
	onPageChange,
	toggleTheme,
	isDarkTheme
}: HeaderProps) => {
	const [scrollPosition, setScrollPosition] = useState(0)
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
	const handlePageChange = (page: PageType) => {
		if (!isMobile) {
			setScrollPosition(0)
		}
		onPageChange(page)
	}

	return (
		<motion.header
			className={`flex flex-col h-fit mt-3 w-full md:w-fit px-12 py-6 items-center mb-8 rounded-3xl md:rounded-full ${
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
					onClick={() => handlePageChange(PageType.About)}
					isClicked={currentPage === PageType.About}
				>
					About Me
				</CustomNavLink>
				<CustomNavLink
					onClick={() => handlePageChange(PageType.Projects)}
					isClicked={currentPage === PageType.Projects}
				>
					Projects
				</CustomNavLink>
				<CustomNavLink
					onClick={() => handlePageChange(PageType.Feedback)}
					isClicked={currentPage === PageType.Feedback}
				>
					<div className="flex items-center space-x-2">
						<span>Feedback</span>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</div>
				</CustomNavLink>
				<ThemeToggle
					toggleTheme={toggleTheme}
					isDarkTheme={isDarkTheme}
				/>
			</nav>
		</motion.header>
	)
}
