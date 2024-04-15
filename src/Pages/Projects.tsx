import { motion } from 'framer-motion';
import { projectsVariant } from '../Types/RouterVariants';
import MotionImage from '../Components/image/ImageProjects';
import { Disclosure, Transition } from '@headlessui/react';

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
      {/* TODO: Made toggable */}
      {/* https://headlessui.com/react/disclosure */}

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="h-fit">
              {open ? (
                <h1 className="text-6xl mb-8 underline">Gallery</h1>
              ) : (
                <h1 className="text-6xl mb-8">Gallery</h1>
              )}
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel static>
                <main className="overflow-visible grid grid-cols-2 gap-8">
                  <MotionImage
                    // delay={0.1}
                    src="https://i.ibb.co/vQmK2qX/chrome-zc-Fd-WLPGS8.png"
                  />
                  <MotionImage
                    // delay={0.3}
                    src="https://i.ibb.co/vs1LknZ/chrome-91-Mhvsv-SIU.png"
                  />
                  <MotionImage
                    // delay={0.5}
                    src="https://i.ibb.co/j5pYmQr/chrome-a-No0-Owk-J70.png"
                  />
                  <MotionImage
                    // delay={0.7}
                    src="https://i.ibb.co/WF0NCcS/chrome-3db-IAM3v4-H.png"
                  />
                  <MotionImage
                    // delay={0.9}
                    src="https://i.ibb.co/48PbSPp/chrome-jz-HSrz-E1-KB.png"
                  />
                </main>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </motion.article>
  );
};

export default Projects;
