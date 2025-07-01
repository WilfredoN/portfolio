import type { Skill } from '@features/feedback/types/skill'

import { SkillBadge } from '@features/feedback/components/skills/badge/SkillBadge'

export interface SkillsGridProps {
  skills: Skill[]
  selectedSkills: number[]
  onSkillToggle: (id: number) => void
}

export const SkillsGrid = ({
  skills,
  selectedSkills,
  onSkillToggle
}: SkillsGridProps) => (
  <div className='flex flex-row flex-wrap flex-shrink justify-center gap-3 min-h-32 w-full h-full'>
    {skills.map((skill) => (
      <SkillBadge
        key={skill.id}
        skill={skill}
        variant='selectable'
        isSelected={selectedSkills.includes(skill.id)}
        onClick={() => onSkillToggle(skill.id)}
        aria-pressed={selectedSkills.includes(skill.id)}
      />
    ))}
  </div>
)

export type { Skill }
