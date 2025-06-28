import {
	programmingLanguages,
	technologiesAndLibraries
} from '../types/ListItems'

export interface FeedbackFormData {
	author: string
	company: string
	text: string
	skills: number[]
}

export interface FeedbackFormErrors {
	author?: string
	text?: string
	skills?: string
}

/**
 * Validates feedback form data
 */
export const validateFeedbackForm = (
	formData: FeedbackFormData
): FeedbackFormErrors => {
	const errors: FeedbackFormErrors = {}

	if (!formData.author.trim()) {
		errors.author = 'Author name is required'
	}

	if (!formData.text.trim()) {
		errors.text = 'Feedback text is required'
	} else if (formData.text.trim().length < 10) {
		errors.text = 'Feedback must be at least 10 characters long'
	}

	return errors
}

/**
 * Formats a date string to a human-readable format
 */
export const formatFeedbackDate = (dateString: string): string => {
	const date = new Date(dateString)
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}

/**
 * Gets the icon name for a skill
 */
export const getSkillIconName = (skillName: string): string => {
	const allSkills = [...programmingLanguages, ...technologiesAndLibraries]
	const skill = allSkills.find(skill => skill.text === skillName)
	return skill?.icon || 'default'
}

/**
 * Categorizes skills into programming languages and technologies
 */
export const categorizeSkills = (skills: { id: number; name: string }[]) => {
	const programmingSkills = skills.filter(skill =>
		programmingLanguages.some(lang => lang.text === skill.name)
	)

	const technologySkills = skills.filter(skill =>
		technologiesAndLibraries.some(tech => tech.text === skill.name)
	)

	return { programmingSkills, technologySkills }
}

/**
 * Toggles a skill in the selected skills array
 */
export const toggleSkill = (
	skillId: number,
	selectedSkills: number[]
): number[] => {
	return selectedSkills.includes(skillId)
		? selectedSkills.filter(id => id !== skillId)
		: [...selectedSkills, skillId]
}

/**
 * Prepares form data for submission
 */
export const prepareFeedbackData = (formData: FeedbackFormData) => ({
	author: formData.author.trim(),
	company: formData.company.trim() || undefined,
	text: formData.text.trim(),
	skills: formData.skills
})
