import { supabase } from '../../service/supabase'
import { Feedback } from '../../types/feedback'

interface FeedbackDTO {
	author: string
	company?: string
	text: string
	skills: number[]
}

export const fetchFeedbacks = async (): Promise<Feedback[]> => {
	const { data, error } = await supabase
		.from('feedback')
		.select(
			'id, author, company, text, created_at, feedback_skills(skill_id, skills(name, id))'
		)
		.order('created_at', { ascending: false })

	if (error || !data) {
		console.error('Error fetching feedbacks:', error)
		return []
	}

	return (data ?? []).map(feedback => ({
		...feedback,
		skills: feedback.feedback_skills.flatMap(fs => fs.skills)
	}))
}

export const submitFeedback = async (): Promise<void> => {}
