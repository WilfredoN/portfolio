import { createWriteStream } from 'node:fs'

import { getClientIp } from './ip.js'

const streams = new Map()

export default function requestLogger(logFile = './server/access.log') {
    let stream = streams.get(logFile)
    if (!stream) {
        stream = createWriteStream(logFile, { flags: 'a' })
        streams.set(logFile, stream)
    }
    return (req, res, next) => {
        const start = Date.now()
        const { method, url, headers, body } = req
        const ua = headers['user-agent'] || ''
        const ip = getClientIp(req)
        res.on('finish', () => {
            const duration = Date.now() - start
            let bodyMetadata
            if (method === 'POST' && url.includes('/feedbacks')) {
                const skillsCount = Array.isArray(body?.feedback_skills) ? body.feedback_skills.length : 0
                bodyMetadata = {
                    author: typeof body?.author === 'string' ? body.author : undefined,
                    company: typeof body?.company === 'string' ? body.company : undefined,
                    text_length: typeof body?.text === 'string' ? body.text.length : undefined,
                    skills_count: skillsCount
                }
            }
            const logObj = {
                time: new Date().toISOString(),
                method,
                url,
                status: res.statusCode,
                ip,
                ua,
                body: bodyMetadata,
                duration
            }
            const log = `${JSON.stringify(logObj)}\n`
            stream.write(log)
        })
        next()
    }
}

export function closeRequestLoggerStream(logFile = './server/access.log') {
    const stream = streams.get(logFile)
    if (stream) {
        stream.end()
        streams.delete(logFile)
    }
}
