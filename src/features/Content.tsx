import { useTheme } from '@app/hooks/useTheme'
import { Footer } from '@features/about/components/Footer'
import { BinaryBackground } from '@shared/components/BinaryBackground'
import { useEffect } from 'react'

import { applyTheme } from './about/utils/theme'
import { Page } from './widgets/Page'

export const Content = () => {
  const { isDarkTheme } = useTheme()

  useEffect(() => {
    applyTheme(isDarkTheme)
  }, [isDarkTheme])

  return (
    <main className='flex flex-col justify-start items-center py-2 min-h-[100vh]'>
      <BinaryBackground />
      <Page />
      <Footer />
    </main>
  )
}
