import clsx from 'clsx'

import type { Skill } from '../../../types/feedback'

import { getSkillIconName } from '../../../utils/feedback'
import { Icon } from '../../Icon/Icon'

interface SkillBadgeDefaultProps {
  skill: Skill
}

export const SkillBadgeDefault = ({ skill }: SkillBadgeDefaultProps) => (
  <div className={clsx('skill-badge skill-badge-default')}>
    <Icon iconName={getSkillIconName(skill.name)} size='medium' />
    <span className='text-sm font-medium'>{skill.name}</span>
  </div>
)
