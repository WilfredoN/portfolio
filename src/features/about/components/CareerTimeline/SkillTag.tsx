import type { SkillKey } from '@shared/constants/skills'

import { SKILL_DEFINITIONS } from '@shared/constants/skills'
import clsx from 'clsx'

interface SkillTagProps {
  isHovered: boolean
  skillKey: SkillKey
}

export const SkillTag = ({ skillKey, isHovered }: SkillTagProps) => {
  const skillDef = SKILL_DEFINITIONS[skillKey]
  const label = skillDef ? skillDef.name : skillKey

  return (
    <span
      className={clsx(
        'rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200',
        isHovered
          ? 'border-blue-500/50 bg-blue-500/20 text-blue-300'
          : 'border-zinc-800 bg-zinc-800/30 text-zinc-400'
      )}
    >
      #{label}
    </span>
  )
}
