import type { Skill } from '@features/feedback/types/skill'

import { SkillBadgeCompact } from '@features/feedback/components/skills/badge/SkillBadge/variants/Compact'
import { SkillBadgeDefault } from '@features/feedback/components/skills/badge/SkillBadge/variants/Default'
import { SkillBadgeRemovable } from '@features/feedback/components/skills/badge/SkillBadge/variants/Removable'
import { SkillBadgeSelectable } from '@features/feedback/components/skills/badge/SkillBadge/variants/Selectable'

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
