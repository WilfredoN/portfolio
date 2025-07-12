import { ProjectList } from '@features/projects/components/ProjectList'
import { Text } from '@shared/components/Text'
import { motion } from 'motion/react'

export const Projects = () => {
  return (
    <motion.article
      animate='final'
      className='mt-8 flex max-w-screen-2xl flex-col flex-wrap items-center justify-center gap-8 p-4 text-left'
      initial='initial'
    >
      <ProjectList />
      <Text className='text-center text-4xl font-bold'>
        More projects coming soon...
      </Text>
    </motion.article>
  )
}
