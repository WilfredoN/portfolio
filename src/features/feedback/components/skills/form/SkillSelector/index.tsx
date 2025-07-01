import { SelectedSkills } from '@features/feedback/components/skills/form/SkillSelector/SelectedSkills'
import SkillTabs from '@features/feedback/components/skills/form/SkillSelector/SkillTabs'
import { useSkills } from '@features/feedback/hooks/useSkills'
import { motion } from 'motion/react'
import { useState } from 'react'

import type { Skill } from './SkillsGrid'

import { SkillsGrid } from './SkillsGrid'

interface SkillSelectorProps {
  error?: string
  onSkillToggle: (skillId: number) => void
  selectedSkills: number[]
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
      animate={{ opacity: 1, y: 0 }}
      className='w-full flex flex-col gap-4'
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <label className='block text-lg font-medium mb-2 text-current'>
        Skills & Technologies
      </label>
      <SkillTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <SkillsGrid
        selectedSkills={selectedSkills}
        skills={currentSkills}
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
          animate={{ opacity: 1 }}
          className='mt-2 text-sm text-red-500 dark:text-red-400'
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}
