import './App.css';

function App() {
  return (
    <>
      <header>
        <h1 className="text-8xl mb-10">Portfolio</h1>
      </header>
      <main className="flex flex-col items-center">
        <section className="text-left">
          <h2 className="text-5xl">About Me</h2>
          <p>
            Hi, I'm a Software Developer. I love to build web applications from
            start to finish.
            <br /> I have experience in Java, Spring on the backend, React and
            Angular on the frontend.
          </p>
        </section>
        <article className="flex flex-row mb-16 mt-8">
          <section className="border max-w-96 rounded-xl mr-8">
            <h2 className="border-b text-4xl">Programming Languages</h2>
            <ul className="text-3xl">
              <li className="flex items-center justify-center">
                Java
                <img className="ml-2 w-8" src="src\assets\java-original.svg" />
              </li>
              <li className="flex items-center justify-center">
                HTML
                <img className="ml-2 w-8" src="src\assets\html5-original.svg" />
              </li>
              <li className="flex items-center justify-center">
                CSS
                <img className="ml-2 w-8" src="src\assets\css3-original.svg" />
              </li>
              <li className="flex items-center justify-center">
                TypeScript
                <img
                  className="ml-2 w-8"
                  src="src\assets\typescript-original.svg"
                />
              </li>
            </ul>
          </section>
          <section className="border max-w-96 rounded-xl">
            <h2 className="border-b text-4xl">Technologies and Libraries</h2>
            <ul className="text-3xl">
              <li className="flex items-center justify-center">
                React
                <img className="ml-2 w-8" src="src\assets\react-original.svg" />
              </li>

              <li className="flex items-center justify-center">
                Vite
                <img
                  className="ml-2 w-8"
                  src="src\assets\vitejs-original.svg"
                />
              </li>
              <li className="flex items-center justify-center">
                TailwindCSS
                <img
                  className="ml-2 w-8"
                  src="src\assets\tailwindcss-original.svg"
                />
              </li>
              <li className="flex items-center justify-center">
                Spring
                <img
                  className="ml-2 w-8"
                  src="src\assets\spring-original.svg"
                />
              </li>
              <li className="flex items-center justify-center">
                Docker
                <img
                  className="ml-2 w-8"
                  src="src\assets\docker-original.svg"
                />
              </li>
            </ul>
          </section>
        </article>
      </main>
      <footer>
        <p>My portfolio built with Vite + React + TypeScript + TailwindCSS</p>
      </footer>
    </>
  );
}

export default App;
