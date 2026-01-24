import type { Skill } from '@features/feedback/types/skill'

import { api } from '@service/api'

export const fetchSkills = async (): Promise<Skill[]> => {
  try {
    const feedbacks = await api.get<any[]>('/feedbacks')
    const map = new Map<number, string>()
    for (const fb of feedbacks) {
      for (const s of fb.feedback_skills || []) {
        if (typeof s.skill_id === 'number') {
          const name = typeof s.skill_name === 'string' ? s.skill_name : ''
          if (!map.has(s.skill_id)) {
            map.set(s.skill_id, name)
          }
        }
      }
    }
    return Array.from(map.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name))
  } catch {
    return []
  }
}
