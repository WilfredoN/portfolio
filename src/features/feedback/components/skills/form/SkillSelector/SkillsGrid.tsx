import type { Skill } from '@features/feedback/types/skill'

import { SkillBadge } from '@features/feedback/components/skills/badge/SkillBadge'

export interface SkillsGridProps {
  onSkillToggle: (id: number) => void
  selectedSkills: number[]
  skills: Skill[]
}

export const SkillsGrid = ({
  skills,
  selectedSkills,
  onSkillToggle
}: SkillsGridProps) => (
  <div className='flex h-full min-h-32 w-full flex-shrink flex-row flex-wrap justify-center gap-3'>
    {skills.map((skill) => (
      <SkillBadge
        key={skill.id}
        aria-pressed={selectedSkills.includes(skill.id)}
        isSelected={selectedSkills.includes(skill.id)}
        skill={skill}
        variant='selectable'
        onClick={() => onSkillToggle(skill.id)}
      />
    ))}
  </div>
)

export type { Skill }
