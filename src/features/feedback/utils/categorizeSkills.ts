import type { Skill } from '@features/feedback/types/skill'

import {
  programmingLanguages,
  technologiesAndLibraries
} from '@features/about/data/languages'

export const categorizeSkills = (skills: Skill[]) => {
  const programmingSkills = skills.filter((skill) =>
    programmingLanguages.some((lang) => lang.text === skill.name)
  )
  const technologySkills = skills.filter((skill) =>
    technologiesAndLibraries.some((tech) => tech.text === skill.name)
  )

  return { programmingSkills, technologySkills }
}
