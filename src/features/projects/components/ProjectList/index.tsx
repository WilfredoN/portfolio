import { Card } from '@features/projects/components/Card'
import { projects } from '@features/projects/data/projects'
import { motion } from 'motion/react'

export const ProjectList = () => {
  return (
    <motion.section className='flex w-full flex-row flex-wrap items-center justify-center gap-8 p-4'>
      {projects.map((project) => (
        <Card key={project.title} {...project} />
      ))}
    </motion.section>
  )
}
