import { useState } from 'react'
import { FaFileDownload } from 'react-icons/fa'

interface DownloadButtonProps {
	pdfUrl: string
}

export const DownloadButton = ({ pdfUrl }: DownloadButtonProps) => {
	const [isHovered, setIsHovered] = useState(false)

	const handleDownload = () => {
		window.open(pdfUrl, '_blank')
	}

	return (
		<div
			className="absolute bottom-4 right-4 z-10"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div
				onClick={handleDownload}
				className="relative p-3 outline cursor-pointer rounded-full flex items-center justify-center outline-white transition-all duration-300"
				style={{
					transform: isHovered ? 'scale(1.2)' : 'scale(1)'
				}}
				title="Download CV"
			>
				<FaFileDownload
					size={48}
					className="transition-all duration-300"
					style={{
						color: isHovered ? '#ffffff' : undefined
					}}
				/>
				<div
					className="absolute text-2xl left-full mr-3 bg-black text-white px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300"
					style={{
						opacity: isHovered ? 1 : 0,
						transform: isHovered ? 'translateX(10px)' : 'translateX(-20px)',
						pointerEvents: 'none'
					}}
				>
					Check my CV!
				</div>
			</div>
		</div>
	)
}
