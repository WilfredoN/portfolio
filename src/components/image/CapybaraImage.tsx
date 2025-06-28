import React from 'react'
import { useCapybaraImageAnimation } from './useCapybaraImageAnimation'

interface CapybaraImageProps {
	children?: React.ReactNode
}

export const CapybaraImage = React.memo(({ children }: CapybaraImageProps) => {
	const { imgRef, handleMouseMove } = useCapybaraImageAnimation()

	return (
		<div className="flex items-center justify-center max-w-[35rem] relative">
			<div
				className="flex items-center justify-center overflow-hidden border-2 xl:w-full sm:w-1/2 rounded-full relative"
				onMouseMove={handleMouseMove}
				style={{ perspective: '1000px' }}
			>
				<img
					ref={imgRef}
					src="assets/capybara_binary.png"
					alt="Capybara image in zeros and ones style"
					className="scale-105 rounded-full transition-transform duration-300 ease-out"
					style={{
						transition: 'transform 0.3s ease-out, opacity 1s ease-in',
						opacity: '0'
					}}
					draggable="false"
				/>
				{children}
			</div>
		</div>
	)
})
