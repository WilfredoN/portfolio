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
