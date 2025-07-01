import type { Skill } from '@features/feedback/types/skill'

import { getSkillIconName } from '@features/feedback/utils/getIconName'
import { Icon } from '@shared/components/Icon'
import clsx from 'clsx'

interface SkillBadgeDefaultProps {
  skill: Skill
}

export const SkillBadgeDefault = ({ skill }: SkillBadgeDefaultProps) => (
  <div className={clsx('skill-badge skill-badge-default')}>
    <Icon iconName={getSkillIconName(skill.name)} size='medium' />
    <span className='text-sm font-medium'>{skill.name}</span>
  </div>
)
