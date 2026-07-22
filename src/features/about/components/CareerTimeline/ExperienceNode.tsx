import type { ExperienceItem } from '@features/about/data/experience'

import clsx from 'clsx'

interface ExperienceNodeProps {
  experience: ExperienceItem
  isHovered: boolean
}

export const ExperienceNode = ({
  experience,
  isHovered
}: ExperienceNodeProps) => {
  const isPresent = experience.endDate === 'Present'

  return (
    <div className='relative flex flex-col items-center pt-2'>
      <div
        className={clsx(
          'z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-11 sm:w-11',
          isPresent
            ? 'border-emerald-500 bg-emerald-950/80 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            : isHovered
              ? 'border-blue-400 bg-blue-950/80 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
              : 'border-zinc-700 bg-zinc-900 text-zinc-400'
        )}
      >
        <div
          className={clsx(
            'h-3 w-3 rounded-full transition-all duration-300',
            isPresent
              ? 'animate-pulse bg-emerald-400'
              : isHovered
                ? 'bg-blue-400'
                : 'bg-zinc-600'
          )}
        />
      </div>
    </div>
  )
}
