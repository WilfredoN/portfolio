import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiGmail, SiMonkeytype, SiWakatime } from 'react-icons/si'

import { MediaLink } from './image/MediaLink'

export const Footer = () => {
  return (
    <footer className="w-full h-full text-center flex flex-col justify-center pt-16">
      <div className="flex flex-row justify-center text-4xl space-x-4">
        <MediaLink
          href="https://www.linkedin.com/in/nikita-afanasyev-kh/"
          icon={<FaLinkedin />}
        />
        <MediaLink
          href="https://github.com/WilfredoN"
          icon={<FaGithub />}
        />
        <MediaLink
          href="mailto:nikita.afanasyevnn@gmail.com"
          icon={<SiGmail />}
        />
        <MediaLink
          href="https://monkeytype.com/profile/WilfredoN"
          icon={<SiMonkeytype />}
        />
        <MediaLink
          href="https://wakatime.com/@CapybaraN"
          icon={<SiWakatime />}
        />
      </div>
      <p className="opacity-30 animate-pulse">
        My portfolio built with Vite + React + TypeScript + TailwindCSS + Some
        Love ❤️
      </p>
    </footer>
  )
}
