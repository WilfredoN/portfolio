import { useEffect, useRef } from 'react'
import '../../styles/binary-background.css'

interface Symbols {
	x: number
	y: number
	value: string
	speed: number
}

export const BinaryBackground = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const symbols = useRef<Symbols[]>([])
	const resizeTimeout = useRef<number | undefined>(undefined)

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas?.getContext('2d')

		if (!canvas || !ctx) return

		const resizeCanvas = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}

		resizeCanvas()
		const handleResize = () => {
			if (resizeTimeout.current) {
				clearTimeout(resizeTimeout.current)
			}
			resizeTimeout.current = window.setTimeout(resizeCanvas, 100)
		}
		window.addEventListener('resize', handleResize)

		const createSymbols = () => {
			const columns = Math.floor(canvas.width / 20)
			for (let i = 0; i < columns; i++) {
				symbols.current.push({
					x: i * 20,
					y: Math.random() * canvas.height,
					value: Math.random() < 0.5 ? '0' : '1',
					speed: 0.5 - Math.random() * 0.5
				})
			}
		}

		createSymbols()

		const changeSymbolValue = (symbol: Symbols) => {
			setTimeout(
				() => {
					symbol.value = symbol.value === '0' ? '1' : '0'
					changeSymbolValue(symbol)
				},
				Math.random() * 1000 + 500
			)
		}

		const drawSymbols = () => {
			if (!ctx) return
			ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
			ctx.fillRect(0, 0, canvas.width, canvas.height)
			ctx.fillStyle = '#00FF00'
			ctx.font = '28px monospace'

			symbols.current.forEach(symbol => {
				ctx.fillText(symbol.value, symbol.x, symbol.y)
				symbol.y += symbol.speed

				if (symbol.y > canvas.height) {
					symbol.y = 0
					symbol.value = Math.random() < 0.5 ? '0' : '1'
				}
			})
		}

		symbols.current.forEach(symbol => changeSymbolValue(symbol))

		const animate = () => {
			drawSymbols()
			requestAnimationFrame(animate)
		}

		animate()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<canvas
			className="binary-background"
			ref={canvasRef}
		></canvas>
	)
}
