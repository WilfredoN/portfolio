import { useState } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import About from './Pages/About';
import Projects from './Pages/Projects';
import { ThemeContext } from './Components/ThemeContext';
function App() {
  const [currentPage, setCurrentPage] = useState<'about' | 'projects'>('about');
  const [theme, setTheme] = useState('dark');
  const handlePageChange = (page: 'about' | 'projects') => {
    setCurrentPage(page);
  };
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  // TODO: make theme toggle or something random like a random color generator.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main
        className={`${theme} flex flex-col justify-start items-center py-2 md:h-screen`}
      >
        <Header currentPage={currentPage} onPageChange={handlePageChange} />
        {currentPage === 'about' ? <About /> : <Projects />}
        <Footer />
      </main>
    </ThemeContext.Provider>
  );
}

export default App;
