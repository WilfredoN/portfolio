import type { Skill } from '@features/feedback/types/skill'

import { getSkillIconName } from '@features/feedback/utils/getIconName'
import { Icon } from '@shared/components/Icon'
import clsx from 'clsx'

interface SkillBadgeSelectableProps {
  isSelected?: boolean
  onClick?: () => void
  skill: Skill
}

export const SkillBadgeSelectable = ({
  skill,
  isSelected = false,
  onClick
}: SkillBadgeSelectableProps) => (
  <button
    className={clsx(
      'inline-flex min-w-max items-center gap-2 rounded-lg border px-3 py-1.5 font-medium transition-all',
      isSelected
        ? 'border-2 border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
        : 'border-[1.5px] border-[var(--color-border)] bg-[var(--color-nav)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white focus-visible:bg-[var(--color-accent)] focus-visible:text-white'
    )}
    type='button'
    onClick={onClick}
  >
    <Icon iconName={getSkillIconName(skill.name)} size='medium' />
    <span className='text-sm font-medium'>{skill.name}</span>
    {isSelected && (
      <svg className='ml-auto h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
        <path
          clipRule='evenodd'
          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
          fillRule='evenodd'
        />
      </svg>
    )}
  </button>
)
