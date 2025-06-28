export interface Feedback {
  id: number
  author: string
  company: string
  text: string
  created_at: string
  skills: Skill[]
}

export interface Skill {
  id: number
  name: string
}
