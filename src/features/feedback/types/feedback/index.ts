import type { Skill } from '@features/feedback/types/skill'

export interface Feedback {
  author: string
  company: string
  created_at: string
  id: number
  skills: Skill[]
  text: string
}

export interface FeedbackFormData {
  author: string
  company: string
  skills: number[]
  text: string
}

export interface FeedbackFormErrors {
  author?: string
  skills?: string
  text?: string
}
