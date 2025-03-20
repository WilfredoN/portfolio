import { useEffect, useState } from 'react'
import { SkillDTO } from '../api/fetchData'
import {
	getSkills,
	getSkillsByCategory,
	getSkillsByKey
} from '../utils/skillsService'

export const useSkills = () => {
	const [skills, setSkills] = useState<SkillDTO[]>([])
	const [skillsMap, setSkillsMap] = useState<Record<string, SkillDTO>>({})
	const [categoryMap, setCategoryMap] = useState<Record<string, SkillDTO[]>>({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const loadData = async () => {
			try {
				const [allSkills, byKey, byCategory] = await Promise.all([
					getSkills(),
					getSkillsByKey(),
					getSkillsByCategory()
				])

				setSkills(allSkills)
				setSkillsMap(byKey)
				setCategoryMap(byCategory)
			} catch (err) {
				console.error('Error fetching skills:', err)
				setError(
					err instanceof Error ? err : new Error('Failed to fetch skills')
				)
			} finally {
				setLoading(false)
			}
		}

		loadData()
	}, [])

	return { skills, skillsMap, categorizedSkills: categoryMap, loading, error }
}
