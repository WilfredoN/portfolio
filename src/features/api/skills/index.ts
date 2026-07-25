import type { Skill } from '@features/feedback/types/skill'

import { api } from '@service/api'
import { SKILL_DEFINITIONS } from '@shared/constants/skills'

export const PRESET_SKILL_IDS: Record<string, number> = {
  Java: 1,
  JavaScript: 2,
  TypeScript: 3,
  Python: 4,
  C: 5,
  'C++': 6,
  React: 7,
  Playwright: 8,
  Jest: 9,
  Vite: 10,
  Bun: 11,
  TailwindCSS: 12,
  ChakraUI: 13,
  Spring: 14,
  PostgreSQL: 15,
  Redis: 16,
  Docker: 17
}

export const getMasterSkills = (): Skill[] => {
  const skillsByName = new Map<string, number>()
  const maxPresetId = Math.max(0, ...Object.values(PRESET_SKILL_IDS))
  let nextId = maxPresetId + 1

  for (const [name, id] of Object.entries(PRESET_SKILL_IDS)) {
    skillsByName.set(name, id)
  }

  const sortedDefs = Object.values(SKILL_DEFINITIONS).sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  for (const def of sortedDefs) {
    if (!skillsByName.has(def.name)) {
      skillsByName.set(def.name, nextId++)
    }
  }

  return Array.from(skillsByName.entries()).map(([name, id]) => ({ id, name }))
}

export const fetchSkills = async (): Promise<Skill[]> => {
  const masterSkills = getMasterSkills()
  const mapByName = new Map<string, Skill>()
  const mapById = new Map<number, Skill>()

  for (const skill of masterSkills) {
    mapByName.set(skill.name, skill)
    mapById.set(skill.id, skill)
  }

  try {
    const feedbacks = await api.get<any[]>('/feedbacks')
    for (const fb of feedbacks) {
      for (const s of fb.feedback_skills || []) {
        if (typeof s.skill_id === 'number') {
          const name = typeof s.skill_name === 'string' ? s.skill_name : ''
          if (!name) {continue}

          const existingById = mapById.get(s.skill_id)
          const existingByName = mapByName.get(name)

          if (existingById && existingByName) {
            continue
          }

          if (existingByName && !existingById) {
            mapById.delete(existingByName.id)
            existingByName.id = s.skill_id
            mapById.set(s.skill_id, existingByName)
          } else if (existingById && !existingByName) {
            mapByName.delete(existingById.name)
            existingById.name = name
            mapByName.set(name, existingById)
          } else if (!existingById && !existingByName) {
            const newSkill = { id: s.skill_id, name }
            mapByName.set(name, newSkill)
            mapById.set(s.skill_id, newSkill)
          }
        }
      }
    }
  } catch (error) {
    console.warn('Failed to fetch/reconcile feedback skills from server:', error)
  }

  return Array.from(mapByName.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  )
}
