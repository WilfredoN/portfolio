import type { ReactNode } from 'react'

import { PageProvider } from '@app/providers/PageProvider'
import { QueryProvider } from '@app/providers/QueryProvider'
import { ThemeProvider } from '@app/providers/ThemeProvider'

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryProvider>
    <ThemeProvider>
      <PageProvider>{children}</PageProvider>
    </ThemeProvider>
  </QueryProvider>
)
