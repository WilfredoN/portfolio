const toSet = (skills: ReadonlyArray<number>): Set<number> => new Set(skills)
const toArray = (skillsSet: Set<number>): number[] => Array.from(skillsSet)

export const toggleSkill = (
  skillId: number,
  selectedSkills: ReadonlyArray<number>
): number[] => {
  const set = toSet(selectedSkills)

  if (set.has(skillId)) {
    set.delete(skillId)
  } else {
    set.add(skillId)
  }

  return toArray(set)
}

export { toArray as skillsToArray, toSet as skillsToSet }
