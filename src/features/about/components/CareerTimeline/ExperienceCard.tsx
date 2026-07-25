import type { ExperienceItem } from '@features/about/data/experience'

import { useTheme } from '@app/hooks/useTheme'
import clsx from 'clsx'

import { SkillTag } from './SkillTag'

interface ExperienceCardProps {
  experience: ExperienceItem
  isHovered: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const ExperienceCard = ({
  experience,
  isHovered,
  onMouseEnter,
  onMouseLeave
}: ExperienceCardProps) => {
  const { isDarkTheme } = useTheme()
  const isPresent = experience.endDate === 'Present'

  return (
    <div
      className={clsx(
        'flex-1 min-w-0 max-w-full overflow-hidden rounded-xl border p-4 transition-all duration-300 sm:p-6',
        isDarkTheme
          ? isHovered
            ? 'translate-x-1 border-blue-500/80 bg-zinc-900 shadow-[0_6px_24px_rgba(0,0,0,0.4)]'
            : 'border-zinc-800 bg-zinc-900/90 hover:border-zinc-700'
          : isHovered
            ? 'translate-x-1 border-blue-500 bg-white/95 shadow-[0_8px_25px_rgba(0,86,179,0.15)]'
            : 'border-blue-200/80 bg-white/80 shadow-sm hover:border-blue-300'
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className='flex flex-wrap items-start justify-between gap-3 text-left'>
        <div className='flex flex-wrap items-center gap-3 text-left sm:flex-nowrap sm:gap-3.5'>
          {experience.companyLogoUrl && (
            <div
              className={clsx(
                'flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border p-1 shadow-sm sm:h-16 sm:w-16',
                isDarkTheme
                  ? 'border-zinc-700 bg-zinc-800'
                  : 'border-blue-200 bg-white'
              )}
            >
              <img
                alt={`${experience.company} logo`}
                className='h-full w-full rounded-md object-cover'
                src={experience.companyLogoUrl}
                onError={(e) => {
                  ;(e.target as HTMLElement).parentElement?.classList.add(
                    'hidden'
                  )
                }}
              />
            </div>
          )}
          <div className='flex flex-col items-start gap-1 text-left'>
            <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
              <h3
                className={clsx(
                  'text-xl font-bold sm:text-2xl',
                  isDarkTheme ? 'text-white' : 'text-zinc-900'
                )}
              >
                {experience.role}
              </h3>
              {isPresent && (
                <span
                  className={clsx(
                    'rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase sm:px-2.5 sm:text-xs',
                    isDarkTheme
                      ? 'border-emerald-500/60 bg-emerald-500/20 text-emerald-300'
                      : 'border-emerald-600 bg-emerald-50 text-emerald-700'
                  )}
                >
                  Current
                </span>
              )}
            </div>
            <p
              className={clsx(
                'text-base font-semibold sm:text-lg',
                isDarkTheme ? 'text-blue-400' : 'text-blue-600'
              )}
            >
              {experience.company}
            </p>
            <p
              className={clsx(
                'text-xs font-medium transition-colors duration-200 sm:text-sm',
                isDarkTheme
                  ? isHovered
                    ? 'text-zinc-200'
                    : 'text-zinc-300'
                  : 'text-zinc-600'
              )}
            >
              {experience.displayPeriod}
            </p>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-1.5 text-xs sm:gap-2 sm:text-sm'>
          <span
            className={clsx(
              'rounded-md border px-2 py-0.5 font-medium sm:px-2.5 sm:py-1',
              isDarkTheme
                ? 'border-zinc-700 bg-zinc-800 text-white'
                : 'border-blue-200 bg-blue-50/80 text-blue-900'
            )}
          >
            {experience.employmentType}
          </span>
          <span
            className={clsx(
              'rounded-md border px-2 py-0.5 font-medium sm:px-2.5 sm:py-1',
              isDarkTheme
                ? 'border-zinc-700 bg-zinc-800 text-white'
                : 'border-blue-200 bg-blue-50/80 text-blue-900'
            )}
          >
            {experience.locationType}
          </span>
        </div>
      </div>

      <ul
        className={clsx(
          'mt-4 flex flex-col gap-2 border-t pt-4 text-left text-sm leading-relaxed transition-colors duration-200 sm:gap-2.5 sm:text-base',
          isDarkTheme
            ? isHovered
              ? 'border-zinc-800 text-white'
              : 'border-zinc-800 text-zinc-200'
            : 'border-blue-100 text-zinc-800'
        )}
      >
        {experience.bullets.map((bullet, idx) => (
          <li
            key={idx}
            className='flex items-start justify-start gap-2 text-left sm:gap-2.5'
          >
            <span
              className={clsx(
                'mt-2 h-1.5 w-1.5 shrink-0 rounded-full',
                isDarkTheme ? 'bg-blue-400' : 'bg-blue-600'
              )}
            />
            <span className='text-left'>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className='mt-4 flex flex-wrap gap-1.5 pt-2 sm:gap-2'>
        {experience.skillsUsed.map((skillKey) => (
          <SkillTag key={skillKey} isHovered={isHovered} skillKey={skillKey} />
        ))}
      </div>
    </div>
  )
}
