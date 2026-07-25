export interface BackendHealthResponse {
  server: string
  status: 'ok' | 'error'
  timestamp: string
  uptime: number
}

export interface BackendStatusState {
  isOnline: boolean
  latencyMs: number | null
  serverName: string
  uptime: number | null
}
