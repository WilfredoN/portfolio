import { readFile } from 'node:fs/promises'

import { getDb } from './db.js'

async function seed() {
    const db = await getDb()
    const url = new URL('../public/data/feedbacks.json', import.meta.url)
    const raw = await readFile(url, 'utf8')
    const feedbacks = JSON.parse(raw)
    await db.exec('BEGIN TRANSACTION')
    await db.exec('DELETE FROM feedback_skills; DELETE FROM feedbacks;')
    for (const fb of feedbacks) {
        await db.run(
            'INSERT INTO feedbacks (id, author, company, text, created_at) VALUES (?, ?, ?, ?, ?)',
            [fb.id, fb.author, fb.company, fb.text, fb.created_at]
        )
        if (Array.isArray(fb.feedback_skills)) {
            const valid = fb.feedback_skills
                .map(skill => {
                    const normalizedSkillName =
                        typeof skill.skill_name === 'string'
                            ? skill.skill_name
                            : (typeof skill.skills?.name === 'string' ? skill.skills.name : undefined)
                    return { ...skill, normalizedSkillName }
                })
                .filter(
                    skill =>
                        typeof skill.skill_id === 'number' &&
                        (skill.normalizedSkillName === undefined || typeof skill.normalizedSkillName === 'string')
                )
            await Promise.all(
                valid.map(skill => {
                    const skillName = skill.normalizedSkillName ?? ''
                    return db.run(
                        'INSERT INTO feedback_skills (feedback_id, skill_id, skill_name) VALUES (?, ?, ?)',
                        [fb.id, skill.skill_id, skillName]
                    )
                })
            )
        }
    }
    await db.exec('COMMIT')
}

seed()
