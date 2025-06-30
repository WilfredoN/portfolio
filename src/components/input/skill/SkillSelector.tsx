import { motion } from 'motion/react'
import { useState } from 'react'

import type { Skill } from './SkillsGrid'

import { useSkills } from '../../../hooks/useSkills'
import { SelectedSkills } from './SelectedSkills'
import { SkillsGrid } from './SkillsGrid'
import { SkillTabs } from './SkillTabs'

interface SkillSelectorProps {
  selectedSkills: number[]
  onSkillToggle: (skillId: number) => void
  error?: string
}

export const SkillSelector = ({
  selectedSkills,
  onSkillToggle,
  error
}: SkillSelectorProps) => {
  const { skills, loading, programmingSkills, technologySkills } = useSkills()
  const [activeTab, setActiveTab] = useState<'programming' | 'technologies'>(
    'programming'
  )

  const currentSkills: Skill[] =
    activeTab === 'programming' ? programmingSkills : technologySkills

  if (loading) {
    return (
      <div className='w-full'>
        <label className='block text-lg font-medium mb-2 text-current'>
          Skills & Technologies
        </label>
        <div className='animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg'></div>
      </div>
    )
  }

  return (
    <motion.div
      className='w-full'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className='block text-lg font-medium mb-2 text-current'>
        Skills & Technologies
      </label>
      <SkillTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <SkillsGrid
        skills={currentSkills}
        selectedSkills={selectedSkills}
        onSkillToggle={onSkillToggle}
      />
      {selectedSkills.length > 0 && (
        <SelectedSkills
          selectedSkills={selectedSkills}
          skills={skills}
          onSkillToggle={onSkillToggle}
        />
      )}
      {error && (
        <motion.p
          className='mt-2 text-sm text-red-500 dark:text-red-400'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}
