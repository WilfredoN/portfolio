import { useEffect, useState } from 'react'

import { HEADER_STAGE_CONFIG, type HeaderStageConfig } from '../navConfig'

export type HeaderStage = 'expanded' | 'compact' | 'micro' | 'hidden'

export const useHeaderScroll = (
  config: HeaderStageConfig = HEADER_STAGE_CONFIG
) => {
  const [stage, setStage] = useState<HeaderStage>('expanded')
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')

  useEffect(() => {
    let lastScrollY = 0
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
      const microPx = Math.max(
        config.minMicroPx ?? 250,
        (maxScroll * config.microStartPercent) / 100
      )
      const hidePx = (maxScroll * config.hideStartPercent) / 100

      const isScrollingDown = currentY > lastScrollY + 2
      const isScrollingUp = currentY < lastScrollY - 2

      let currentDir = scrollDirection
      if (isScrollingDown) {
        currentDir = 'down'
        setScrollDirection((prev) => (prev === 'down' ? prev : 'down'))
      } else if (isScrollingUp) {
        currentDir = 'up'
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
  }, [config, scrollDirection])

  return { stage, scrollDirection }
}
