import type { ReactNode } from 'react'

import { PageProvider } from '@app/providers/PageProvider'
import { ThemeProvider } from '@app/providers/ThemeProvider'

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <PageProvider>{children}</PageProvider>
  </ThemeProvider>
)
