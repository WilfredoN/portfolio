import type { Skill } from '@features/feedback/types/skill'

export interface FeedbackDTO {
  author: string
  company?: string
  skills: number[]
  text: string
}

export interface FeedbackResponse extends FeedbackDTO {
  created_at: string
  feedback_skills: {
    skill_id: number
    skills: Skill[]
  }[]
  id: number
}
