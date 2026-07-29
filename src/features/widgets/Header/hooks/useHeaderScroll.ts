import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import type { HeaderStageConfig } from '../navConfig'

import { HEADER_STAGE_CONFIG } from '../navConfig'

export type HeaderStage = 'expanded' | 'compact' | 'micro' | 'hidden'

export const useHeaderScroll = (
  config: HeaderStageConfig = HEADER_STAGE_CONFIG
) => {
  const location = useLocation()
  const [stage, setStage] = useState<HeaderStage>('expanded')
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')

  const lastScrollYRef = useRef(0)
  const scrollDirectionRef = useRef<'up' | 'down'>('up')

  useEffect(() => {
    const rootEl = document.getElementById('root')
    if (rootEl) {
      rootEl.scrollTop = 0
    }
    window.scrollTo(0, 0)
    lastScrollYRef.current = 0
    scrollDirectionRef.current = 'up'
    setStage('expanded')
    setScrollDirection('up')
  }, [location.pathname])

  useEffect(() => {
    let ticking = false

    const updateScroll = () => {
      const rootEl = document.getElementById('root')
      const currentY = rootEl ? rootEl.scrollTop : window.scrollY
      const scrollHeight = rootEl
        ? rootEl.scrollHeight
        : document.body.scrollHeight
      const clientHeight = rootEl ? rootEl.clientHeight : window.innerHeight
      const maxScroll = Math.max(1, scrollHeight - clientHeight)

      const compactPx = Math.max(
        config.minCompactPx ?? 60,
        (maxScroll * config.compactStartPercent) / 100
      )
      const minMicro = Math.max(config.minMicroPx ?? 250, compactPx + 100)
      const microPx = Math.max(
        minMicro,
        (maxScroll * config.microStartPercent) / 100
      )
      const hidePx = Math.max(
        microPx + 100,
        (maxScroll * config.hideStartPercent) / 100
      )

      const isScrollingDown = currentY > lastScrollYRef.current + 2
      const isScrollingUp = currentY < lastScrollYRef.current - 2

      let currentDir = scrollDirectionRef.current
      if (isScrollingDown) {
        currentDir = 'down'
        scrollDirectionRef.current = 'down'
        setScrollDirection((prev) => (prev === 'down' ? prev : 'down'))
      } else if (isScrollingUp) {
        currentDir = 'up'
        scrollDirectionRef.current = 'up'
        setScrollDirection((prev) => (prev === 'up' ? prev : 'up'))
      }

      let nextStage: HeaderStage = 'expanded'

      if (currentY < compactPx) {
        nextStage = 'expanded'
      } else if (currentY >= compactPx && currentY < microPx) {
        nextStage = 'compact'
      } else {
        const isPastHideThreshold = currentY >= hidePx

        if (isPastHideThreshold && currentDir === 'down') {
          nextStage = 'hidden'
        } else if (currentDir === 'up') {
          nextStage = currentY > microPx ? 'micro' : 'compact'
        } else {
          nextStage = 'micro'
        }
      }

      setStage((prev) => (prev === nextStage ? prev : nextStage))
      lastScrollYRef.current = currentY
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
  }, [config])

  return { stage, scrollDirection }
}
