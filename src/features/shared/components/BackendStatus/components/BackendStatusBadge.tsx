import { useOnClickOutside } from '@shared/hooks/useOnClickOutside'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'

import {
  LATENCY_GOOD_THRESHOLD_MS,
  LATENCY_MODERATE_THRESHOLD_MS
} from '../config/statusConfig'
import { useBackendStatus } from '../hooks/useBackendStatus'

export const BackendStatusBadge = () => {
  const { data, isLoading } = useBackendStatus()
  const [showStats, setShowStats] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(containerRef, () => {
    if (showStats) {
      setShowStats(false)
    }
  })

  if (isLoading) {
    return (
      <div className='flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-bg-elevated) px-3 py-1 text-xs text-(--color-text) opacity-70'>
        <span className='h-2 w-2 animate-ping rounded-full bg-amber-400' />
        <span>Connecting API...</span>
      </div>
    )
  }

  const isOnline = data?.isOnline ?? false
  const latency = data?.latencyMs ?? 0

  const getDotColor = () => {
    if (!isOnline) {
      return 'bg-rose-500 shadow-rose-500/50'
    }
    if (latency <= LATENCY_GOOD_THRESHOLD_MS) {
      return 'bg-emerald-400 shadow-emerald-400/50'
    }
    if (latency <= LATENCY_MODERATE_THRESHOLD_MS) {
      return 'bg-amber-400 shadow-amber-400/50'
    }
    return 'bg-orange-400 shadow-orange-400/50'
  }

  const formatUptime = (seconds?: number | null) => {
    if (!seconds) {
      return 'N/A'
    }
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hrs > 0) {
      return `${hrs}h ${mins}m`
    }
    if (mins > 0) {
      return `${mins}m ${secs}s`
    }
    return `${secs}s`
  }

  return (
    <div ref={containerRef} className='relative inline-block'>
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className='flex cursor-pointer items-center gap-2.5 rounded-full border border-(--color-border) bg-(--color-bg-elevated) px-3 py-1 text-xs text-(--color-text) shadow-sm backdrop-blur-sm transition-colors select-none hover:bg-current/10'
        initial={{ opacity: 0, scale: 0.9 }}
        title='Click to view Hetzner Server Diagnostics'
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setShowStats((prev) => !prev)}
      >
        <span className='relative flex h-2 w-2'>
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${getDotColor()}`}
          />
          <span
            className={`relative inline-flex h-2 w-2 rounded-full shadow-sm ${getDotColor()}`}
          />
        </span>
        <span className='font-mono text-[11px] font-medium tracking-tight opacity-90'>
          {isOnline ? `Hetzner API • ${latency}ms` : 'Hetzner API • Offline'}
        </span>
        <span className='text-[9px] opacity-60'>📊</span>
      </motion.div>

      <AnimatePresence>
        {showStats && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className='absolute bottom-full left-1/2 z-50 mb-3 w-64 -translate-x-1/2 rounded-2xl border border-(--color-border) bg-(--color-bg-card) p-4 text-left text-(--color-text) shadow-md backdrop-blur-md'
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div className='mb-2 flex items-center justify-between border-b border-(--color-border) pb-2'>
              <span className='text-xs font-semibold text-(--color-text)'>
                🖥️ Server Diagnostics
              </span>
              <button
                aria-label='Close diagnostics'
                className='text-xs opacity-60 hover:opacity-100'
                onClick={() => setShowStats(false)}
              >
                ✕
              </button>
            </div>

            <div className='flex flex-col gap-1.5 font-mono text-xs opacity-90'>
              <div className='flex justify-between'>
                <span className='text-(--color-text-muted)'>Host:</span>
                <span>Hetzner Node Express</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-(--color-text-muted)'>Ping Latency:</span>
                <span className='font-semibold text-emerald-400'>
                  {latency}ms
                </span>
              </div>
              {data?.uptime !== undefined && (
                <div className='flex justify-between'>
                  <span className='text-(--color-text-muted)'>
                    Server Uptime:
                  </span>
                  <span>{formatUptime(data.uptime)}</span>
                </div>
              )}
              {data?.memoryHeapMb !== undefined && (
                <div className='flex justify-between'>
                  <span className='text-(--color-text-muted)'>
                    Heap Memory:
                  </span>
                  <span>{data.memoryHeapMb} MB</span>
                </div>
              )}
              {data?.totalFeedbacks !== undefined && (
                <div className='flex justify-between'>
                  <span className='text-(--color-text-muted)'>
                    Feedbacks in DB:
                  </span>
                  <span>{data.totalFeedbacks}</span>
                </div>
              )}
              {data?.nodeVersion && (
                <div className='flex justify-between'>
                  <span className='text-(--color-text-muted)'>Runtime:</span>
                  <span>Node {data.nodeVersion}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
