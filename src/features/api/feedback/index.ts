import type { Feedback } from '@features/feedback/types/feedback'

import { api } from '@service/api'

import type { FeedbackDTO, FeedbackResponse } from './types'

import { fetchFeedbacksFromJson } from './fetchJson'
import { mapFeedback } from './mapper'

export const fetchFeedbacks = async (): Promise<Feedback[]> => {
  try {
    const data = await api.get<FeedbackResponse[] | any[]>('/feedbacks')
    return mapFeedback(data as FeedbackResponse[])
  } catch (error) {
    const jsonData = await fetchFeedbacksFromJson()
    console.error(
      'Error fetching feedbacks from API, falling back to JSON data:',
      error
    )
    return mapFeedback(jsonData)
  }
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
