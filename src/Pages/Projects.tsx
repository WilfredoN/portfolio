import { motion } from 'framer-motion';
import { projectsVariant } from '../Types/RouterVariants';

const Projects = () => {
  return (
    <motion.article
      className="mb-16 mt-8"
      variants={projectsVariant}
      initial="initial"
      animate="final"
    >
      1
    </motion.article>
  );
};

export default Projects;
