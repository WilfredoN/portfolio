import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

export const ScrollButton = () => {
	const [isAtTop, setIsAtTop] = useState(true)

	const toggleVisibility = () => {
		setIsAtTop(window.scrollY <= 100)
	}

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth'
		})
	}

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility)
		return () => window.removeEventListener('scroll', toggleVisibility)
	}, [])

	if (window.scrollY === 0) {
		return null
	}

	return (
		<div className="fixed bottom-4 right-4">
			<motion.button
				onClick={isAtTop ? scrollToBottom : scrollToTop}
				className="scroll-button p-4 rounded-full shadow-lg transition-colors duration-300"
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 100, opacity: 0 }}
				transition={{ type: 'spring', stiffness: 150, damping: 30 }}
			>
				<AnimatePresence mode="wait">
					{isAtTop ? (
						<motion.div
							key="down"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.15 }}
						>
							<FaArrowDown size="2rem" />
						</motion.div>
					) : (
						<motion.div
							key="up"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.15 }}
						>
							<FaArrowUp size="2rem" />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>
		</div>
	)
}
