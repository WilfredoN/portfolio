import { motion } from 'framer-motion';
import { nextPageVariant } from '../Types/RouterVariants';

const ProjectDescription = () => (
  <motion.h1
    className="text-4xl text-center mt-8 mb-8"
    variants={nextPageVariant}
    initial="initial"
    animate="final"
    style={{ fontSize: '1.7rem' }}
  >
    From serious projects I can highlight my web application called
    <span className="text-blue-400 hover:underline">
      <a href="https://github.com/WilfredoN/alexandria-app"> Alexandria.</a>
    </span>
    <br />
    it is a web platform for organizing a convenient learning process as well as
    communication <br /> between teachers and students. <br />
    It was made as part of a training project in a college.
  </motion.h1>
);

export default ProjectDescription;
