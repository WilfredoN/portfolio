import { useTheme } from '@app/hooks/useTheme'
import { useIsMobile } from '@shared/hooks/isMobile'
import { lazy, Suspense, useEffect, useState } from 'react'

import { applyTheme } from './about/utils/theme'
import { Page } from './widgets/Page'
const Footer = lazy(() =>
  import('@features/about/components/Footer').then((m) => ({
    default: m.Footer
  }))
)
const BinaryBackground = lazy(() =>
  import('@shared/components/BinaryBackground').then((m) => ({
    default: m.BinaryBackground
  }))
)

export const Content = () => {
  const { isDarkTheme } = useTheme()
  const isMobile = useIsMobile()
  const [showFooter, setShowFooter] = useState(false)
  const [showBinary, setShowBinary] = useState(false)

  useEffect(() => {
    applyTheme(isDarkTheme)
    setTimeout(() => setShowFooter(true), 400)
    setTimeout(() => setShowBinary(true), 600)
  }, [isDarkTheme])

  return (
    <main className='flex min-h-screen flex-col items-center justify-start bg-(--color-bg) py-2'>
      <div style={{ width: '100%', minHeight: 120, position: 'relative' }}>
        {showBinary ? (
          <Suspense
            fallback={<div style={{ width: '100%', minHeight: 120 }} />}
          >
            {!isMobile && isDarkTheme && <BinaryBackground />}
          </Suspense>
        ) : (
          <div style={{ width: '100%', minHeight: 120 }} />
        )}
      </div>
      <Page />
      <div style={{ width: '100%', minHeight: 64, position: 'relative' }}>
        {showFooter ? (
          <Suspense fallback={<div style={{ width: '100%', minHeight: 64 }} />}>
            <Footer />
          </Suspense>
        ) : (
          <div style={{ width: '100%', minHeight: 64 }} />
        )}
      </div>
    </main>
  )
}
