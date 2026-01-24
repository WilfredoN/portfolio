export function getClientIp(req) {
    const f = req.headers['x-forwarded-for']
    if (typeof f === 'string' && f.length > 0) {
        const first = f.split(',')[0].trim()
        if (first) { return first }
    }
    return req.ip
}
