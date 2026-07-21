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
        {projects.length === 0 ? (
          <motion.div
            key='empty-state'
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className='flex flex-col items-center justify-center gap-4 text-center p-8'
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25 }}
          >
            <span className='text-6xl select-none filter drop-shadow-md animate-bounce'>
              🔍
            </span>
            <div className='flex flex-col gap-2'>
              <h3 className='text-2xl font-bold text-zinc-300'>
                No projects found
              </h3>
              <p className='text-zinc-500 text-lg max-w-md font-medium'>
                {selectedTags.length > 0
                  ? 'Try clearing the tag filters or selecting different categories.'
                  : 'Select one or more categories above to display the projects.'}
              </p>
            </div>
          </motion.div>
        ) : (
          projects.map((project) => (
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
          ))
        )}
      </AnimatePresence>
    </motion.section>
  )
}
