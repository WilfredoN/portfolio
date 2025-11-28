import type { FeedbackResponse } from './types'

export const fetchFeedbacksFromJson = async (): Promise<FeedbackResponse[]> => {
  try {
    const response = await fetch('/data/feedbacks.json')
    if (!response.ok) {
      throw new Error('Failed to fetch feedbacks from JSON')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching feedbacks from JSON:', error)
    return []
  }
}
