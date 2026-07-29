import cors from 'cors'
import express from 'express'
import geoip from 'geoip-lite'
import crypto from 'node:crypto'

import { getAppConfig, setAppConfig } from './config.js'
import { getDb } from './db.js'
import { getClientIp } from './ip.js'
import rateLimit from './rateLimit.js'
import requestLogger, { closeRequestLoggerStream } from './requestLogger.js'

const app = express()
app.use(express.json())
app.use(requestLogger())

app.set('trust proxy', 1)

const allowedOriginEnv = process.env.CORS_ORIGIN || ''
const allowedOrigins = allowedOriginEnv
  ? allowedOriginEnv
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  : ['https://capybara.cx.ua']

if (process.env.NODE_ENV !== 'production') {
  if (!allowedOrigins.includes('http://localhost:5173')) {
    allowedOrigins.push('http://localhost:5173')
  }
  if (!allowedOrigins.includes('http://127.0.0.1:5173')) {
    allowedOrigins.push('http://127.0.0.1:5173')
  }
  if (!allowedOrigins.includes('http://localhost:4173')) {
    allowedOrigins.push('http://localhost:4173')
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true)
      }
      const isAllowed = allowedOrigins.includes(origin)
      callback(null, isAllowed)
    }
  })
)

const readLimiter = rateLimit({
  windowMs: 60000,
  max: 120,
  message: 'Reading data too fast.',
  skip: (req) => req.path === '/health'
})

const submitLimiter = rateLimit({
  windowMs: 600000,
  max: 5,
  message: 'Feedback submission limit reached.'
})

app.use(readLimiter)

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY

const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers['x-admin-token'] || req.query.key
  if (!authHeader || authHeader !== ADMIN_SECRET) {
    res.status(404).json({ error: 'Not Found' })
    return
  }
  next()
}

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    server: 'hetzner-node-express',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  })
})

app.get('/stats', async (req, res, next) => {
  try {
    const db = await getDb()
    const feedbackCountRow = await db.get(
      'SELECT COUNT(*) as count FROM feedbacks'
    )
    const skillCountRow = await db.get(
      'SELECT COUNT(*) as count FROM feedback_skills'
    )
    const telemetryCountRow = await db.get(
      'SELECT COUNT(*) as count FROM telemetry_events'
    )

    const memUsage = process.memoryUsage()
    const memoryMb = Math.round((memUsage.heapUsed / 1024 / 1024) * 100) / 100

    res.setHeader('Cache-Control', 'public, max-age=15')
    res.json({
      status: 'ok',
      server: 'hetzner-node-express',
      environment: process.env.NODE_ENV || 'production',
      nodeVersion: process.version,
      uptimeSeconds: Math.floor(process.uptime()),
      memoryHeapMb: memoryMb,
      totalFeedbacks: feedbackCountRow?.count || 0,
      totalSkillsEndorsed: skillCountRow?.count || 0,
      totalTelemetryEvents: telemetryCountRow?.count || 0,
      timestamp: new Date().toISOString()
    })
  } catch (e) {
    next(e)
  }
})

app.post('/api/telemetry', async (req, res, next) => {
  try {
    const { event_name, category, label, metadata } = req.body
    if (!event_name || typeof event_name !== 'string') {
      res.status(400).json({ error: 'event_name is required' })
      return
    }

    const ip = getClientIp(req)
    const geo = geoip.lookup(ip)
    const country = geo?.country || 'Unknown'
    const city = geo?.city || 'Unknown'

    const hashedIp = crypto
      .createHash('sha256')
      .update(ip + (process.env.IP_SALT || 'salt42'))
      .digest('hex')
      .substring(0, 16)

    const enrichedMetadata = {
      ...(metadata || {}),
      country,
      city
    }

    const db = await getDb()
    await db.run(
      'INSERT INTO telemetry_events (event_name, category, label, metadata, hashed_ip, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [
        event_name,
        category || 'general',
        label || '',
        JSON.stringify(enrichedMetadata),
        hashedIp,
        new Date().toISOString()
      ]
    )

    res.status(201).json({ status: 'ok' })
  } catch (e) {
    next(e)
  }
})

app.get('/api/admin/telemetry/summary', verifyAdminToken, async (req, res, next) => {
  try {
    const db = await getDb()
    const totalEventsRow = await db.get(
      'SELECT COUNT(*) as count FROM telemetry_events'
    )
    const uniqueVisitorsRow = await db.get(
      'SELECT COUNT(DISTINCT hashed_ip) as count FROM telemetry_events'
    )
    const pageviewsRow = await db.get(
      "SELECT COUNT(*) as count FROM telemetry_events WHERE event_name = 'page_view'"
    )
    const recruiterRow = await db.get(
      "SELECT COUNT(*) as count FROM telemetry_events WHERE event_name IN ('resume_view', 'outbound_click', 'feedback_submit')"
    )

    const topEvents = await db.all(`
      SELECT event_name, COUNT(*) as count 
      FROM telemetry_events 
      GROUP BY event_name 
      ORDER BY count DESC 
      LIMIT 8
    `)

    const topPages = await db.all(`
      SELECT label as page_path, COUNT(*) as count 
      FROM telemetry_events 
      WHERE event_name = 'page_view' 
      GROUP BY label 
      ORDER BY count DESC 
      LIMIT 5
    `)

    res.json({
      totalEvents: totalEventsRow?.count || 0,
      uniqueVisitors: uniqueVisitorsRow?.count || 0,
      totalPageviews: pageviewsRow?.count || 0,
      recruiterConversions: recruiterRow?.count || 0,
      topEvents,
      topPages
    })
  } catch (e) {
    next(e)
  }
})

