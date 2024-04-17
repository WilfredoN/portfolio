import { useState } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import About from './Pages/About';
import Projects from './Pages/Projects';
function App() {
  const [currentPage, setCurrentPage] = useState<'about' | 'projects'>('about');

  const handlePageChange = (page: 'about' | 'projects') => {
    setCurrentPage(page);
  };
  // TODO: make theme toggle or something random like a random color generator.
  return (
    <main className="flex flex-col justify-center items-center w-full">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      {currentPage === 'about' ? <About /> : <Projects />}
      <Footer />
    </main>
  );
}

export default App;
