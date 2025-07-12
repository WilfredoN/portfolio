import { Capybara } from '@features/about/components/image/Capybara'
import { Resume } from '@features/about/components/tooltips'
import { lines } from '@features/about/data/introduction'
import { SkillSection } from '@features/widgets'
import { MultiLine, Text } from '@shared/components/Text'
import clsx from 'clsx'
import { motion } from 'motion/react'

export const About = () => {
  return (
    <motion.article
      animate='final'
      className='mt-8 max-w-screen-2xl flex items-center justify-center flex-col'
      exit='exit'
      initial='initial'
    >
      <div className='flex m-0 flex-col items-center justify-center max-w-screen-2xl relative'>
        <div className='flex items-center justify-center max-w-[35rem] relative'>
          <Resume />
          <div
            className={clsx(
              'flex items-center justify-center select-none overflow-hidden border-2 rounded-full relative',
              'min-w-[560px] min-h-[560px] xl:w-full sm:w-1/2'
            )}
          >
            <Capybara />
          </div>
        </div>
        <MultiLine
          lines={lines}
          textStyles='text-3xl min-w-[55%] m-0 p-2 text-center leading-10'
        />
      </div>
      <Text className='text-4xl'>My skills</Text>
      <SkillSection />
    </motion.article>
  )
}
