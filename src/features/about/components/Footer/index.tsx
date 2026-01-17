import { Link } from '@shared/components/Link'
import { lazy, Suspense } from 'react'

const LinkedInIcon = lazy(() =>
  import('@shared/icons/LinkedInIcon').then((m) => ({
    default: m.LinkedInIcon
  }))
)
const GithubIcon = lazy(() =>
  import('@shared/icons/GithubIcon').then((m) => ({ default: m.GithubIcon }))
)
const GmailIcon = lazy(() =>
  import('@shared/icons/GmailIcon').then((m) => ({ default: m.GmailIcon }))
)
const MonkeytypeIcon = lazy(() =>
  import('@shared/icons/MonkeytypeIcon').then((m) => ({
    default: m.MonkeytypeIcon
  }))
)
const WakatimeIcon = lazy(() =>
  import('@shared/icons/WakatimeIcon').then((m) => ({
    default: m.WakatimeIcon
  }))
)

export const Footer = () => {
  return (
    <footer className='flex h-full w-full flex-col justify-center bg-(--color-bg) pt-16 text-center'>
      <Suspense
        fallback={
          <div className='flex flex-row justify-center space-x-4 text-4xl'>
            Loading icons...
          </div>
        }
      >
        <div className='flex flex-row justify-center space-x-4 text-4xl'>
          <Link
            href='https://www.linkedin.com/in/nikita-afanasyev-kh/'
            icon={<LinkedInIcon />}
          />
          <Link href='https://github.com/WilfredoN' icon={<GithubIcon />} />
          <Link
            href='mailto:nikita.afanasyevnn@gmail.com'
            icon={<GmailIcon />}
          />
          <Link
            href='https://monkeytype.com/profile/WilfredoN'
            icon={<MonkeytypeIcon />}
          />
          <Link
            href='https://wakatime.com/@CapybaraN'
            icon={<WakatimeIcon />}
          />
        </div>
      </Suspense>
      <p>
        My portfolio built with Vite + React + TypeScript + TailwindCSS + Some
        Love ❤️
      </p>
    </footer>
  )
}
