import { useBackendStatus } from '@features/shared/components/BackendStatus/hooks/useBackendStatus'
import { useOnClickOutside } from '@shared/hooks/useOnClickOutside'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'

export const ServerStatusLens = () => {
  const { data, isLoading } = useBackendStatus()
  const [showDiagnostics, setShowDiagnostics] = useState(false)
  const lensRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(lensRef, () => {
    if (showDiagnostics) {
      setShowDiagnostics(false)
    }
  })

  const isOnline = data?.isOnline ?? false
  const latency = data?.latencyMs ?? 0

  const getStatusColor = () => {
    if (isLoading) {
      return 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]'
    }
    if (!isOnline) {
      return 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.9)]'
    }
    return 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.95)]'
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
    <div ref={lensRef} className='relative flex items-center justify-center'>
      <motion.button
        aria-label='Server Status & Diagnostics'
        className='group flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-zinc-950 ring-1 ring-white/30 transition-transform select-none'
        title='Click to view Hetzner Server Diagnostics'
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowDiagnostics((prev) => !prev)}
      >
        <span
          className={`h-3 w-3 rounded-full transition-all duration-300 ${getStatusColor()}`}
        />
      </motion.button>

      <AnimatePresence>
        {showDiagnostics && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className='absolute top-full left-1/2 z-50 mt-3.5 w-64 -translate-x-1/2 rounded-2xl border border-white/15 bg-black/95 p-4 text-left font-mono text-xs text-white shadow-md backdrop-blur-md md:left-0 md:translate-x-0'
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div className='mb-2 flex items-center justify-between border-b border-white/10 pb-2'>
              <span className='font-semibold text-white'>
                🖥️ Hetzner API Diagnostics
              </span>
              <button
                aria-label='Close diagnostics'
                className='text-xs opacity-60 hover:opacity-100'
                onClick={() => setShowDiagnostics(false)}
              >
                ✕
              </button>
            </div>

            <div className='flex flex-col gap-1.5 opacity-90'>
              <div className='flex justify-between'>
                <span className='text-zinc-400'>Status:</span>
                <span
                  className={
                    isOnline
                      ? 'font-bold text-emerald-400'
                      : 'font-bold text-rose-400'
                  }
                >
                  {isOnline ? 'ONLINE' : 'OFFLINE'}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-zinc-400'>Ping Latency:</span>
                <span className='font-semibold text-emerald-400'>
                  {latency}ms
                </span>
              </div>
              {data?.uptime !== undefined && (
                <div className='flex justify-between'>
                  <span className='text-zinc-400'>Server Uptime:</span>
                  <span>{formatUptime(data.uptime)}</span>
                </div>
              )}
              {data?.memoryHeapMb !== undefined && (
                <div className='flex justify-between'>
                  <span className='text-zinc-400'>Heap Memory:</span>
                  <span>{data.memoryHeapMb} MB</span>
                </div>
              )}
              {data?.totalFeedbacks !== undefined && (
                <div className='flex justify-between'>
                  <span className='text-zinc-400'>Feedbacks in DB:</span>
                  <span>{data.totalFeedbacks}</span>
                </div>
              )}
              {data?.nodeVersion && (
                <div className='flex justify-between'>
                  <span className='text-zinc-400'>Runtime:</span>
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
