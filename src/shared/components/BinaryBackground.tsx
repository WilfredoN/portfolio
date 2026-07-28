import { useEffect, useRef } from 'react'

import '../styles/bg.css'

const MATRIX_CONFIG = {
  BASE_SPEED: 0.75,
  FLICKER_PROBABILITY: 0.05,
  FONT_SIZE: 18,
  HEAD_COLOR: '#e0f2fe',
  HEAD_GLOW_BLUR: 6,
  HEAD_GLOW_COLOR: '#38bdf8',
  MAX_ADDITIONAL_LENGTH: 12,
  MIN_ALPHA: 0.1,
  MIN_COLUMN_LENGTH: 8,
  RESIZE_THROTTLE_MS: 150,
  SPEED_VARIATION: 1.0,
  TRAIL_RGB: '16, 185, 129'
} as const

interface MatrixColumn {
  chars: string[]
  direction: 'down' | 'up'
  length: number
  speed: number
  x: number
  y: number
}

export const BinaryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    let animationFrameId: number
    let resizeTimeoutId: ReturnType<typeof setTimeout>
    let columns: MatrixColumn[] = []

    const initColumns = (width: number, height: number) => {
      const colCount = Math.ceil(width / MATRIX_CONFIG.FONT_SIZE)
      columns = []

      for (let i = 0; i < colCount; i++) {
        const length =
          Math.floor(Math.random() * MATRIX_CONFIG.MAX_ADDITIONAL_LENGTH) +
          MATRIX_CONFIG.MIN_COLUMN_LENGTH
        const chars: string[] = []
        for (let j = 0; j < length; j++) {
          chars.push(Math.random() < 0.5 ? '0' : '1')
        }

        const direction = Math.random() < 0.5 ? 'down' : 'up'
        const y =
          direction === 'down'
            ? Math.floor(Math.random() * -height)
            : height + Math.floor(Math.random() * height)

        columns.push({
          x: i * MATRIX_CONFIG.FONT_SIZE,
          y,
          speed:
            Math.random() * MATRIX_CONFIG.SPEED_VARIATION +
            MATRIX_CONFIG.BASE_SPEED,
          length,
          chars,
          direction
        })
      }
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initColumns(width, height)
    }

    resizeCanvas()

    const handleResize = () => {
      clearTimeout(resizeTimeoutId)
      resizeTimeoutId = setTimeout(
        resizeCanvas,
        MATRIX_CONFIG.RESIZE_THROTTLE_MS
      )
    }

    window.addEventListener('resize', handleResize)

    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      ctx.clearRect(0, 0, width, height)

      ctx.font = `${MATRIX_CONFIG.FONT_SIZE}px monospace`
      ctx.textBaseline = 'top'

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i]

        for (let j = 0; j < col.length; j++) {
          const charY =
            col.direction === 'down'
              ? col.y - j * MATRIX_CONFIG.FONT_SIZE
              : col.y + j * MATRIX_CONFIG.FONT_SIZE

          if (
            charY < -MATRIX_CONFIG.FONT_SIZE ||
            charY > height + MATRIX_CONFIG.FONT_SIZE
          ) {
            continue
          }

          if (Math.random() < MATRIX_CONFIG.FLICKER_PROBABILITY) {
            col.chars[j] = Math.random() < 0.5 ? '0' : '1'
          }

          const char = col.chars[j]

          if (j === 0) {
            ctx.fillStyle = MATRIX_CONFIG.HEAD_COLOR
            ctx.shadowColor = MATRIX_CONFIG.HEAD_GLOW_COLOR
            ctx.shadowBlur = MATRIX_CONFIG.HEAD_GLOW_BLUR
          } else {
            const alpha = Math.max(MATRIX_CONFIG.MIN_ALPHA, 1 - j / col.length)
            ctx.fillStyle = `rgba(${MATRIX_CONFIG.TRAIL_RGB}, ${alpha})`
            ctx.shadowBlur = 0
          }

          ctx.fillText(char, col.x, charY)
        }

        if (col.direction === 'down') {
          col.y += col.speed
          if (col.y - col.length * MATRIX_CONFIG.FONT_SIZE > height) {
            col.y = Math.floor(Math.random() * -100)
            col.speed =
              Math.random() * MATRIX_CONFIG.SPEED_VARIATION +
              MATRIX_CONFIG.BASE_SPEED
            for (let j = 0; j < col.length; j++) {
              col.chars[j] = Math.random() < 0.5 ? '0' : '1'
            }
          }
        } else {
          col.y -= col.speed
          if (col.y + col.length * MATRIX_CONFIG.FONT_SIZE < 0) {
            col.y = height + Math.floor(Math.random() * 100)
            col.speed =
              Math.random() * MATRIX_CONFIG.SPEED_VARIATION +
              MATRIX_CONFIG.BASE_SPEED
            for (let j = 0; j < col.length; j++) {
              col.chars[j] = Math.random() < 0.5 ? '0' : '1'
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      clearTimeout(resizeTimeoutId)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className='binary-background' />
}
