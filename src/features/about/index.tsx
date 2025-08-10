import { Capybara } from '@features/about/components/image/Capybara'
import { Resume } from '@features/about/components/tooltips'
import { lines } from '@features/about/data/introduction'
import { SkillSection } from '@features/widgets'
import { MultiLine, Text } from '@shared/components/Text'
// import { useIsMobile } from '@shared/hooks/isMobile'
import clsx from 'clsx'
import { motion } from 'motion/react'

export const About = () => {
  // const isMobile = useIsMobile()

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
              'relative flex items-center justify-center overflow-hidden rounded-full border-2 select-none',
              'xl:min-h-[560px] xl:w-full xl:min-w-[560px]'
            )}
          >
            <Capybara url='assets/capybara_binary_compressed.avif' />
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
