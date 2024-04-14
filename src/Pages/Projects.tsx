import { motion } from 'framer-motion';
import { projectsVariant } from '../Types/RouterVariants';
import MotionImage from '../Components/image/ImageProjects';

const Projects = () => {
  return (
    <motion.article
      className="mb-16 mt-8 w-full text-left flex flex-col items-center justify-center"
      variants={projectsVariant}
      initial="initial"
      animate="final"
    >
      <h1 className="text-4xl mb-8">
        From serious projects I can highlight my web application called
        <span className="text-blue-400 hover:underline">
          <a href="https://github.com/WilfredoN/alexandria-app"> Alexandria</a>
        </span>
        , it is a web platform for organizing a convenient learning process as
        well as communication between teachers and students. It was made as part
        of a training project in a college.
      </h1>
      <h1 className="text-6xl mb-8">Gallery</h1>
      <main className="overflow-visible grid grid-cols-2 gap-8">
        <MotionImage
          delay={0.5}
          src="https://i.ibb.co/vQmK2qX/chrome-zc-Fd-WLPGS8.png"
        />
        <MotionImage
          delay={1}
          src="https://i.ibb.co/vs1LknZ/chrome-91-Mhvsv-SIU.png"
        />
        <MotionImage
          delay={1.5}
          src="https://i.ibb.co/j5pYmQr/chrome-a-No0-Owk-J70.png"
        />
        <MotionImage
          delay={2}
          src="https://i.ibb.co/WF0NCcS/chrome-3db-IAM3v4-H.png"
        />
        <MotionImage
          delay={2.5}
          src="https://i.ibb.co/48PbSPp/chrome-jz-HSrz-E1-KB.png"
        />
      </main>
    </motion.article>
  );
};

export default Projects;
