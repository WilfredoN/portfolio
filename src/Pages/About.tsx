import { motion } from 'framer-motion';
import AboutMe from '../Components/image/CapybaraBinary';
import Icon from '../Components/image/TableIcon';
import { prevPageVariant } from '../Types/RouterVariants';

const About = () => {
  return (
    <motion.article
      className="mt-8 w-full"
      variants={prevPageVariant}
      initial="initial"
      animate="final"
    >
      <motion.aside>
        <AboutMe />
      </motion.aside>
      <div className="flex flex-col justify-center sm:flex-row mt-8 mb-8 w-full">
        <section className="border mb-4 md:mb-0 md:w-96 mr-0 xl:mr-8 sm:w-full">
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
        <section className="border mb-4 md:mb-0 md:w-96 mr-0 xl:mr-8 sm:w-full">
          <h2 className="border-b text-4xl">Technologies and Libraries</h2>
          <ul className="text-3xl">
            <li className="flex items-center justify-center">
              React
              <Icon iconName="react" alt="React" />
            </li>
            <li className="flex items-center justify-center">
              Angular
              <Icon iconName="angular" alt="Angular" />
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
              PostgreSQL
              <Icon iconName="postgresql" alt="PostgreSQL" />
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
