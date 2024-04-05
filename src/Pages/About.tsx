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
              <img
                className="ml-2 w-8"
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/java/java-original.svg"
              />
            </li>
            <li className="flex items-center justify-center">
              HTML
              <img
                className="ml-2 w-8"
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/html5/html5-original.svg"
              />
            </li>
            <li className="flex items-center justify-center">
              CSS
              <img
                className="ml-2 w-8"
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/css3/css3-original.svg"
              />
            </li>
            <li className="flex items-center justify-center">
              TypeScript
              <img
                className="ml-2 w-8"
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/typescript/typescript-original.svg"
              />
            </li>
          </ul>
        </section>
        <section className="border max-w-96 rounded-xl">
          <h2 className="border-b text-4xl">Technologies and Libraries</h2>
          <ul className="text-3xl">
            <li className="flex items-center justify-center">
              React
              <img
                className="ml-2 w-8"
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/react/react-original.svg"
              />
            </li>

            <li className="flex items-center justify-center">
              Vite
              <img
                className="ml-2 w-8"
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/vitejs/vitejs-original.svg"
              />
            </li>
            <li className="flex items-center justify-center">
              TailwindCSS
              <img
                className="ml-2 w-8"
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/tailwindcss/tailwindcss-original.svg"
              />
            </li>
            <li className="flex items-center justify-center">
              Spring
              <img
                className="ml-2 w-8"
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/spring/spring-original.svg"
              />
            </li>
            <li className="flex items-center justify-center">
              Docker
              <img
                className="ml-2 w-8"
                src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/docker/docker-original.svg"
              />
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
};

export default About;
