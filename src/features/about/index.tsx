import { Capybara } from '@features/about/components/image/Capybara'
import { Resume } from '@features/about/components/tooltips'
import { lines } from '@features/about/data/introduction'
import { SkillSection } from '@features/widgets'
import { MultiLine, Text } from '@shared/components/Text'
// import { useIsMobile } from '@shared/hooks/isMobile'
import clsx from 'clsx'

export const About = () => {
  // const isMobile = useIsMobile()

  return (
    <article className='z-5 mt-8 flex max-w-screen-2xl flex-col items-center justify-center bg-(--color-bg) text-(--color-text)'>
      <div className='relative m-0 flex max-w-screen-2xl flex-col items-center justify-center'>
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
        <MultiLine
          lines={lines}
          textStyles='text-3xl min-w-[55%] m-0 p-2 text-center leading-10'
        />
      </div>
      <div>
        <Text className='text-4xl'>My skills</Text>
        <SkillSection />
      </div>
    </article>
  )
}
