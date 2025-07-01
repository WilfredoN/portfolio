import type { Skill } from '@features/feedback/types/skill'

import { getSkillIconName } from '@features/feedback/utils/getIconName'
import { Icon } from '@shared/components/Icon'
import clsx from 'clsx'

interface SkillBadgeCompactProps {
  skill: Skill
}

export const SkillBadgeCompact = ({ skill }: SkillBadgeCompactProps) => (
  <div className={clsx('skill-badge skill-badge-compact')}>
    <Icon iconName={getSkillIconName(skill.name)} size='medium' />
    <span className='text-xs font-medium'>{skill.name}</span>
  </div>
)
