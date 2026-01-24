import type { Feedback } from '@features/feedback/types/feedback'
import type { Skill } from '@features/feedback/types/skill'

import { api } from '@service/api'

import type { FeedbackDTO, FeedbackResponse } from './types'

import { mapFeedback } from './mapper'

export const fetchFeedbacks = async (): Promise<Feedback[]> => {
  const data = await api.get<FeedbackResponse[] | any[]>('/feedbacks')
  return mapFeedback(data as FeedbackResponse[])
}

export const submitFeedbackWithNames = async (
  feedbackData: FeedbackDTO,
  allSkills: Skill[]
): Promise<{ error?: string; success: boolean }> => {
  try {
    const feedback_skills = feedbackData.skills.map((id) => {
      const skill = allSkills.find((s) => s.id === id)
      return { skill_id: id, skill_name: skill ? skill.name : '' }
    })
    await api.post('/feedbacks', {
      author: feedbackData.author,
      company: feedbackData.company || null,
      text: feedbackData.text,
      feedback_skills
    })
    return { success: true }
  } catch (error) {
    console.error('Error submitting feedback:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}
