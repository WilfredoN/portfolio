import { Link } from '@shared/components/Link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiGmail, SiMonkeytype, SiWakatime } from 'react-icons/si'

export const Footer = () => {
  return (
    <footer className='flex h-full w-full flex-col justify-center pt-16 text-center'>
      <div className='flex flex-row justify-center space-x-4 text-4xl'>
        <Link
          href='https://www.linkedin.com/in/nikita-afanasyev-kh/'
          icon={<FaLinkedin />}
        />
        <Link href='https://github.com/WilfredoN' icon={<FaGithub />} />
        <Link href='mailto:nikita.afanasyevnn@gmail.com' icon={<SiGmail />} />
        <Link
          href='https://monkeytype.com/profile/WilfredoN'
          icon={<SiMonkeytype />}
        />
        <Link href='https://wakatime.com/@CapybaraN' icon={<SiWakatime />} />
      </div>
      <p className='animate-pulse opacity-30'>
        My portfolio built with Vite + React + TypeScript + TailwindCSS + Some
        Love ❤️
      </p>
    </footer>
  )
}
