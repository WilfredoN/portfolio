import { fetchSkills, SkillDTO } from '../api/fetchData'

let cachedSkills: SkillDTO[] | null = null
let skillsLoading = false
let skillsError: Error | null = null

let skillsByKey: Record<string, SkillDTO> = {}
let skillsByCategory: Record<string, SkillDTO[]> = {}

export const getSkills = async (): Promise<SkillDTO[]> => {
	if (cachedSkills) {
		return cachedSkills
	}

	if (skillsLoading) {
		return new Promise((resolve, reject) => {
			const checkCache = setInterval(() => {
				if (cachedSkills) {
					clearInterval(checkCache)
					resolve(cachedSkills)
				}
				if (skillsError) {
					clearInterval(checkCache)
					reject(skillsError)
				}
			}, 100)
		})
	}

	try {
		skillsLoading = true
		const skills = await fetchSkills()
		cachedSkills = skills

		skillsByKey = skills.reduce(
			(acc, skill) => {
				acc[skill.image_key] = skill
				return acc
			},
			{} as Record<string, SkillDTO>
		)

		skillsByCategory = skills.reduce(
			(acc, skill) => {
				const category = skill.category.toLowerCase()
				if (!acc[category]) {
					acc[category] = []
				}
				acc[category].push(skill)
				return acc
			},
			{} as Record<string, SkillDTO[]>
		)

		return skills
	} catch (error) {
		skillsError =
			error instanceof Error ? error : new Error('Failed to fetch skills')
		throw skillsError
	} finally {
		skillsLoading = false
	}
}

export const getSkillsByKey = async (): Promise<Record<string, SkillDTO>> => {
	if (Object.keys(skillsByKey).length === 0) {
		await getSkills()
	}
	return skillsByKey
}

export const getSkillsByCategory = async (): Promise<
	Record<string, SkillDTO[]>
> => {
	if (Object.keys(skillsByCategory).length === 0) {
		await getSkills()
	}
	return skillsByCategory
}

export const clearSkillsCache = () => {
	cachedSkills = null
	skillsLoading = false
	skillsError = null
	skillsByKey = {}
	skillsByCategory = {}
}
