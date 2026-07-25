import type { Skill } from '@features/feedback/types/skill'

import {
  programmingLanguages,
  technologiesAndLibraries
} from '@features/about/data/languages'

export const categorizeSkills = (skills: Skill[]) => {
  const programmingNames = new Set(
    programmingLanguages.map((lang) => lang.text)
  )
  const techNames = new Set(
    technologiesAndLibraries.map((tech) => tech.text)
  )

  const programmingSkills = skills.filter((skill) =>
    programmingNames.has(skill.name)
  )

  const technologySkills = skills.filter(
    (skill) =>
      techNames.has(skill.name) ||
      (!programmingNames.has(skill.name) && !techNames.has(skill.name))
  )

  return { programmingSkills, technologySkills }
}
