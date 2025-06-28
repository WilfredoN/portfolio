import { useRef, useEffect } from 'react'

export function useCapybaraImageAnimation() {
	const imgRef = useRef<HTMLImageElement>(null)
	const frame = useRef<number | null>(null)
	const lastTransform = useRef<string>('')

	useEffect(() => {
		const img = imgRef.current
		if (img) {
			img.style.opacity = '1'
		}
		return () => {
			if (frame.current) cancelAnimationFrame(frame.current)
		}
	}, [])

	const handleMouseMove = (e: React.MouseEvent) => {
		const img = imgRef.current
		if (!img) return

		const rect = img.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		const moveX = (x / rect.width - 0.5) * 20
		const moveY = (y / rect.height - 0.5) * 20

		const rotateX = (y / rect.height - 0.5) * 10
		const rotateY = (x / rect.width - 0.5) * -10

		const transform = `translate(${moveX}px, ${moveY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
		lastTransform.current = transform

		if (frame.current === null) {
			frame.current = requestAnimationFrame(() => {
				if (img) img.style.transform = lastTransform.current
				frame.current = null
			})
		}
	}

	return { imgRef, handleMouseMove }
}
