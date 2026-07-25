const API_BASE_URL =
  (import.meta?.env?.VITE_API_URL as string) || 'https://api.capybara.cx.ua'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  })
  if (!res.ok) {
    let errorMessage = `API ${res.status}`
    try {
      const errJson = (await res.json()) as { error?: string }
      if (errJson && errJson.error) {
        errorMessage = errJson.error
      }
    } catch {
      const rawText = await res.text().catch(() => '')
      if (rawText) {
        errorMessage = rawText
      }
    }
    throw new Error(errorMessage)
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
