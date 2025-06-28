import { motion } from 'motion/react'
import { useState } from 'react'

import { useSkills } from '../../hooks/useSkills'
import { SkillBadge } from '../shared/SkillBadge'

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

  const currentSkills
		= activeTab === 'programming' ? programmingSkills : technologySkills

  if (loading) {
    return (
      <div className="w-full">
        <label className="block text-lg font-medium mb-2 text-current">
          Skills & Technologies
        </label>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg"></div>
      </div>
    )
  }

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-lg font-medium mb-2 text-current">
        Skills & Technologies
      </label>

      <div className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('programming')}
          className={`
						flex-1 rounded-md py-2 px-3 text-sm font-medium transition-all duration-200
						${
    activeTab === 'programming'
      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
    }
					`}
        >
          Programming Languages
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('technologies')}
          className={`
						flex-1 rounded-md py-2 px-3 text-sm font-medium transition-all duration-200
						${
    activeTab === 'technologies'
      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
    }
					`}
        >
          Technologies & Libraries
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {currentSkills.map(skill => (
          <SkillBadge
            key={skill.id}
            skill={skill}
            variant="selectable"
            isSelected={selectedSkills.includes(skill.id)}
            onClick={() => onSkillToggle(skill.id)}
          />
        ))}
      </div>

      {selectedSkills.length > 0 && (
        <motion.div
          className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Selected skills (
            {selectedSkills.length}
            ):
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skillId) => {
              const skill = skills.find(s => s.id === skillId)

              return skill
                ? (
                    <SkillBadge
                      key={skill.id}
                      skill={skill}
                      variant="compact"
                      showRemoveButton
                      onRemove={() => onSkillToggle(skill.id)}
                    />
                  )
                : null
            })}
          </div>
        </motion.div>
      )}

      {error && (
        <motion.p
          className="mt-2 text-sm text-red-500 dark:text-red-400"
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
