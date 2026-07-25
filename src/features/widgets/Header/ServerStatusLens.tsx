import { useTheme } from '@app/hooks/useTheme'
import { useBackendStatus } from '@features/shared/components/BackendStatus/hooks/useBackendStatus'
import { useOnClickOutside } from '@shared/hooks/useOnClickOutside'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'

export const ServerStatusLens = () => {
  const { isDarkTheme } = useTheme()
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
        className={clsx(
          'group flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-transform select-none',
          isDarkTheme
            ? 'bg-zinc-950 ring-1 ring-white/30'
            : 'bg-zinc-200 ring-1 ring-black/20'
        )}
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
            className={clsx(
              'absolute top-full left-1/2 z-50 mt-3.5 w-64 -translate-x-1/2 rounded-2xl border p-4 text-left font-mono text-xs shadow-2xl backdrop-blur-2xl md:left-0 md:translate-x-0',
              isDarkTheme
                ? 'border-white/15 bg-black/95 text-white'
                : 'border-black/15 bg-white/95 text-zinc-900 shadow-xl'
            )}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className={clsx(
                'mb-2 flex items-center justify-between border-b pb-2',
                isDarkTheme ? 'border-white/10' : 'border-black/10'
              )}
            >
              <span
                className={
                  isDarkTheme
                    ? 'font-semibold text-white'
                    : 'font-semibold text-zinc-900'
                }
              >
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
                <span
                  className={
                    isDarkTheme ? 'text-zinc-400' : 'text-zinc-600'
                  }
                >
                  Status:
                </span>
                <span
                  className={
                    isOnline
                      ? 'font-bold text-emerald-500'
                      : 'font-bold text-rose-500'
                  }
                >
                  {isOnline ? 'ONLINE' : 'OFFLINE'}
                </span>
              </div>
              <div className='flex justify-between'>
                <span
                  className={
                    isDarkTheme ? 'text-zinc-400' : 'text-zinc-600'
                  }
                >
                  Ping Latency:
                </span>
                <span className='font-semibold text-emerald-500'>
                  {latency}ms
                </span>
              </div>
              {data?.uptime !== undefined && (
                <div className='flex justify-between'>
                  <span
                    className={
                      isDarkTheme ? 'text-zinc-400' : 'text-zinc-600'
                    }
                  >
                    Server Uptime:
                  </span>
                  <span>{formatUptime(data.uptime)}</span>
                </div>
              )}
              {data?.memoryHeapMb !== undefined && (
                <div className='flex justify-between'>
                  <span
                    className={
                      isDarkTheme ? 'text-zinc-400' : 'text-zinc-600'
                    }
                  >
                    Heap Memory:
                  </span>
                  <span>{data.memoryHeapMb} MB</span>
                </div>
              )}
              {data?.totalFeedbacks !== undefined && (
                <div className='flex justify-between'>
                  <span
                    className={
                      isDarkTheme ? 'text-zinc-400' : 'text-zinc-600'
                    }
                  >
                    Feedbacks in DB:
                  </span>
                  <span>{data.totalFeedbacks}</span>
                </div>
              )}
              {data?.nodeVersion && (
                <div className='flex justify-between'>
                  <span
                    className={
                      isDarkTheme ? 'text-zinc-400' : 'text-zinc-600'
                    }
                  >
                    Runtime:
                  </span>
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
