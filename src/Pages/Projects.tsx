import { motion } from 'framer-motion';
import { nextPageVariant } from '../Types/RouterVariants';
import ProjectDescription from '../Components/ProjectDescription';
import Gallery from '../Components/image/Gallery';

const Projects = () => (
  <>
    <ProjectDescription />
    <motion.article
      className="mt-8 w-full text-left flex flex-col items-center justify-center"
      variants={nextPageVariant}
      initial="initial"
      animate="final"
    >
      <Gallery />
    </motion.article>
  </>
);

export default Projects;
