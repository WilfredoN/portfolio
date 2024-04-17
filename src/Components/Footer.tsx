import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import MediaLink from './image/MediaLink';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <footer
      className={`${theme} w-full text-center flex flex-col justify-center pt-16`}
    >
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
      <p className="opacity-30 animate-pulse">
        My portfolio built with Vite + React + TypeScript + TailwindCSS
      </p>
    </footer>
  );
};

export default Footer;
