import { useIsMobile } from '@shared/hooks/isMobile'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import React from 'react'

import { UniversalImage } from './UniversalImage'
import { useProgressiveImage } from './useProgressiveImage'

export interface ImageProps {
  alt?: string
  className?: string
  height?: number
  highQualityUrl?: string
  perspective?: number
  url?: string
  width?: number
}

export const CapybaraImage = ({
  url = '/capybara_binary_compressed_v2.avif',
  highQualityUrl = '/capybara_binary.png',
  alt = 'Capybara image in zeros and ones style',
  width = 556,
  height = 556,
  className = '',
  perspective = 1000
}: ImageProps) => {
  const { src, loaded } = useProgressiveImage(url, highQualityUrl)
  const isMobile = useIsMobile()

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springConfig = { damping: 30, stiffness: 120, mass: 0.8 }

  const rotateX = useSpring(useTransform(y, [0, 1], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(x, [0, 1], [-15, 15]), springConfig)
  const scale = useSpring(1, springConfig)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) {
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const widthVal = rect.width
    const heightVal = rect.height
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    x.set(mouseX / widthVal)
    y.set(mouseY / heightVal)
  }

  const handleMouseEnter = () => {
    if (isMobile) {
      return
    }
    scale.set(1.04)
  }

  const handleMouseLeave = () => {
    if (isMobile) {
      return
    }
    x.set(0.5)
    y.set(0.5)
    scale.set(1)
  }

  return (
    <div
      style={{
        aspectRatio: `${width} / ${height}`,
        width,
        height,
        perspective: isMobile ? undefined : `${perspective}px`
      }}
    >
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          scale: isMobile ? 1 : scale,
          transformStyle: isMobile ? undefined : 'preserve-3d',
          width: '100%',
          height: '100%'
        }}
        onMouseEnter={isMobile ? undefined : handleMouseEnter}
        onMouseLeave={isMobile ? undefined : handleMouseLeave}
        onMouseMove={isMobile ? undefined : handleMouseMove}
      >
        <UniversalImage
          alt={alt}
          avifSrc={url}
          className={className}
          height={height}
          loaded={loaded}
          pngSrc={highQualityUrl}
          src={src}
          width={width}
        />
      </motion.div>
    </div>
  )
}

export default CapybaraImage
