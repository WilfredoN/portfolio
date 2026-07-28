import { useTheme } from '@app/hooks/useTheme'
import { useBackendStatus } from '@features/shared/components/BackendStatus/hooks/useBackendStatus'
import { useOnClickOutside } from '@shared/hooks/useOnClickOutside'
import { AnimatePresence } from 'motion/react'
import { memo, useCallback, useMemo, useRef, useState } from 'react'

import { ServerDiagnosticsModal } from './components/ServerStatusLens/ServerDiagnosticsModal'
import { ServerStatusDot } from './components/ServerStatusLens/ServerStatusDot'

export const ServerStatusLens = memo(() => {
  const { isDarkTheme } = useTheme()
  const { data, isLoading } = useBackendStatus()
  const [showDiagnostics, setShowDiagnostics] = useState(false)
  const lensRef = useRef<HTMLDivElement>(null)

  const handleCloseDiagnostics = useCallback(() => {
    setShowDiagnostics(false)
  }, [])

  const handleToggleDiagnostics = useCallback(() => {
    setShowDiagnostics((prev) => !prev)
  }, [])

  useOnClickOutside(lensRef, handleCloseDiagnostics)

  const isOnline = data?.isOnline ?? false

  const statusColor = useMemo(() => {
    if (isLoading) {
      return 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]'
    }
    if (!isOnline) {
      return 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.9)]'
    }
    return 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.95)]'
  }, [isLoading, isOnline])

  return (
    <div ref={lensRef} className='relative flex items-center justify-center'>
      <ServerStatusDot
        isDarkTheme={isDarkTheme}
        statusColor={statusColor}
        onClick={handleToggleDiagnostics}
      />

      <AnimatePresence>
        {showDiagnostics && (
          <ServerDiagnosticsModal
            data={data}
            isDarkTheme={isDarkTheme}
            onClose={handleCloseDiagnostics}
          />
        )}
      </AnimatePresence>
    </div>
  )
})

ServerStatusLens.displayName = 'ServerStatusLens'
