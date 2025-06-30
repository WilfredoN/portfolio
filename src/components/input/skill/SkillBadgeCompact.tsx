import clsx from 'clsx'

import type { Skill } from '../../../types/feedback'

import { getSkillIconName } from '../../../utils/feedback'
import { Icon } from '../../Icon/Icon'

interface SkillBadgeCompactProps {
  skill: Skill
}

export const SkillBadgeCompact = ({ skill }: SkillBadgeCompactProps) => (
  <div className={clsx('skill-badge skill-badge-compact')}>
    <Icon iconName={getSkillIconName(skill.name)} size='medium' />
    <span className='text-xs font-medium'>{skill.name}</span>
  </div>
)
