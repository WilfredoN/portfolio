import { useTheme } from '@app/hooks/useTheme'
import { Footer } from '@features/about/components/Footer'
import { BinaryBackground } from '@shared/components/BinaryBackground'
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
      {!isMobile && <BinaryBackground />}
      <Page />
      <Footer />
    </main>
  )
}
