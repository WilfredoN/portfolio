import { useTheme } from '@app/hooks/useTheme'
import { lazy, Suspense } from 'react'
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
import { useIsMobile } from '@shared/hooks/isMobile'
import { useEffect } from 'react'

import { applyTheme } from './about/utils/theme'
import { Page } from './widgets/Page'

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
