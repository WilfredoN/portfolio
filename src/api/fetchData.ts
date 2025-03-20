import { supabase } from '../utils/supabase'

export type Scale = 'small' | 'medium' | 'large'

export interface ProjectDTO {
	id: number
	title: string
	image_title?: string
	description: string
	technologies: string[]
	link?: string
	block_scale?: Scale
	image_url?: string
	image_style?: string
	created_at?: string
}

export interface SkillDTO {
	id: number
	name: string
	category: string
	image_key: string
}

export interface FeedbackDTO {
	id: number
	author_name: string
	created_at: string
	text: string
	skills: SkillDTO[]
}

export const fetchProjects = async (): Promise<ProjectDTO[]> => {
	const { data, error } = await supabase.from('projects').select(`
            id,
            title,
            image_title,
            description,
            technologies,
            link,
            block_scale,
            image_url,
            image_style,
            created_at,
            project_skills (
                skill_id
            )
        `)

	if (error) {
		throw error
	}

	const skillsData = await fetchSkills()

	const skillsMap = skillsData.reduce(
		(acc, skill) => {
			acc[skill.id] = skill
			return acc
		},
		{} as Record<number, SkillDTO>
	)

	return data.map(project => ({
		id: project.id,
		title: project.title,
		image_title: project.image_title ?? undefined,
		description: project.description,
		link: project.link ?? undefined,
		block_scale: project.block_scale ?? undefined,
		image_url: project.image_url ?? undefined,
		image_style: project.image_style ?? undefined,
		created_at: project.created_at,
		technologies: project.project_skills.map((ps: { skill_id: number }) => {
			const skill = skillsMap[ps.skill_id]
			return skill ? skill.image_key : ''
		})
	}))
}

export const fetchSkills = async (): Promise<SkillDTO[]> => {
	const { data, error } = await supabase.from('skills').select('*')
	if (error) {
		throw error
	}
	return data
}

export const fetchFeedbacks = async (): Promise<FeedbackDTO[]> => {
	const { data, error } = await supabase.from('feedbacks').select(`
        id,
        author_name,
        created_at,
        text,
        feedback_skills (
            skill_id
        )
    `)

	if (error) {
		throw error
	}

	const skillsData = await fetchSkills()

	const skillsMap = skillsData.reduce(
		(acc, skill) => {
			acc[skill.id] = skill
			return acc
		},
		{} as Record<number, SkillDTO>
	)

	return data.map(feedback => {
		const feedbackSkills = feedback.feedback_skills || []

		return {
			id: feedback.id,
			author_name: feedback.author_name,
			created_at: feedback.created_at,
			text: feedback.text,
			skills: feedbackSkills
				.map((feedback_skill: { skill_id: number }) => {
					const skill = skillsMap[feedback_skill.skill_id]
					return skill || null
				})
				.filter((skill): skill is SkillDTO => skill !== null)
		}
	})
}
