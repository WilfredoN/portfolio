import type { ExperienceItem } from '@features/about/data/experience'

import { useTheme } from '@app/hooks/useTheme'
import clsx from 'clsx'

interface ExperienceNodeProps {
  experience: ExperienceItem
  isHovered: boolean
}

export const ExperienceNode = ({
  experience,
  isHovered
}: ExperienceNodeProps) => {
  const { isDarkTheme } = useTheme()
  const isPresent = experience.endDate === 'Present'

  return (
    <div className='relative flex flex-col items-center pt-2'>
      <div
        className={clsx(
          'z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-11 sm:w-11',
          isDarkTheme
            ? isPresent
              ? 'border-emerald-500 bg-emerald-950 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : isHovered
                ? 'border-blue-400 bg-blue-950 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'border-zinc-700 bg-zinc-900 text-zinc-400'
            : isPresent
              ? 'border-emerald-600 bg-white text-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
              : isHovered
                ? 'border-blue-600 bg-white text-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.25)]'
                : 'border-blue-300 bg-white text-zinc-600'
        )}
      >
        <div
          className={clsx(
            'h-3 w-3 rounded-full transition-all duration-300',
            isPresent
              ? 'animate-pulse bg-emerald-500'
              : isHovered
                ? 'bg-blue-600'
                : isDarkTheme
                  ? 'bg-zinc-600'
                  : 'bg-blue-400'
          )}
        />
      </div>
    </div>
  )
}
