import { AppProviders } from '@app/providers/AppProviders'
import { Content } from '@features/Content'
import { CookieConsent, Header } from '@features/widgets'

import './App.css'

export const App = () => {
  return (
    <AppProviders>
      <div className='app-container'>
        <Header />
        <Content />
        <CookieConsent />
      </div>
    </AppProviders>
  )
}

export default App
