import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { FaFileDownload } from 'react-icons/fa'

interface DownloadButtonProps {
	pdfUrl: string
}

export const DownloadButton = ({ pdfUrl }: DownloadButtonProps) => {
	const [isHovered, setIsHovered] = useState(false)
	const buttonRef = useRef<HTMLDivElement>(null)
	const [tooltipPosition, setTooltipPosition] = useState<'right' | 'bottom'>(
		'right'
	)

	const handleDownload = () => {
		window.open(pdfUrl, '_blank')
	}

	useEffect(() => {
		if (isHovered && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect()
			const availableSpaceRight = window.innerWidth - rect.right - 20
			const tooltipWidth = 215

			setTooltipPosition(
				availableSpaceRight < tooltipWidth ? 'bottom' : 'right'
			)
		}
	}, [isHovered])

	const rightVariants = {
		initial: { opacity: 0, x: -20, scale: 0.8 },
		animate: {
			opacity: 1,
			x: 10,
			scale: 1,
			rotate: Math.random() * 10 + 1,
			transition: { type: 'spring', stiffness: 300, damping: 25 }
		},
		exit: {
			opacity: 0,
			x: -10,
			scale: 0.9,
			transition: { duration: 0.2 }
		}
	}

	const bottomVariants = {
		initial: { opacity: 0, y: -20, scale: 0.8 },
		animate: {
			opacity: 1,
			y: 10,
			scale: 1,
			transition: { type: 'spring', stiffness: 300, damping: 25 }
		},
		exit: {
			opacity: 0,
			y: -10,
			scale: 0.9,
			transition: { duration: 0.2 }
		}
	}

	return (
		<div
			className="absolute bottom-4 right-4 z-10"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			ref={buttonRef}
		>
			<motion.div
				onClick={handleDownload}
				className="relative p-3 outline cursor-pointer rounded-3xl flex items-center justify-center outline-white"
				whileHover={{ scale: 1.2 }}
				transition={{ type: 'spring', stiffness: 400, damping: 17 }}
				title="Download CV"
			>
				<motion.div
					whileHover={{ color: '#ffffff' }}
					transition={{ duration: 0.2 }}
				>
					<FaFileDownload size={48} />
				</motion.div>

				<AnimatePresence>
					{isHovered && (
						<motion.div
							className={`absolute text-2xl bg-black text-white px-4 py-2 rounded-lg whitespace-nowrap ${
								tooltipPosition === 'right'
									? 'left-[calc(100%-10px)] ml-2'
									: 'top-full mt-2 mr-12'
							}`}
							variants={
								tooltipPosition === 'right' ? rightVariants : bottomVariants
							}
							initial="initial"
							animate="animate"
							exit="exit"
						>
							Check my CV!
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	)
}
