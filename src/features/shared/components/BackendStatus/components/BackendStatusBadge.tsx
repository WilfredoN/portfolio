import { motion } from 'motion/react'

import {
  LATENCY_GOOD_THRESHOLD_MS,
  LATENCY_MODERATE_THRESHOLD_MS
} from '../config/statusConfig'
import { useBackendStatus } from '../hooks/useBackendStatus'

export const BackendStatusBadge = () => {
  const { data, isLoading } = useBackendStatus()

  if (isLoading) {
    return (
      <div className='flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-bg-elevated) text-(--color-text) px-3 py-1 text-xs opacity-70'>
        <span className='h-2 w-2 animate-ping rounded-full bg-amber-400' />
        <span>Connecting API...</span>
      </div>
    )
  }

  const isOnline = data?.isOnline ?? false
  const latency = data?.latencyMs ?? 0

  const getDotColor = () => {
    if (!isOnline) {return 'bg-rose-500 shadow-rose-500/50'}
    if (latency <= LATENCY_GOOD_THRESHOLD_MS) {return 'bg-emerald-400 shadow-emerald-400/50'}
    if (latency <= LATENCY_MODERATE_THRESHOLD_MS) {return 'bg-amber-400 shadow-amber-400/50'}
    return 'bg-orange-400 shadow-orange-400/50'
  }

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className='flex items-center gap-2.5 rounded-full border border-(--color-border) bg-(--color-bg-elevated) px-3 py-1 text-xs text-(--color-text) shadow-sm backdrop-blur-sm'
      initial={{ opacity: 0, scale: 0.9 }}
      title={
        isOnline
          ? `Connected to Hetzner Node backend (${latency}ms latency)`
          : 'Hetzner Node backend unreachable'
      }
      whileHover={{ scale: 1.03 }}
    >
      <span className='relative flex h-2 w-2'>
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${getDotColor()}`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full shadow-sm ${getDotColor()}`}
        />
      </span>
      <span className='font-mono font-medium text-[11px] tracking-tight opacity-90'>
        {isOnline ? `Hetzner API • ${latency}ms` : 'Hetzner API • Offline'}
      </span>
    </motion.div>
  )
}


