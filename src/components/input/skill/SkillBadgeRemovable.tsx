import clsx from 'clsx'

import type { Skill } from '../../../types/feedback'

import { getSkillIconName } from '../../../utils/feedback'
import { Icon } from '../../Icon/Icon'

interface SkillBadgeRemovableProps {
  skill: Skill
  onRemove: () => void
}

export const SkillBadgeRemovable = ({
  skill,
  onRemove
}: SkillBadgeRemovableProps) => (
  <div className={clsx('skill-badge skill-badge-default')}>
    <Icon iconName={getSkillIconName(skill.name)} size='medium' />
    <span className='text-sm font-medium'>{skill.name}</span>
    <button
      type='button'
      onClick={(e) => {
        e.stopPropagation()
        onRemove()
      }}
      className='ml-1 skill-badge-remove'
    >
      ×
    </button>
  </div>
)
