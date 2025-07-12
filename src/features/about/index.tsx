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
      className='mt-8 flex max-w-screen-2xl flex-col items-center justify-center'
      exit='exit'
      initial='initial'
    >
      <div className='relative m-0 flex max-w-screen-2xl flex-col items-center justify-center'>
        <div className='relative flex max-w-[35rem] items-center justify-center'>
          <Resume />
          <div
            className={clsx(
              'relative flex select-none items-center justify-center overflow-hidden rounded-full border-2',
              'min-h-[560px] min-w-[560px] sm:w-1/2 xl:w-full'
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
