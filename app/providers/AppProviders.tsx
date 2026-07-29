import type { ReactNode } from 'react'

import { PageProvider } from '@app/providers/PageProvider'
import { QueryProvider } from '@app/providers/QueryProvider'
import { ThemeProvider } from '@app/providers/ThemeProvider'
import { AppConfigProvider } from '@features/shared/config/useAppConfig'
import { ToastProvider } from '@shared/ui/Toast'

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryProvider>
    <ThemeProvider>
      <ToastProvider>
        <AppConfigProvider>
          <PageProvider>{children}</PageProvider>
        </AppConfigProvider>
      </ToastProvider>
    </ThemeProvider>
  </QueryProvider>
)
