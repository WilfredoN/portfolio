import type { Skill } from '@features/feedback/types/skill'

export interface Feedback {
  id: number
  author: string
  company: string
  text: string
  created_at: string
  skills: Skill[]
}

export interface FeedbackFormData {
  author: string
  company: string
  text: string
  skills: number[]
}

export interface FeedbackFormErrors {
  author?: string
  text?: string
  skills?: string
}
