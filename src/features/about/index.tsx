import { CareerTimeline } from '@features/about/components/CareerTimeline'
import { Capybara } from '@features/about/components/image/Capybara'
import { Resume } from '@features/about/components/tooltips'
import { lines } from '@features/about/data/introduction'
import { SkillSection } from '@features/widgets'
import { Text } from '@shared/components/Text'
import clsx from 'clsx'

export const About = () => {
  return (
    <article className='z-5 mt-4 flex w-full max-w-5xl flex-col items-center justify-start overflow-hidden px-4 text-(--color-text) sm:mt-8 sm:px-6'>
      <div className='relative m-0 flex w-full max-w-5xl flex-col items-center justify-center'>
        <div className='relative flex w-full max-w-140 items-center justify-center'>
          <Resume />
          <div
            className={clsx(
              'relative flex aspect-square w-full max-w-140 items-center justify-center overflow-hidden rounded-full border-2 select-none',
              'transition-none'
            )}
          >
            <Capybara url='capybara_binary_compressed_v2.avif' />
          </div>
        </div>
        <Text className='mx-auto mt-6 max-w-4xl text-center text-lg leading-relaxed opacity-85 sm:text-xl md:text-2xl'>
          {lines.join(' ')}
        </Text>
      </div>

      <CareerTimeline />

      <div className='mt-8 w-full max-w-full overflow-hidden text-center'>
        <Text className='text-3xl font-bold sm:text-4xl'>My skills</Text>
        <SkillSection />
      </div>
    </article>
  )
}
