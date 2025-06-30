import type { Skill } from '../../../types/feedback'

import { SkillBadgeCompact } from './SkillBadgeCompact'
import { SkillBadgeDefault } from './SkillBadgeDefault'
import { SkillBadgeRemovable } from './SkillBadgeRemovable'
import { SkillBadgeSelectable } from './SkillBadgeSelectable'

export {
  SkillBadgeCompact,
  SkillBadgeDefault,
  SkillBadgeRemovable,
  SkillBadgeSelectable
}

interface SkillBadgeProps {
  skill: Skill
  isSelected?: boolean
  showRemoveButton?: boolean
  onClick?: () => void
  onRemove?: () => void
  variant?: 'default' | 'compact' | 'selectable'
}

export const SkillBadge = ({
  skill,
  isSelected = false,
  showRemoveButton = false,
  onClick,
  onRemove,
  variant = 'default'
}: SkillBadgeProps) => {
  if (variant === 'compact') {
    return <SkillBadgeCompact skill={skill} />
  }

  if (variant === 'selectable') {
    return (
      <SkillBadgeSelectable
        skill={skill}
        isSelected={isSelected}
        onClick={onClick}
      />
    )
  }

  if (showRemoveButton && onRemove) {
    return <SkillBadgeRemovable skill={skill} onRemove={onRemove} />
  }

  return <SkillBadgeDefault skill={skill} />
}
