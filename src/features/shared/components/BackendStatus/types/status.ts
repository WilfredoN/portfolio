export interface BackendHealthResponse {
  server: string
  status: 'ok' | 'error'
  timestamp: string
  uptime: number
}

export interface ServerStatsResponse {
  environment: string
  memoryHeapMb: number
  nodeVersion: string
  server: string
  status: 'ok'
  timestamp: string
  totalFeedbacks: number
  totalSkillsEndorsed: number
  uptimeSeconds: number
}

export interface BackendStatusState {
  environment?: string
  isOnline: boolean
  latencyMs: number | null
  memoryHeapMb?: number
  nodeVersion?: string
  serverName: string
  totalFeedbacks?: number
  totalSkillsEndorsed?: number
  uptime: number | null
}
