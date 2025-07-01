import type { Skill } from '@features/feedback/types/skill'

import { SkillBadge } from '@features/feedback/components/skills/badge/SkillBadge'
import { motion } from 'motion/react'

export interface SelectedSkillsProps {
  onSkillToggle: (id: number) => void
  selectedSkills: number[]
  skills: Skill[]
}

export const SelectedSkills = ({
  selectedSkills,
  skills,
  onSkillToggle
}: SelectedSkillsProps) => {
  const skillById = new Map(skills.map((s) => [s.id, s]))

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className='selected-skills-container'
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <p className='text-xl'>
        Selected skills ({selectedSkills.length}
        ):
      </p>
      <div className='flex flex-row flex-wrap gap-2'>
        {selectedSkills.map((skillId) => {
          const skill = skillById.get(skillId)

          return skill ? (
            <SkillBadge
              key={skill.id}
              showRemoveButton
              skill={skill}
              variant='compact'
              onRemove={() => onSkillToggle(skill.id)}
            />
          ) : null
        })}
      </div>
    </motion.div>
  )
}
