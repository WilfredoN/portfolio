import type { Feedback } from '@features/feedback/types/feedback'
import { FeedbackResponse } from '.'


export const mapFeedback = (data: FeedbackResponse[]): Feedback[] =>
  data.map((feedback) => ({
    id: feedback.id,
    author: feedback.author,
    company: feedback.company,
    created_at: feedback.created_at,
    text: feedback.text,
    skills: feedback.feedback_skills.flatMap((fs) => fs.skills)
  }))
