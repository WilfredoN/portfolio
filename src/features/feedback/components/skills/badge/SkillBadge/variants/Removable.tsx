import type { Skill } from '@features/feedback/types/skill'

import { getSkillIconName } from '@features/feedback/utils/getIconName'
import { Icon } from '@shared/components/Icon'
import clsx from 'clsx'

interface SkillBadgeRemovableProps {
  onRemove: () => void
  skill: Skill
}

export const SkillBadgeRemovable = ({
  skill,
  onRemove
}: SkillBadgeRemovableProps) => (
  <div className={clsx('skill-badge skill-badge-default')}>
    <Icon iconName={getSkillIconName(skill.name)} size='medium' />
    <span className='text-sm font-medium'>{skill.name}</span>
    <button
      className='skill-badge-remove ml-1'
      type='button'
      onClick={(e) => {
        e.stopPropagation()
        onRemove()
      }}
    >
      ×
    </button>
  </div>
)
