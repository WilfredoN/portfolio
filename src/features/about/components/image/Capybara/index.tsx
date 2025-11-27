import { useEffect, useState } from 'react'

// TODO: move
export interface ImageProps {
  alt?: string
  highQualityUrl?: string
  url?: string
}

export const Capybara = ({
  url = '/capybara_binary_compressed_v2.avif',
  highQualityUrl = '/capybara_binary.png',
  alt = 'Capybara image in zeros and ones style'
}: ImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(url)
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = highQualityUrl

    img.onload = () => {
      setIsHighQualityLoaded(true)
      setCurrentSrc(highQualityUrl)
    }

    return () => {
      img.onload = null
    }
  }, [highQualityUrl])

  if (!url) {
    throw new Error('Image URL is missing')
  }

  if (!alt) {
    throw new Error('Image alt text is missing')
  }

  return (
    <img
      alt={alt || 'Sorry, image not found'}
      draggable='false'
      fetchPriority='high'
      height={556}
      src={currentSrc}
      style={{
        transition: 'filter 0.3s ease-in-out',
        filter: isHighQualityLoaded ? 'none' : 'blur(0px)'
      }}
      width={556}
    />
  )
}
