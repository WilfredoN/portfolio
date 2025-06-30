import { motion } from 'motion/react'

import type { Skill } from '../../../types/feedback'

import { SkillBadge } from '../../shared/SkillBadge'

export interface SelectedSkillsProps {
  selectedSkills: number[]
  skills: Skill[]
  onSkillToggle: (id: number) => void
}

export const SelectedSkills = ({
  selectedSkills,
  skills,
  onSkillToggle
}: SelectedSkillsProps) => {
  const skillById = new Map(skills.map((s) => [s.id, s]))

  return (
    <motion.div
      className='selected-skills-container'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className='selected-skills-label'>
        Selected skills ({selectedSkills.length}
        ):
      </p>
      <div className='selected-skills-list'>
        {selectedSkills.map((skillId) => {
          const skill = skillById.get(skillId)

          return skill ? (
            <SkillBadge
              key={skill.id}
              skill={skill}
              variant='compact'
              showRemoveButton
              onRemove={() => onSkillToggle(skill.id)}
            />
          ) : null
        })}
      </div>
    </motion.div>
  )
}