app.get('/api/admin/telemetry/events', verifyAdminToken, async (req, res, next) => {
  try {
    const db = await getDb()
    const events = await db.all(
      'SELECT * FROM telemetry_events ORDER BY created_at DESC LIMIT 50'
    )
    res.json(events)
  } catch (e) {
    next(e)
  }
})

app.get('/api/config', async (req, res, next) => {
  try {
    const config = await getAppConfig()
    res.setHeader('Cache-Control', 'public, max-age=15')
    res.json(config)
  } catch (e) {
    next(e)
  }
})

app.put('/api/admin/config', verifyAdminToken, async (req, res, next) => {
  try {
    const { key, value } = req.body
    if (!key || typeof key !== 'string') {
      res.status(400).json({ error: 'key is required' })
      return
    }
    const updated = await setAppConfig(key, value)
    res.json(updated)
  } catch (e) {
    next(e)
  }
})

app.post('/api/skills/endorse', async (req, res, next) => {
  try {
    const { skill_name, skill_id } = req.body
    if (!skill_name || typeof skill_name !== 'string') {
      res.status(400).json({ error: 'skill_name is required' })
      return
    }
    const db = await getDb()
    await db.run(
      'INSERT INTO feedback_skills (feedback_id, skill_id, skill_name) VALUES (?, ?, ?)',
      [0, skill_id || 0, skill_name]
    )
    res.status(201).json({ status: 'ok', skill_name })
  } catch (e) {
    next(e)
  }
})

app.get('/feedbacks/top-skills', async (req, res, next) => {
  try {
    const db = await getDb()
    const topSkills = await db.all(`
      SELECT skill_name, COUNT(*) as count 
      FROM feedback_skills 
      WHERE skill_name IS NOT NULL AND skill_name != '' 
      GROUP BY skill_name 
      ORDER BY count DESC 
      LIMIT 10
    `)
    res.setHeader('Cache-Control', 'public, max-age=30')
    res.json(topSkills)
  } catch (e) {
    next(e)
  }
})

app.get('/feedbacks', async (req, res, next) => {
  try {
    const db = await getDb()
    const feedbacks = await db.all(
      'SELECT * FROM feedbacks ORDER BY created_at DESC'
    )
    const ids = feedbacks.map((feedback) => feedback.id)
    let skills = []
    if (ids.length) {
      const placeholders = ids.map(() => '?').join(',')
      const query = `SELECT feedback_id, skill_id, skill_name FROM feedback_skills WHERE feedback_id IN (${placeholders})`
      skills = await db.all(query, ids)
    }
    const skillsByFeedback = {}
    for (const skill of skills) {
      if (!skillsByFeedback[skill.feedback_id]) {
        skillsByFeedback[skill.feedback_id] = []
      }
      skillsByFeedback[skill.feedback_id].push({
        skill_id: skill.skill_id,
        skill_name: skill.skill_name
      })
    }
    for (const feedback of feedbacks) {
      feedback.feedback_skills = skillsByFeedback[feedback.id] || []
    }
    res.json(feedbacks)
  } catch (e) {
    next(e)
  }
})

app.post('/feedbacks', submitLimiter, async (req, res, next) => {
  let db = null
  let isTransactionActive = false

  try {
    db = await getDb()
    const { author, company, text, feedback_skills } = req.body
    if (
      !author ||
      typeof author !== 'string' ||
      !text ||
      typeof text !== 'string'
    ) {
      res
        .status(400)
        .json({ error: 'author and text are required and must be strings' })
      return
    }
    if (Array.isArray(feedback_skills)) {
      for (const s of feedback_skills) {
        if (
          !s ||
          typeof s !== 'object' ||
          typeof s.skill_id !== 'number' ||
          typeof s.skill_name !== 'string' ||
          !s.skill_name.trim()
        ) {
          return res.status(400).json({
            error:
              'Each feedback skill must be an object with a non-empty skill_name and numeric skill_id.'
          })
        }
      }
    }
    const exists = await db.get(
      'SELECT id FROM feedbacks WHERE author = ? AND text = ?',
      [author, text]
    )
    if (exists) {
      res.status(409).json({
        error: 'A feedback with the same author and text already exists'
      })
      return
    }

    await db.exec('BEGIN')
    isTransactionActive = true

    const created_at = new Date().toISOString()
    const result = await db.run(
      'INSERT INTO feedbacks (author, company, text, created_at) VALUES (?, ?, ?, ?)',
      [author, company, text, created_at]
    )
    const feedback_id = result.lastID
    let insertedSkills = []
    if (Array.isArray(feedback_skills)) {
      const valid = feedback_skills.filter(
        (s) =>
          s &&
          typeof s === 'object' &&
          typeof s.skill_id === 'number' &&
          (s.skill_name === undefined || typeof s.skill_name === 'string')
      )
      insertedSkills = valid.map((s) => ({
        skill_id: s.skill_id,
        skill_name: s.skill_name || ''
      }))
      for (const s of insertedSkills) {
        await db.run(
          'INSERT INTO feedback_skills (feedback_id, skill_id, skill_name) VALUES (?, ?, ?)',
          [feedback_id, s.skill_id, s.skill_name]
        )
      }
    }

    await db.exec('COMMIT')
    isTransactionActive = false

    res.status(201).json({
      id: feedback_id,
      author,
      company,
      text,
      created_at,
      feedback_skills: insertedSkills
    })
  } catch (e) {
    if (db && isTransactionActive) {
      try {
        await db.exec('ROLLBACK')
      } catch (rollbackError) {
        console.error('Failed to rollback transaction:', rollbackError)
      }
    }
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
  try {
    readLimiter.stop()
    submitLimiter.stop()
  } catch { }

  try {
    closeRequestLoggerStream()
  } catch { }
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
