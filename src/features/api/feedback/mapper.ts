import type { Feedback } from '@features/feedback/types/feedback'


export const mapFeedback = (data: unknown[]): Feedback[] =>
  data.map((feedback) => ({
    ...feedback,
    skills: feedback.feedback_skills.flatMap((fs) => fs.skills)
  }))
