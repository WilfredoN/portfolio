import {
  programmingLanguages,
  technologiesAndLibraries
} from '@features/about/data/languages'

export const getSkillIconName = (skillName: string): string => {
  const allSkills = [...programmingLanguages, ...technologiesAndLibraries]
  const skill = allSkills.find((skill) => skill.text === skillName)

  return skill?.icon || 'default'
}
