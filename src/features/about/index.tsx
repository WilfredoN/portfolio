import { CareerTimeline } from '@features/about/components/CareerTimeline'
import { Capybara } from '@features/about/components/image/Capybara'
import { Resume } from '@features/about/components/tooltips'
import { lines } from '@features/about/data/introduction'
import { SkillSection } from '@features/widgets'
import { Text } from '@shared/components/Text'
import clsx from 'clsx'

export const About = () => {
  return (
    <article className='z-5 mt-8 flex max-w-5xl flex-col items-center justify-start bg-(--color-bg) text-(--color-text)'>
      <div className='relative m-0 flex max-w-5xl flex-col items-center justify-center'>
        <div className='relative flex max-w-140 items-center justify-center'>
          <Resume />
          <div
            className={clsx(
              'relative flex items-center justify-center overflow-hidden rounded-full border-2 select-none',
              'xl:min-h-[560px] xl:w-full xl:min-w-[560px]',
              'transition-none'
            )}
            style={{ minWidth: 560, minHeight: 560, width: '100%' }}
          >
            <Capybara url='capybara_binary_compressed_v2.avif' />
          </div>
        </div>
        <Text className='mx-auto mt-6 max-w-4xl text-center text-2xl leading-relaxed opacity-85'>
          {lines.join(' ')}
        </Text>
      </div>

      <CareerTimeline />

      <div className='mt-8 w-full text-center'>
        <Text className='text-4xl font-bold'>My skills</Text>
        <SkillSection />
      </div>
    </article>
  )
}
