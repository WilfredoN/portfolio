import type { ProjectProps } from '@features/projects/data/projects'

import { Card } from '@features/projects/components/Card'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'

interface ProjectListProps {
  projects: ProjectProps[]
  selectedTags: string[]
}

export const ProjectList = ({ projects, selectedTags }: ProjectListProps) => {
  return (
    <motion.section className='flex min-h-[400px] w-full flex-row flex-wrap items-center justify-center gap-8 p-4'>
      <AnimatePresence mode='popLayout'>
        {projects.map((project) => (
          <motion.div
            key={project.title}
            layout
            animate={{ opacity: 1, scale: 1 }}
            className={clsx('flex w-full', {
              'max-w-full': project.scale === 'large',
              'md:max-w-[calc(50%-1rem)]': project.scale !== 'large'
            })}
            exit={{ opacity: 0, scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <Card {...project} selectedTags={selectedTags} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.section>
  )
}
