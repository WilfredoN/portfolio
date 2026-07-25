import assert from 'node:assert/strict'
import { it } from 'vitest'

import { getMasterSkills, PRESET_SKILL_IDS } from './index'

it('getMasterSkills returns deterministic IDs and no collisions with preset IDs', () => {
  const skills1 = getMasterSkills()
  const skills2 = getMasterSkills()

  assert.deepStrictEqual(skills1, skills2)

  const presetMaxId = Math.max(0, ...Object.values(PRESET_SKILL_IDS))
  const presetNames = new Set(Object.keys(PRESET_SKILL_IDS))

  const seenIds = new Set<number>()
  const seenNames = new Set<string>()

  for (const skill of skills1) {
    assert.equal(seenIds.has(skill.id), false)
    assert.equal(seenNames.has(skill.name), false)

    seenIds.add(skill.id)
    seenNames.add(skill.name)

    if (presetNames.has(skill.name)) {
      assert.equal(skill.id, PRESET_SKILL_IDS[skill.name])
    } else {
      assert.ok(skill.id > presetMaxId)
    }
  }
})

it('getMasterSkills correctly deduplicates skills by name', () => {
  const skills = getMasterSkills()
  const names = skills.map((s) => s.name)
  const uniqueNames = new Set(names)

  assert.equal(names.length, uniqueNames.size)
})
