import type { Skill } from '../../../types/feedback'

import { SkillBadge } from '../../shared/SkillBadge'

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
  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 min-h-32'>
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
