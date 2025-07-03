import type { Feedback } from '@features/feedback/types/feedback'
import type { Skill } from '@features/feedback/types/skill'

import { supabase } from '@service/supabase'

interface FeedbackDTO {
  author: string
  company?: string
  skills: number[]
  text: string
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

  return (data ?? []).map((feedback) => ({
    ...feedback,
    skills: feedback.feedback_skills.flatMap((fs) => fs.skills)
  }))
}

export const submitFeedback = async (
  feedbackData: FeedbackDTO
): Promise<{ error?: string; success: boolean }> => {
  try {
    const { data: feedback, error: feedbackError } = await supabase
      .from('feedback')
      .insert({
        author: feedbackData.author,
        company: feedbackData.company || null,
        text: feedbackData.text
      })
      .select('id')
      .single()

    if (feedbackError || !feedback) {
      console.error('Error creating feedback:', feedbackError)

      return { success: false, error: 'Failed to create feedback' }
    }

    if (feedbackData.skills.length > 0) {
      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select('id')
        .in('id', feedbackData.skills)

      if (skillsError) {
        console.error('Error fetching skills:', skillsError)

        return { success: false, error: 'Failed to link skills' }
      }

      const skillRelations = skillsData.map((skill) => ({
        feedback_id: feedback.id,
        skill_id: skill.id
      }))

      const { error: relationError } = await supabase
        .from('feedback_skills')
        .insert(skillRelations)

      if (relationError) {
        console.error('Error creating skill relations:', relationError)

        return { success: false, error: 'Failed to link skills to feedback' }
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error submitting feedback:', error)

    return { success: false, error: 'An unexpected error occurred' }
  }
}

export const fetchSkills = async (): Promise<Skill[]> => {
  const { data, error } = await supabase
    .from('skills')
    .select('id, name')
    .order('name', { ascending: true })

  if (error || !data) {
    console.error('Error fetching skills:', error)

    return []
  }

  return data
}
