import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="w-full text-center flex flex-col justify-center">
      <p>My portfolio built with Vite + React + TypeScript + TailwindCSS</p>
      <div className="flex flex-row justify-center text-4xl space-x-8">
        <a href="https://www.linkedin.com/in/nikita-afanasyev-kh/">
          <FaLinkedin />
        </a>
        <a href="https://github.com/WilfredoN">
          <FaGithub />
        </a>
        <a href="mailto:nikita.afanasyevnn@gmail.com">
          <SiGmail />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
