const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string) || 'http://localhost:3001'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  })
  console.log('API Response:', res)
  if (!res.ok) {
    const errBody = await res.text().catch(() => '')
    throw new Error(`API ${res.status}: ${errBody}`)
  }
  return res.json() as Promise<T>
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) })
}

export interface ApiFeedbackSkill {
  skill_id: number
  skill_name?: string
}
export interface ApiFeedback {
  author: string
  company?: string | null
  created_at: string
  feedback_skills: ApiFeedbackSkill[]
  id: number
  text: string
}
