import { Link } from '@shared/components/Link'
import {
  GithubIcon,
  GmailIcon,
  LinkedInIcon,
  MonkeytypeIcon,
  WakatimeIcon
} from '@shared/icons'

export const Footer = () => {
  return (
    <footer className='flex h-full w-full flex-col justify-center bg-[var(--color-bg)] pt-16 text-center'>
      <div className='flex flex-row justify-center space-x-4 text-4xl'>
        <Link
          href='https://www.linkedin.com/in/nikita-afanasyev-kh/'
          icon={<LinkedInIcon />}
        />
        <Link href='https://github.com/WilfredoN' icon={<GithubIcon />} />
        <Link href='mailto:nikita.afanasyevnn@gmail.com' icon={<GmailIcon />} />
        <Link
          href='https://monkeytype.com/profile/WilfredoN'
          icon={<MonkeytypeIcon />}
        />
        <Link href='https://wakatime.com/@CapybaraN' icon={<WakatimeIcon />} />
      </div>
      <p>
        My portfolio built with Vite + React + TypeScript + TailwindCSS + Some
        Love ❤️
      </p>
    </footer>
  )
}
