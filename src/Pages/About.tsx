import { motion } from 'framer-motion';
import Icon from '../Components/image/TableIcon';
import { prevPageVariant } from '../Types/RouterVariants';
const About = () => {
  return (
    <motion.article
      className="mb-16 mt-8 md:mb-0"
      variants={prevPageVariant}
      initial="initial"
      animate="final"
    >
      <p className="text-2xl text-left">
        Hi, I'm a Software Developer. I love to build web applications from
        start to finish.
        <br /> I have experience in Java, Spring on the backend, React and
        Angular on the frontend.
      </p>
      <div className="flex md:flex-row flex-col item justify-center mt-8 mb-8">
        <section className="border mb-4 md:mb-0 w-96 xl:mr-8 ">
          <h2 className="border-b text-4xl">Programming Languages</h2>
          <ul className="text-3xl">
            <li className="flex items-center justify-center">
              Java
              <Icon iconName="java" alt="Java" />
            </li>
            <li className="flex items-center justify-center">
              HTML
              <Icon iconName="html5" alt="HTML5" />
            </li>
            <li className="flex items-center justify-center">
              CSS
              <Icon iconName="css3" alt="CSS3" />
            </li>
            <li className="flex items-center justify-center">
              TypeScript
              <Icon iconName="typescript" alt="TypeScript" />
            </li>
          </ul>
        </section>
        <section className="border w-96">
          <h2 className="border-b text-4xl">Technologies and Libraries</h2>
          <ul className="text-3xl">
            <li className="flex items-center justify-center">
              React
              <Icon iconName="react" alt="React" />
            </li>

            <li className="flex items-center justify-center">
              Vite
              <Icon iconName="vitejs" alt="ViteJS" />
            </li>
            <li className="flex items-center justify-center">
              TailwindCSS
              <Icon iconName="tailwindcss" alt="Tailwind" />
            </li>
            <li className="flex items-center justify-center">
              Spring
              <Icon iconName="spring" alt="Spring" />
            </li>
            <li className="flex items-center justify-center">
              Docker
              <Icon iconName="docker" alt="Docker" />
            </li>
          </ul>
        </section>
      </div>
    </motion.article>
  );
};

export default About;
