import React, { useEffect, useRef } from 'react'

export const CapybaraImage = () => {
	const imgRef = useRef<HTMLImageElement>(null)

	useEffect(() => {
		const img = imgRef.current
		if (img) {
			img.style.opacity = '1'
		}
	}, [])

	const handleMouseMove = (e: React.MouseEvent) => {
		const img = imgRef.current
		if (img) {
			const rect = img.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top

			const moveX = (x / rect.width - 0.5) * 20
			const moveY = (y / rect.height - 0.5) * 20

			const rotateX = (y / rect.height - 0.5) * 10
			const rotateY = (x / rect.width - 0.5) * -10

			img.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
		}
	}

	return (
		<div
			className="flex items-center justify-center overflow-hidden border-2 w-fit sm:w-1/2 xl:w-3/6 rounded-full"
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
		</div>
	)
}
