import type { Skill } from '@features/feedback/types/skill'

import { SkillBadgeCompact } from '@features/feedback/components/skills/badge/SkillBadge/variants/Compact'
import { SkillBadgeDefault } from '@features/feedback/components/skills/badge/SkillBadge/variants/Default'
import { SkillBadgeRemovable } from '@features/feedback/components/skills/badge/SkillBadge/variants/Removable'
import { SkillBadgeSelectable } from '@features/feedback/components/skills/badge/SkillBadge/variants/Selectable'

interface SkillBadgeProps {
  isSelected?: boolean
  onClick?: () => void
  onRemove?: () => void
  showRemoveButton?: boolean
  skill: Skill
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
        isSelected={isSelected}
        skill={skill}
        onClick={onClick}
      />
    )
  }

  if (showRemoveButton && onRemove) {
    return <SkillBadgeRemovable skill={skill} onRemove={onRemove} />
  }

  return <SkillBadgeDefault skill={skill} />
}
