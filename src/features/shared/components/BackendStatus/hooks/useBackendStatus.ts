import { api } from '@service/api'
import { useQuery } from '@tanstack/react-query'

import type { BackendStatusState, ServerStatsResponse } from '../types/status'

import { STATUS_REFRESH_INTERVAL_MS } from '../config/statusConfig'

export const BACKEND_HEALTH_QUERY_KEY = ['backend-health']

export const useBackendStatus = () => {
  return useQuery<BackendStatusState>({
    queryKey: BACKEND_HEALTH_QUERY_KEY,
    queryFn: async () => {
      const startTime = performance.now()
      try {
        const stats = await api.get<ServerStatsResponse>('/stats')
        const endTime = performance.now()
        const latencyMs = Math.round(endTime - startTime)

        return {
          environment: stats.environment,
          isOnline: true,
          latencyMs,
          memoryHeapMb: stats.memoryHeapMb,
          nodeVersion: stats.nodeVersion,
          serverName: 'Hetzner Node',
          totalFeedbacks: stats.totalFeedbacks,
          totalSkillsEndorsed: stats.totalSkillsEndorsed,
          uptime: stats.uptimeSeconds
        }
      } catch {
        try {
          const data = await api.get<{ uptime: number }>('/health')
          const endTime = performance.now()
          return {
            isOnline: true,
            latencyMs: Math.round(endTime - startTime),
            serverName: 'Hetzner Node',
            uptime: data.uptime
          }
        } catch {
          return {
            isOnline: false,
            latencyMs: null,
            serverName: 'Hetzner Node',
            uptime: null
          }
        }
      }
    },
    refetchInterval: STATUS_REFRESH_INTERVAL_MS,
    retry: 1,
    staleTime: STATUS_REFRESH_INTERVAL_MS / 2
  })
}
