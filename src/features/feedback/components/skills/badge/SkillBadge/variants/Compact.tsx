import type { Skill } from '@features/feedback/types/skill'

import { getSkillIconName } from '@features/feedback/utils/getIconName'
import { Icon } from '@shared/components/Icon'
import clsx from 'clsx'

interface SkillBadgeCompactProps {
  skill: Skill
}

export const SkillBadgeCompact = ({ skill }: SkillBadgeCompactProps) => (
  <div
    className={clsx(
      'inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1 text-xs font-medium text-[var(--color-text)] transition-all'
    )}
  >
    <Icon iconName={getSkillIconName(skill.name)} size='medium' />
    <span className='text-xs font-medium'>{skill.name}</span>
  </div>
)
