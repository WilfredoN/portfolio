import { useTheme } from '@app/hooks/useTheme'
import { useIsMobile } from '@shared/hooks/isMobile'
import { lazy, Suspense, useEffect } from 'react'

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

  useEffect(() => {
    applyTheme(isDarkTheme)
  }, [isDarkTheme])

  return (
    <main className='flex min-h-[100vh] flex-col items-center justify-start py-2'>
      <Suspense fallback={null}>{!isMobile && <BinaryBackground />}</Suspense>
      <Page />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  )
}
