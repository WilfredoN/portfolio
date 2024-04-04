import { Suspense, lazy } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
const About = lazy(() => import('./Pages/About'));
const Projects = lazy(() => import('./Pages/Projects'));

function App() {
  return (
    <div className="flex flex-col">
      <header>
        <h1 className="text-8xl mb-10">Portfolio</h1>
      </header>
      <main className="flex flex-col items-center flex-grow">
        <Header />
        <Suspense fallback={<div className="text-4xl mt-10">Loading...</div>}>
          <Routes>
            <Route path="*" element={<About />} />
            <Route path="/portfolio/about" element={<About />} />
            <Route path="/portfolio/projects" element={<Projects />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="text-center">
        <p>My portfolio built with Vite + React + TypeScript + TailwindCSS</p>
      </footer>
    </div>
  );
}

export default App;
