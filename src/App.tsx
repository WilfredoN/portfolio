import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import About from './Pages/About';
import Projects from './Pages/Projects';

function App() {
  const [currentPage, setCurrentPage] = useState<'about' | 'projects'>('about');

  const handlePageChange = (page: 'about' | 'projects') => {
    setCurrentPage(page);
  };

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
      <footer className="text-center">
        <p>My portfolio built with Vite + React + TypeScript + TailwindCSS</p>
      </footer>
    </div>
  );
}

export default App;
