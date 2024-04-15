import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import MediaLink from './image/MediaLink';

const Footer = () => {
  return (
    <footer className="w-full text-center flex flex-col justify-center">
      <p>My portfolio built with Vite + React + TypeScript + TailwindCSS</p>
      <div className="flex flex-row justify-center text-4xl space-x-4">
        <MediaLink
          href="https://www.linkedin.com/in/nikita-afanasyev-kh/"
          icon={<FaLinkedin />}
        />
        <MediaLink href="https://github.com/WilfredoN" icon={<FaGithub />} />
        <MediaLink
          href="mailto:nikita.afanasyevnn@gmail.com"
          icon={<SiGmail />}
        />
      </div>
    </footer>
  );
};

export default Footer;
