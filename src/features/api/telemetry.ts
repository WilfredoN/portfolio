const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3001'

export const sendBackendTelemetry = async (
  eventName: string,
  category = 'general',
  label = '',
  metadata: Record<string, unknown> = {}
): Promise<void> => {
  try {
    await fetch(`${API_URL}/api/telemetry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_name: eventName,
        category,
        label,
        metadata
      })
    })
  } catch {
  }
}

export interface AdminSummaryData {
  recruiterConversions: number
  topEvents: Array<{ count: number; event_name: string }>
  topPages: Array<{ count: number; page_path: string }>
  totalEvents: number
  totalPageviews: number
  uniqueVisitors: number
}

export interface AdminEventItem {
  category: string
  created_at: string
  event_name: string
  hashed_ip: string
  id: number
  label: string
  metadata: string
}

export const fetchAdminSummary = async (
  secretKey: string
): Promise<AdminSummaryData> => {
  const res = await fetch(`${API_URL}/api/admin/telemetry/summary?key=${encodeURIComponent(secretKey)}`, {
    headers: {
      'X-Admin-Token': secretKey
    }
  })
  if (!res.ok) {
    throw new Error('Unauthorized or invalid secret key')
  }
  return res.json()
}

export const fetchAdminEvents = async (
  secretKey: string
): Promise<AdminEventItem[]> => {
  const res = await fetch(`${API_URL}/api/admin/telemetry/events?key=${encodeURIComponent(secretKey)}`, {
    headers: {
      'X-Admin-Token': secretKey
    }
  })
  if (!res.ok) {
    throw new Error('Unauthorized or invalid secret key')
  }
  return res.json()
}
