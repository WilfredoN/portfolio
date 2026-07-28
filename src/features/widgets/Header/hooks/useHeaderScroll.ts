import { useEffect, useState } from 'react'

export interface HeaderScrollOptions {
  thresholdDown?: number
  thresholdUp?: number
}

export const useHeaderScroll = ({
  thresholdDown = 60,
  thresholdUp = 20
}: HeaderScrollOptions = {}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')

  useEffect(() => {
    let lastScrollY = 0
    let ticking = false

    const updateScroll = () => {
      const rootEl = document.getElementById('root')
      const currentY = rootEl ? rootEl.scrollTop : window.scrollY

      if (currentY > lastScrollY && currentY > thresholdDown) {
        setScrollDirection((prev) => (prev === 'down' ? prev : 'down'))
        setIsScrolled((prev) => (prev ? prev : true))
      } else if (currentY < lastScrollY) {
        setScrollDirection((prev) => (prev === 'up' ? prev : 'up'))
        if (currentY < thresholdUp) {
          setIsScrolled((prev) => (!prev ? prev : false))
        }
      }

      lastScrollY = currentY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll)
        ticking = true
      }
    }

    const rootEl = document.getElementById('root')
    rootEl?.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    updateScroll()

    return () => {
      rootEl?.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', onScroll)
    }
  }, [thresholdDown, thresholdUp])

  return { isScrolled, scrollDirection }
}
