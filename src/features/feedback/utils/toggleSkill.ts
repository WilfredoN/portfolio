export const toggleSkill = (
  skillId: number,
  selectedSkills: number[]
): number[] => {
  return selectedSkills.includes(skillId)
    ? selectedSkills.filter((id) => id !== skillId)
    : [...selectedSkills, skillId]
}
