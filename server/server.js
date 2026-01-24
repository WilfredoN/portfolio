
import cors from 'cors'
import express from 'express'

import { getDb } from './db.js'
import rateLimit from './rateLimit.js'
import requestLogger, { closeRequestLoggerStream } from './requestLogger.js'


const app = express()
app.use(express.json())
app.use(requestLogger())

app.set('trust proxy', 1)
const allowedOrigin = process.env.CORS_ORIGIN || 'https://capybara.cx.ua'
app.use(cors({ origin: allowedOrigin }))
const limiter = rateLimit({ windowMs: 60000, max: 30 })
app.use(limiter)


app.get('/feedbacks', async (req, res, next) => {
    try {
        const db = await getDb()
        const feedbacks = await db.all('SELECT * FROM feedbacks ORDER BY created_at DESC')
        const ids = feedbacks.map(feedback => feedback.id)
        let skills = []
        if (ids.length) {
            const placeholders = ids.map(() => '?').join(',')
            const query = `SELECT feedback_id, skill_id, skill_name FROM feedback_skills WHERE feedback_id IN (${placeholders})`
            skills = await db.all(query, ids)
        }
        const skillsByFeedback = {}
        for (const skill of skills) {
            if (!skillsByFeedback[skill.feedback_id]) { skillsByFeedback[skill.feedback_id] = [] }
            skillsByFeedback[skill.feedback_id].push({ skill_id: skill.skill_id, skill_name: skill.skill_name })
        }
        for (const feedback of feedbacks) {
            feedback.feedback_skills = skillsByFeedback[feedback.id] || []
        }
        res.json(feedbacks)
    } catch (e) {
        next(e)
    }
})


app.post('/feedbacks', async (req, res, next) => {
    try {
        const db = await getDb()
        const { author, company, text, feedback_skills } = req.body
        if (!author || typeof author !== 'string' || !text || typeof text !== 'string') {
            res.status(400).json({ error: 'author and text are required and must be strings' })
            return
        }
        const exists = await db.get(
            'SELECT id FROM feedbacks WHERE author = ? AND text = ?',
            [author, text]
        )
        if (exists) {
            res.status(409).json({ error: 'A feedback with the same author and text already exists' })
            return
        }
        await db.exec('BEGIN')
        const created_at = new Date().toISOString()
        const result = await db.run(
            'INSERT INTO feedbacks (author, company, text, created_at) VALUES (?, ?, ?, ?)',
            [author, company, text, created_at]
        )
        const feedback_id = result.lastID
        let insertedSkills = []
        if (Array.isArray(feedback_skills)) {
            const valid = feedback_skills.filter(
                s => typeof s.skill_id === 'number' && (s.skill_name === undefined || typeof s.skill_name === 'string')
            )
            insertedSkills = valid.map(s => ({ skill_id: s.skill_id, skill_name: s.skill_name || '' }))
            for (const s of insertedSkills) {
                await db.run(
                    'INSERT INTO feedback_skills (feedback_id, skill_id, skill_name) VALUES (?, ?, ?)',
                    [feedback_id, s.skill_id, s.skill_name]
                )
            }
        }
        await db.exec('COMMIT')
        res.status(201).json({ id: feedback_id, author, company, text, created_at, feedback_skills: insertedSkills })
    } catch (e) {
        try { const db = await getDb(); await db.exec('ROLLBACK') } catch (rollbackError) { console.error('Failed to rollback transaction:', rollbackError) }
        next(e)
    }
})


app.use((err, req, res, _next) => {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.warn(`Server listening on port ${port}`)
})

function shutdown() {
    try { limiter.stop() } catch { }
    try { closeRequestLoggerStream() } catch { }
    process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
