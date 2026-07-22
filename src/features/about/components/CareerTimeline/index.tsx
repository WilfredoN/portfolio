import { EXPERIENCES } from '@features/about/data/experience'

import { ExperienceItemRow } from './ExperienceItemRow'
import { TimelineLine } from './TimelineLine'

export const CareerTimeline = () => {
  return (
    <section className='relative my-10 flex w-full flex-col items-center select-none'>
      <div className='mb-8 text-center'>
        <h2 className='text-4xl font-bold text-(--color-text)'>
          Career Journey
        </h2>
        <p className='mt-2 text-lg text-zinc-400'>
          Interactive timeline of professional roles and software engineering
          experience
        </p>
      </div>

      <div className='relative flex w-full max-w-4xl flex-col gap-8 px-4'>
        <TimelineLine />
        {EXPERIENCES.map((exp, index) => (
          <ExperienceItemRow key={exp.id} experience={exp} index={index} />
        ))}
      </div>
    </section>
  )
}
