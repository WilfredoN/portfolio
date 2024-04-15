import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import About from './Pages/About';
import Projects from './Pages/Projects';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
function App() {
  const [currentPage, setCurrentPage] = useState<'about' | 'projects'>('about');

  const handlePageChange = (page: 'about' | 'projects') => {
    setCurrentPage(page);
  };
  // TODO: make footer with social media links.
  // TODO: make theme toggle or something random like a random color generator.
  return (
    <div className="flex flex-col justify-center w-full">
      <header>
        <h1 className="text-8xl mb-10" style={{ fontSize: '4rem' }}>
          Portfolio
        </h1>
      </header>
      <main className="flex flex-col items-center flex-grow">
        <Header currentPage={currentPage} onPageChange={handlePageChange} />
        {currentPage === 'about' ? <About /> : <Projects />}
      </main>
      <footer className="w-full text-center flex flex-col justify-center">
        <p>My portfolio built with Vite + React + TypeScript + TailwindCSS</p>
        <div className="flex flex-row justify-center text-4xl">
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
    </div>
  );
}

export default App;
