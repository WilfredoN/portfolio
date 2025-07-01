import { Card } from '@features/projects/components/Card'
import { projects } from '@features/projects/data/projects'
import { motion } from 'motion/react'

export const ProjectList = () => {
  return (
    <motion.section className='flex flex-row gap-8 flex-wrap items-center justify-center p-4 w-full'>
      {projects.map((project) => (
        <Card key={project.title} {...project} />
      ))}
    </motion.section>
  )
}
