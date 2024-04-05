import { Suspense } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import LocationProvider from './Components/LocationProvider';
import About from './Pages/About';
import Projects from './Pages/Projects';

const RoutesWithAnimation = () => {
  const location = useLocation();
  return (
    <HashRouter>
      <Routes location={location} key={location.key}>
        <Route path="*" element={<About />} />
        <Route path="/portfolio/about" element={<About />} />
        <Route path="/portfolio/projects" element={<Projects />} />
      </Routes>
    </HashRouter>
  );
};

function App() {
  return (
    <div className="flex flex-col">
      <header>
        <h1 className="text-8xl mb-10">Portfolio</h1>
      </header>
      <main className="flex flex-col items-center flex-grow overflow-hidden">
        <Header />
        <LocationProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <RoutesWithAnimation />
          </Suspense>
        </LocationProvider>
      </main>
      <footer className="text-center">
        <p>My portfolio built with Vite + React + TypeScript + TailwindCSS</p>
      </footer>
    </div>
  );
}

export default App;
