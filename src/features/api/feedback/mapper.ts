import type { Feedback } from '@features/feedback/types/feedback'

import type { FeedbackResponse } from './types'

export const mapFeedback = (data: FeedbackResponse[]): Feedback[] =>
  data.map((feedback) => ({
    id: feedback.id,
    author: feedback.author,
    company: feedback.company,
    created_at: feedback.created_at,
    text: feedback.text,
    skills: feedback.feedback_skills.flatMap((fs: any) => {
      if (Array.isArray(fs.skills)) {
        return fs.skills
      }
      if (typeof fs.skill_id === 'number') {
        return [{ id: fs.skill_id, name: fs.skill_name || '' }]
      }
      return []
    })
  }))
