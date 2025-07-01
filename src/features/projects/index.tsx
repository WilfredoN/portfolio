import { ProjectList } from '@features/projects/components/ProjectList'
import { Text } from '@shared/components/Text'
import { motion } from 'motion/react'

export const Projects = () => {
  return (
    <motion.article
      className='mt-8 p-4 max-w-screen-2xl text-left flex flex-col gap-8 flex-wrap items-center justify-center'
      initial='initial'
      animate='final'
    >
      <ProjectList />
      <Text className='text-4xl font-bold text-center'>
        More projects coming soon...
      </Text>
    </motion.article>
  )
}
