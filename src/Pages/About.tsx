const About = () => {
  return (
    <article className="mb-16 mt-8">
      <p>
        Hi, I'm a Software Developer. I love to build web applications from
        start to finish.
        <br /> I have experience in Java, Spring on the backend, React and
        Angular on the frontend.
      </p>
      <div className="flex flex-row mt-8">
        <section className="border max-w-96 rounded-xl mr-8">
          <h2 className="border-b text-4xl">Programming Languages</h2>
          <ul className="text-3xl">
            <li className="flex items-center justify-center">
              Java
              <img className="ml-2 w-8" src="public/java-original.svg" />
            </li>
            <li className="flex items-center justify-center">
              HTML
              <img className="ml-2 w-8" src="public/html5-original.svg" />
            </li>
            <li className="flex items-center justify-center">
              CSS
              <img className="ml-2 w-8" src="public/css3-original.svg" />
            </li>
            <li className="flex items-center justify-center">
              TypeScript
              <img className="ml-2 w-8" src="public/typescript-original.svg" />
            </li>
          </ul>
        </section>
        <section className="border max-w-96 rounded-xl">
          <h2 className="border-b text-4xl">Technologies and Libraries</h2>
          <ul className="text-3xl">
            <li className="flex items-center justify-center">
              React
              <img className="ml-2 w-8" src="public/react-original.svg" />
            </li>

            <li className="flex items-center justify-center">
              Vite
              <img className="ml-2 w-8" src="public/vitejs-original.svg" />
            </li>
            <li className="flex items-center justify-center">
              TailwindCSS
              <img className="ml-2 w-8" src="public/tailwindcss-original.svg" />
            </li>
            <li className="flex items-center justify-center">
              Spring
              <img className="ml-2 w-8" src="public/spring-original.svg" />
            </li>
            <li className="flex items-center justify-center">
              Docker
              <img className="ml-2 w-8" src="public/docker-original.svg" />
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
};

export default About;
