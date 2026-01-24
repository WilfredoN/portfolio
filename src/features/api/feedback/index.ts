import type { Feedback } from '@features/feedback/types/feedback'

import { api } from '@service/api'

import type { FeedbackDTO, FeedbackResponse } from './types'

import { mapFeedback } from './mapper'

export const fetchFeedbacks = async (): Promise<Feedback[]> => {
  const data = await api.get<FeedbackResponse[] | any[]>('/feedbacks')
  return mapFeedback(data as FeedbackResponse[])
}

export const submitFeedback = async (
  feedbackData: FeedbackDTO
): Promise<{ error?: string; success: boolean }> => {
  try {
    await api.post('/feedbacks', {
      author: feedbackData.author,
      company: feedbackData.company || null,
      text: feedbackData.text,
      feedback_skills: feedbackData.skills.map((id) => ({ skill_id: id }))
    })
    return { success: true }
  } catch (error) {
    console.error('Error submitting feedback:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}
