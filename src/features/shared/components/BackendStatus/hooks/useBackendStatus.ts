import { api } from '@service/api'
import { useQuery } from '@tanstack/react-query'

import type { BackendHealthResponse, BackendStatusState } from '../types/status'

import { STATUS_REFRESH_INTERVAL_MS } from '../config/statusConfig'

export const BACKEND_HEALTH_QUERY_KEY = ['backend-health']

export const useBackendStatus = () => {
  return useQuery<BackendStatusState>({
    queryKey: BACKEND_HEALTH_QUERY_KEY,
    queryFn: async () => {
      const startTime = performance.now()
      try {
        const data = await api.get<BackendHealthResponse>('/health')
        const endTime = performance.now()
        const latencyMs = Math.round(endTime - startTime)

        return {
          isOnline: true,
          latencyMs,
          serverName: 'Hetzner Node',
          uptime: data.uptime
        }
      } catch {
        // Try fallback to /feedbacks
        try {
          await api.get('/feedbacks')
          const endTime = performance.now()
          return {
            isOnline: true,
            latencyMs: Math.round(endTime - startTime),
            serverName: 'Hetzner Node',
            uptime: null
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
    staleTime: STATUS_REFRESH_INTERVAL_MS / 2,
    retry: 1
  })
}
