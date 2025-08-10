import type { Skill } from '@features/feedback/types/skill'

import { fetchSkills } from '@features/api/skills'
import { categorizeSkills } from '@features/feedback/utils/categorizeSkills'
import { toggleSkill } from '@features/feedback/utils/toggleSkill'
import { useCallback, useEffect, useState } from 'react'

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const fetchedSkills = await fetchSkills()
        setSkills(fetchedSkills)
      } catch (error) {
        console.error('Failed to load skills:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSkills()
  }, [])

  const categorizedSkills = categorizeSkills(skills)

  return {
    skills,
    loading,
    ...categorizedSkills
  }
}

export const useSkillSelection = (initialSkills: number[] = []) => {
  const [selectedSkills, setSelectedSkills] = useState<number[]>(initialSkills)

  const handleToggle = useCallback((skillId: number) => {
    setSelectedSkills((prev) => toggleSkill(skillId, prev))
  }, [])

  const resetSelection = useCallback(() => {
    setSelectedSkills([])
  }, [])

  const setSelection = useCallback((skills: number[]) => {
    setSelectedSkills(skills)
  }, [])

  return {
    selectedSkills,
    handleToggle,
    resetSelection,
    setSelection
  }
}
