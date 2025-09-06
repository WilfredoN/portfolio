import type { Skill } from '@features/feedback/types/skill'

import { getSkillIconName } from '@features/feedback/utils/getIconName'
import { Icon } from '@shared/components/Icon'
import clsx from 'clsx'

interface SkillBadgeDefaultProps {
  skill: Skill
}

export const SkillBadgeDefault = ({ skill }: SkillBadgeDefaultProps) => (
  <div
    className={clsx(
      'inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 font-medium text-[var(--color-text)] transition-all'
    )}
  >
    <Icon iconName={getSkillIconName(skill.name)} size='medium' />
    <span className='text-sm font-medium'>{skill.name}</span>
  </div>
)
