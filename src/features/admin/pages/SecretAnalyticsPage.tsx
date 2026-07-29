import type { AdminEventItem, AdminSummaryData } from '@features/api/telemetry'

import { useTheme } from '@app/hooks/useTheme'
import { fetchAdminEvents, fetchAdminSummary } from '@features/api/telemetry'
import { useAppConfig } from '@features/shared/config/useAppConfig'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const SecretAnalyticsPage = () => {
  const { isDarkTheme } = useTheme()
  const { config, updateConfigKey } = useAppConfig()
  const [searchParams] = useSearchParams()
  const [key, setKey] = useState<string | null>(() => {
    return (
      searchParams.get('key') ||
      localStorage.getItem('admin_secret_key') ||
      null
    )
  })
  const [inputKey, setInputKey] = useState('')
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [summary, setSummary] = useState<AdminSummaryData | null>(null)
  const [events, setEvents] = useState<AdminEventItem[]>([])
  const [loading, setLoading] = useState(false)
  const [availabilityInput, setAvailabilityInput] = useState('')

  const loadDashboard = useCallback(async (token: string) => {
    setLoading(true)
    try {
      const [sumData, eventData] = await Promise.all([
        fetchAdminSummary(token),
        fetchAdminEvents(token)
      ])
      setSummary(sumData)
      setEvents(eventData)
      setIsAuthorized(true)
      localStorage.setItem('admin_secret_key', token)
      localStorage.setItem('admin_token', token)
    } catch {
      setIsAuthorized(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (key) {
      loadDashboard(key)
    } else {
      setIsAuthorized(false)
    }
  }, [key, loadDashboard])

  useEffect(() => {
    if (config.availabilityStatus) {
      setAvailabilityInput(config.availabilityStatus)
    }
  }, [config.availabilityStatus])

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputKey.trim()) {
      setKey(inputKey.trim())
    }
  }

  if (isAuthorized === false && !searchParams.get('key')) {
    return (
      <div className='flex min-h-[60vh] flex-col items-center justify-center px-4 text-center select-none'>
        <h1 className='text-6xl font-extrabold text-zinc-400 dark:text-zinc-600'>
          404
        </h1>
        <p className='mt-2 text-xl font-medium text-zinc-600 dark:text-zinc-400'>
          Page Not Found
        </p>
        <p className='mt-1 text-sm text-zinc-400 dark:text-zinc-500'>
          The requested URL /42 was not found on this server.
        </p>

        <form className='mt-8 flex gap-2' onSubmit={handleAuthenticate}>
          <input
            className={clsx(
              'rounded-xl border px-3 py-1.5 font-mono text-xs outline-none',
              isDarkTheme
                ? 'border-zinc-800 bg-zinc-900 text-white'
                : 'border-zinc-300 bg-white text-zinc-900'
            )}
            placeholder='Secret key...'
            type='password'
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
          />
          <button
            className='rounded-xl bg-blue-600 px-4 py-1.5 font-mono text-xs text-white hover:bg-blue-700'
            type='submit'
          >
            Unlock
          </button>
        </form>
      </div>
    )
  }

  if (loading || isAuthorized === null) {
    return (
      <div className='flex min-h-[50vh] items-center justify-center font-mono text-sm opacity-60'>
        Authenticating & loading telemetry...
      </div>
    )
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className='mx-auto w-full max-w-5xl px-4 py-6 text-left font-sans'
      initial={{ opacity: 0, y: 15 }}
    >
      <div className='mb-6 flex flex-wrap items-center justify-between gap-4 border-b pb-4 dark:border-zinc-800'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
            🛡️ Owner Telemetry Dashboard (/42)
          </h1>
          <p className='mt-1 font-mono text-xs opacity-70'>
            100% Ad-Block Resilient Server Metrics & Recruiter Conversions
          </p>
        </div>
        <button
          className='rounded-lg border border-rose-500/40 px-3 py-1.5 font-mono text-xs text-rose-400 hover:bg-rose-500/10'
          onClick={() => {
            localStorage.removeItem('admin_secret_key')
            setIsAuthorized(false)
            setKey(null)
          }}
        >
          Lock Dashboard
        </button>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <div
          className={clsx(
            'rounded-2xl border p-5 shadow-xl backdrop-blur-md transition-all',
            isDarkTheme
              ? 'border-white/15 bg-black/45 text-white'
              : 'border-white/60 bg-white/45 text-zinc-900 shadow-sm'
          )}
        >
          <span className='text-xs font-semibold tracking-wider uppercase opacity-70'>
            Unique Visitors
          </span>
          <div className='mt-2 text-3xl font-extrabold text-blue-500'>
            {summary?.uniqueVisitors ?? 0}
          </div>
          <p className='mt-1 text-[11px] opacity-60'>Anonymized IP telemetry</p>
        </div>

        <div
          className={clsx(
            'rounded-2xl border p-5 shadow-xl backdrop-blur-md transition-all',
            isDarkTheme
              ? 'border-white/15 bg-black/45 text-white'
              : 'border-white/60 bg-white/45 text-zinc-900 shadow-sm'
          )}
        >
          <span className='text-xs font-semibold tracking-wider uppercase opacity-70'>
            Recruiter Conversions
          </span>
          <div className='mt-2 text-3xl font-extrabold text-emerald-500'>
            {summary?.recruiterConversions ?? 0}
          </div>
          <p className='mt-1 text-[11px] opacity-60'>
            CV downloads & contact clicks
          </p>
        </div>

        <div
          className={clsx(
            'rounded-2xl border p-5 shadow-xl backdrop-blur-md transition-all',
            isDarkTheme
              ? 'border-white/15 bg-black/45 text-white'
              : 'border-white/60 bg-white/45 text-zinc-900 shadow-sm'
          )}
        >
          <span className='text-xs font-semibold tracking-wider uppercase opacity-70'>
            SPA Pageviews
          </span>
          <div className='mt-2 text-3xl font-extrabold text-purple-500'>
            {summary?.totalPageviews ?? 0}
          </div>
          <p className='mt-1 text-[11px] opacity-60'>Route change events</p>
        </div>

        <div
          className={clsx(
            'rounded-2xl border p-5 shadow-xl backdrop-blur-md transition-all',
            isDarkTheme
              ? 'border-white/15 bg-black/45 text-white'
              : 'border-white/60 bg-white/45 text-zinc-900 shadow-sm'
          )}
        >
          <span className='text-xs font-semibold tracking-wider uppercase opacity-70'>
            Total Events Ingested
          </span>
          <div className='mt-2 text-3xl font-extrabold text-amber-500'>
            {summary?.totalEvents ?? 0}
          </div>
          <p className='mt-1 text-[11px] opacity-60'>Server-side event log</p>
        </div>
      </div>

      <div
        className={clsx(
          'mt-8 rounded-2xl border p-6 shadow-xl backdrop-blur-md',
          isDarkTheme
            ? 'border-white/15 bg-black/45 text-white'
            : 'border-white/60 bg-white/45 text-zinc-900 shadow-sm'
        )}
      >
        <h2 className='mb-4 text-lg font-bold'>
          ⚙️ Abstract Configuration Management (Live Feature Flags)
        </h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-4'>
            <div>
              <div className='text-sm font-bold'>💼 Recruiter Mode</div>
              <div className='text-xs opacity-60'>Header executive summary</div>
            </div>
            <button
              className={clsx(
                'rounded-full px-3 py-1 text-xs font-bold transition-colors',
                config.isRecruiterModeEnabled
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'bg-zinc-800 text-zinc-400'
              )}
              onClick={() =>
                updateConfigKey(
                  'isRecruiterModeEnabled',
                  !config.isRecruiterModeEnabled
                )
              }
            >
              {config.isRecruiterModeEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className='flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-4'>
            <div>
              <div className='text-sm font-bold'>👁️ Live In-App Preview</div>
              <div className='text-xs opacity-60'>
                Project demo iframe modal
              </div>
            </div>
            <button
              className={clsx(
                'rounded-full px-3 py-1 text-xs font-bold transition-colors',
                config.enableLivePreview
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'bg-zinc-800 text-zinc-400'
              )}
              onClick={() =>
                updateConfigKey('enableLivePreview', !config.enableLivePreview)
              }
            >
              {config.enableLivePreview ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-end'>
          <div className='flex flex-1 flex-col gap-2'>
            <label className='text-xs font-bold tracking-wider text-zinc-400 uppercase'>
              Dynamic Availability Status Text
            </label>
            <input
              className='rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white outline-none'
              value={availabilityInput}
              onChange={(e) => setAvailabilityInput(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-xs font-bold tracking-wider text-zinc-400 uppercase'>
              Status Color Indicator
            </label>
            <div className='flex gap-1.5'>
              <button
                className={clsx(
                  'rounded-lg px-3 py-1.5 text-xs font-bold transition-all',
                  config.availabilityStatusColor === 'green' ||
                    !config.availabilityStatusColor
                    ? 'bg-emerald-500 text-zinc-950 shadow-md ring-2 ring-emerald-400'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                )}
                onClick={() =>
                  updateConfigKey('availabilityStatusColor', 'green')
                }
              >
                🟢 Green
              </button>
              <button
                className={clsx(
                  'rounded-lg px-3 py-1.5 text-xs font-bold transition-all',
                  config.availabilityStatusColor === 'orange'
                    ? 'bg-amber-500 text-zinc-950 shadow-md ring-2 ring-amber-400'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                )}
                onClick={() =>
                  updateConfigKey('availabilityStatusColor', 'orange')
                }
              >
                🟠 Orange
              </button>
              <button
                className={clsx(
                  'rounded-lg px-3 py-1.5 text-xs font-bold transition-all',
                  config.availabilityStatusColor === 'red'
                    ? 'bg-rose-500 text-zinc-950 shadow-md ring-2 ring-rose-400'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                )}
                onClick={() =>
                  updateConfigKey('availabilityStatusColor', 'red')
                }
              >
                🔴 Red
              </button>
            </div>
          </div>
          <button
            className='rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 transition-colors hover:bg-emerald-400'
            onClick={() =>
              updateConfigKey('availabilityStatus', availabilityInput)
            }
          >
            Save Status Text
          </button>
        </div>
      </div>

      <div className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <div
          className={clsx(
            'rounded-2xl border p-5 shadow-xl backdrop-blur-md',
            isDarkTheme
              ? 'border-white/15 bg-black/45 text-white'
              : 'border-white/60 bg-white/45 text-zinc-900 shadow-sm'
          )}
        >
          <h3 className='mb-4 flex items-center gap-2 text-base font-bold'>
            <span>📊</span> Top Landing Routes
          </h3>
          <div className='flex flex-col gap-2 font-mono text-xs'>
            {summary?.topPages.map((page) => (
              <div
                key={page.page_path}
                className='flex items-center justify-between border-b border-zinc-500/20 pb-2'
              >
                <span className='font-semibold'>{page.page_path}</span>
                <span className='rounded-full bg-blue-500/20 px-2 py-0.5 font-bold text-blue-400'>
                  {page.count} views
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={clsx(
            'rounded-2xl border p-5 shadow-xl backdrop-blur-md',
            isDarkTheme
              ? 'border-white/15 bg-black/45 text-white'
              : 'border-white/60 bg-white/45 text-zinc-900 shadow-sm'
          )}
        >
          <h3 className='mb-4 flex items-center gap-2 text-base font-bold'>
            <span>🔥</span> Top Telemetry Events
          </h3>
          <div className='flex flex-col gap-2 font-mono text-xs'>
            {summary?.topEvents.map((evt) => (
              <div
                key={evt.event_name}
                className='flex items-center justify-between border-b border-zinc-500/20 pb-2'
              >
                <span className='font-semibold'>{evt.event_name}</span>
                <span className='rounded-full bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-400'>
                  {evt.count} events
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'mt-8 overflow-x-auto rounded-2xl border p-5 shadow-xl backdrop-blur-md',
          isDarkTheme
            ? 'border-white/15 bg-black/45 text-white'
            : 'border-white/60 bg-white/45 text-zinc-900 shadow-sm'
        )}
      >
        <h3 className='mb-4 flex items-center gap-2 text-base font-bold'>
          <span>⚡</span> Live Telemetry Stream (Recent 50 Events)
        </h3>
        <table className='w-full text-left font-mono text-xs'>
          <thead>
            <tr className='border-b border-zinc-500/30 opacity-70'>
              <th className='pb-2'>Time</th>
              <th className='pb-2'>Event</th>
              <th className='pb-2'>Category</th>
              <th className='pb-2'>Label</th>
              <th className='pb-2'>Hashed IP</th>
            </tr>
          </thead>
          <tbody>
            {events.map((evt) => (
              <tr
                key={evt.id}
                className='border-b border-zinc-500/10 hover:bg-white/5'
              >
                <td className='py-2 opacity-60'>
                  {new Date(evt.created_at).toLocaleTimeString()}
                </td>
                <td className='py-2 font-bold text-blue-400'>
                  {evt.event_name}
                </td>
                <td className='py-2 opacity-80'>{evt.category}</td>
                <td className='max-w-xs truncate py-2 opacity-80'>
                  {evt.label || '-'}
                </td>
                <td className='py-2 opacity-50'>{evt.hashed_ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
