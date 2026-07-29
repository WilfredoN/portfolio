import { AppProviders } from '@app/providers/AppProviders'
import { Content } from '@features/Content'
import { useGAPageView } from '@features/shared/analytics/useGAPageView'
import { CookieConsent, Header } from '@features/widgets'
import { CommandPaletteWidget } from '@features/widgets/CommandPalette'

import './App.css'

const AppMainContent = () => {
  useGAPageView()

  return (
    <div className='app-container'>
      <a
        className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-10000 focus:rounded-full focus:border focus:border-emerald-500 focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-emerald-400 focus:shadow-2xl focus:outline-none'
        href='#main-content'
      >
        Skip to main content
      </a>
      <Header />
      <Content />
      <CookieConsent />
      <CommandPaletteWidget />
    </div>
  )
}

export const App = () => {
  return (
    <AppProviders>
      <AppMainContent />
    </AppProviders>
  )
}

export default App
