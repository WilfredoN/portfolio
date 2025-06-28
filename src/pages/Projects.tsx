import { motion } from 'motion/react'

import { ProjectDescription } from '../components/ProjectDescription'

export const Projects = () => {
  return (
    <motion.article
      className="mt-8 max-w-screen-2xl text-left flex flex-col items-center justify-center"
      initial="initial"
      animate="final"
    >
      <ProjectDescription />
    </motion.article>
  )
}
