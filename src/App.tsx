import './App.css';

function App() {
  return (
    <>
      <header>
        <h1 className="text-8xl">Portfolio</h1>
      </header>
      <main>
        <section className="text-left">
          <h2 className="text-4xl">About Me</h2>
          <p>
            Hi, I'm a Software Developer. I love to build web applications from
            start to finish.
            <br /> I have experience in Java, Spring on the backend, and React
            on the frontend.
          </p>
        </section>
        <section className="border max-w-96 rounded-xl">
          <h2 className="border-b text-4xl">Skills</h2>
          <ul className="text-3xl">
            <li className="flex items-center justify-center">
              React
              <img
                className="ml-2 w-8"
                src="src\assets\react-original.svg"
              />{' '}
            </li>
            <li className="flex items-center justify-center">
              TypeScript
              <img
                className="ml-2 w-8"
                src="src\assets\typescript-original.svg"
              />
            </li>
            <li className="flex items-center justify-center">
              Vite
              <img className="ml-2 w-8" src="src\assets\vitejs-original.svg" />
            </li>
            <li className="flex items-center justify-center">
              TailwindCSS
              <img
                className="ml-2 w-8"
                src="src\assets\tailwindcss-original.svg"
              />
            </li>
            <li className="flex items-center justify-center">
              Java
              <img className="ml-2 w-8" src="src\assets\java-original.svg" />
            </li>
            <li className="flex items-center justify-center">
              Spring
              <img className="ml-2 w-8" src="src\assets\spring-original.svg" />
            </li>
            <li className="flex items-center justify-center">
              Docker
              <img className="ml-2 w-8" src="src\assets\docker-original.svg" />
            </li>
          </ul>
        </section>
        <section>{/* TODO: Logo's */}</section>
      </main>
      <footer>
        <p>My portfolio built with Vite + React + TypeScript + TailwindCSS</p>
      </footer>
    </>
  );
}

export default App;
