import { AppProviders } from '@app/providers/AppProviders'
import { Content } from '@features/Content'
import { CookieConsent } from '@features/widgets/cookie/CookieConsent'
import { Header } from '@features/widgets/Header'

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
