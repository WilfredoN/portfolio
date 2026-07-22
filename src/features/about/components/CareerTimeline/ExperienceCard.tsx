import type { ExperienceItem } from '@features/about/data/experience'

import clsx from 'clsx'

import { SkillTag } from './SkillTag'

interface ExperienceCardProps {
  experience: ExperienceItem
  isHovered: boolean
}

export const ExperienceCard = ({
  experience,
  isHovered
}: ExperienceCardProps) => {
  const isPresent = experience.endDate === 'Present'

  return (
    <div
      className={clsx(
        'flex-1 rounded-xl border p-5 transition-all duration-300 sm:p-6',
        isHovered
          ? 'translate-x-1 border-blue-500/60 bg-zinc-900/90 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700'
      )}
    >
      <div className='flex flex-wrap items-start justify-between gap-3 text-left'>
        <div className='flex items-center gap-3.5 text-left'>
          {experience.companyLogoUrl && (
            <div className='flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-700/60 bg-zinc-800/80 p-1 shadow-sm'>
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
            <div className='flex items-center gap-3'>
              <h3 className='text-2xl font-bold text-(--color-text)'>
                {experience.role}
              </h3>
              {isPresent && (
                <span className='rounded-full border border-emerald-500/50 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold tracking-wider text-emerald-400 uppercase'>
                  Current
                </span>
              )}
            </div>
            <p className='text-lg font-semibold text-blue-400'>
              {experience.company}
            </p>
            <p className='text-sm font-medium text-zinc-400'>
              {experience.displayPeriod}
            </p>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-2 text-sm'>
          <span className='rounded-md border border-zinc-700/50 bg-zinc-800/40 px-2.5 py-1 text-zinc-300'>
            {experience.employmentType}
          </span>
          <span className='rounded-md border border-zinc-700/50 bg-zinc-800/40 px-2.5 py-1 text-zinc-300'>
            {experience.locationType}
          </span>
        </div>
      </div>

      <ul className='mt-4 flex flex-col gap-2.5 border-t border-zinc-800/60 pt-4 text-left text-base leading-relaxed text-zinc-300'>
        {experience.bullets.map((bullet, idx) => (
          <li
            key={idx}
            className='flex items-start justify-start gap-2.5 text-left'
          >
            <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400' />
            <span className='text-left'>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className='mt-4 flex flex-wrap gap-2 pt-2'>
        {experience.skillsUsed.map((skillKey) => (
          <SkillTag key={skillKey} isHovered={isHovered} skillKey={skillKey} />
        ))}
      </div>
    </div>
  )
}
