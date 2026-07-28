import type { ReactNode } from 'react'

import { PageProvider } from '@app/providers/PageProvider'
import { QueryProvider } from '@app/providers/QueryProvider'
import { ThemeProvider } from '@app/providers/ThemeProvider'
import { ToastProvider } from '@shared/ui/Toast'

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryProvider>
    <ThemeProvider>
      <ToastProvider>
        <PageProvider>{children}</PageProvider>
      </ToastProvider>
    </ThemeProvider>
  </QueryProvider>
)
