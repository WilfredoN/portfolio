import { getClientIp } from './ip.js'

export default function rateLimit(options) {
  const {
    windowMs = 60000,
    max = 30,
    message = 'Too many requests. Please try again shortly.',
    skip = () => false
  } = options || {}

  const ipMap = new Map()
  const intervalId = setInterval(
    () => {
      const now = Date.now()
      for (const [ip, timestamps] of ipMap.entries()) {
        const filtered = timestamps.filter((ts) => now - ts < windowMs)
        if (filtered.length > 0) {
          ipMap.set(ip, filtered)
        } else {
          ipMap.delete(ip)
        }
      }
    },
    Math.max(1000, Math.floor(windowMs / 4))
  )

  const middleware = (req, res, next) => {
    if (skip(req)) {
      return next()
    }

    const now = Date.now()
    const ip = getClientIp(req)
    if (!ipMap.has(ip)) {
      ipMap.set(ip, [])
    }
    const timestamps = ipMap.get(ip).filter((ts) => now - ts < windowMs)
    if (timestamps.length >= max) {
      const oldest = timestamps[0]
      const retryAfter = Math.ceil((windowMs - (now - oldest)) / 1000)
      ipMap.set(ip, timestamps)
      res.setHeader('X-RateLimit-Limit', String(max))
      res.setHeader('X-RateLimit-Remaining', '0')
      res.setHeader('Retry-After', String(retryAfter))
      res.status(429).json({
        error: `${message} Please wait ${retryAfter} second${retryAfter === 1 ? '' : 's'}.`,
        retryAfterSeconds: retryAfter
      })
      return
    }
    timestamps.push(now)
    ipMap.set(ip, timestamps)
    const remaining = Math.max(0, max - timestamps.length)
    res.setHeader('X-RateLimit-Limit', String(max))
    res.setHeader('X-RateLimit-Remaining', String(remaining))
    next()
  }

  middleware.stop = () => {
    clearInterval(intervalId)
  }

  return middleware
}

