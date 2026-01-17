import { useEffect, useState } from 'react'

export const useProgressiveImage = (lowSrc: string, highSrc: string) => {
  const [src, setSrc] = useState(lowSrc)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    let active = true
    const img = new window.Image()
    img.src = highSrc
    img.onload = () => {
      if (active) {
        setSrc(highSrc)
        setLoaded(true)
      }
    }
    return () => {
      active = false
    }
  }, [lowSrc, highSrc])
  return { src, loaded }
}
