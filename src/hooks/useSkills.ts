import { useCallback, useEffect, useState } from 'react'
import { fetchSkills } from '../api/feedback'
import { Skill } from '../types/feedback'
import { categorizeSkills, toggleSkill } from '../utils/feedback'

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
		setSelectedSkills(prev => toggleSkill(skillId, prev))
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
