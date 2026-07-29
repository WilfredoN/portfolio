import { sendGAEvent } from '@features/shared/analytics/ga'
import { useAppConfig } from '@features/shared/config/useAppConfig'
import { useOnClickOutside } from '@shared/hooks/useOnClickOutside'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef } from 'react'

interface RecruiterModalProps {
  onClose: () => void
}

export const RecruiterModal = ({ onClose }: RecruiterModalProps) => {
  const { config } = useAppConfig()
  const modalRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(modalRef, onClose)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const experienceDuration = useMemo(() => {
    const startDate = new Date(2024, 2, 1)
    const now = new Date()
    const diffMonths =
      (now.getFullYear() - startDate.getFullYear()) * 12 +
      (now.getMonth() - startDate.getMonth())
    const years = (diffMonths / 12).toFixed(1)
    return `${years}+ years`
  }, [])

  const colorStyles = useMemo(() => {
    const color = config.availabilityStatusColor || 'green'
    if (color === 'orange') {
      return {
        badge: 'border-amber-500/30 bg-amber-500/10',
        dot: 'bg-amber-500',
        ping: 'bg-amber-400',
        text: 'text-amber-400'
      }
    }
    if (color === 'red') {
      return {
        badge: 'border-rose-500/30 bg-rose-500/10',
        dot: 'bg-rose-500',
        ping: 'bg-rose-400',
        text: 'text-rose-400'
      }
    }
    return {
      badge: 'border-emerald-500/30 bg-emerald-500/10',
      dot: 'bg-emerald-500',
      ping: 'bg-emerald-400',
      text: 'text-emerald-400'
    }
  }, [config.availabilityStatusColor])

  const handleResumeDownload = () => {
    sendGAEvent({
      action: 'recruiter_resume_click',
      category: 'RecruiterMode',
      label: 'Resume Download'
    })
    window.open('/resume.pdf', '_blank')
  }

  const handleContactClick = () => {
    sendGAEvent({
      action: 'recruiter_contact_click',
      category: 'RecruiterMode',
      label: 'Direct Email'
    })
    window.location.href =
      'mailto:nikita.afanasyevnn@gmail.com?subject=Opportunity%20Inquiry'
  }

  return (
    <AnimatePresence>
      <div className='fixed inset-0 z-10000 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md'>
        <motion.div
          ref={modalRef}
          animate={{ opacity: 1, scale: 1 }}
          className='flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-zinc-900 text-white shadow-2xl'
          exit={{ opacity: 0, scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className='flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6 py-4'>
            <div className='flex items-center gap-2.5'>
              <span className='text-2xl'>💼</span>
              <div>
                <h2 className='text-lg font-bold text-white sm:text-xl'>
                  Software Engineer Overview
                </h2>
                <p className='text-xs text-zinc-400'>
                  Frontend & Full-Stack Developer Summary
                </p>
              </div>
            </div>
            <button
              aria-label='Close modal'
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-all duration-200 hover:scale-105 hover:bg-rose-500 hover:text-white active:scale-95'
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div className='space-y-5 p-6'>
            <div className='flex w-full items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-center'>
              <span className='text-base sm:text-lg'>🚀</span>
              <span className='text-xs font-semibold text-blue-300 sm:text-sm'>
                Software Engineer with{' '}
                <strong className='font-bold text-white'>
                  {experienceDuration}
                </strong>{' '}
                of experience building web apps, subscription flows &
                microservices
              </span>
            </div>

            <div
              className={clsx(
                'flex w-full items-start justify-start gap-3 rounded-2xl border p-4 text-left',
                colorStyles.badge
              )}
            >
              <span className='relative mt-1 flex h-3 w-3 shrink-0'>
                <span
                  className={clsx(
                    'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                    colorStyles.ping
                  )}
                />
                <span
                  className={clsx(
                    'relative inline-flex h-3 w-3 rounded-full',
                    colorStyles.dot
                  )}
                />
              </span>
              <div className='flex flex-col items-start justify-start text-left'>
                <div
                  className={clsx(
                    'text-xs font-bold tracking-wider uppercase',
                    colorStyles.text
                  )}
                >
                  Current Availability
                </div>
                <div className='text-sm font-semibold text-white sm:text-base'>
                  {config.availabilityStatus}
                </div>
              </div>
            </div>

            <div>
              <h3 className='mb-3 text-xs font-bold tracking-wider text-zinc-400 uppercase'>
                Key Competencies & Practical Experience
              </h3>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <div className='hover:bg-zinc-850 rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-md'>
                  <div className='text-sm font-bold text-white'>
                    ⚡ Modern Frontend & Mobile
                  </div>
                  <div className='mt-1 text-xs text-zinc-400'>
                    React 19, TypeScript, Expo/React Native, Tailwind CSS,
                    Storybook
                  </div>
                </div>
                <div className='hover:bg-zinc-850 rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-md'>
                  <div className='text-sm font-bold text-white'>
                    💳 Monetization & Auth Systems
                  </div>
                  <div className='mt-1 text-xs text-zinc-400'>
                    Subscription flows, Apple/Google OAuth, Firebase, TanStack
                    Table
                  </div>
                </div>
                <div className='hover:bg-zinc-850 rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-md'>
                  <div className='text-sm font-bold text-white'>
                    🛠️ Full-Stack & Integrations
                  </div>
                  <div className='mt-1 text-xs text-zinc-400'>
                    Node.js Express, Python, Event-driven Webhooks, AI/LangChain
                    pipelines
                  </div>
                </div>
                <div className='hover:bg-zinc-850 rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-md'>
                  <div className='text-sm font-bold text-white'>
                    🚀 Web Performance & Testing
                  </div>
                  <div className='mt-1 text-xs text-zinc-400'>
                    40% performance boost via lazy loading, Playwright & Jest
                    CI/CD testing
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-3 sm:flex-row sm:justify-end'>
              <button
                className='flex cursor-pointer items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-5 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:scale-105 hover:bg-zinc-700 active:scale-95'
                onClick={handleResumeDownload}
              >
                <span>📄</span> Download Resume (PDF)
              </button>
              <button
                className='flex cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-bold text-zinc-950 transition-all duration-200 hover:scale-105 hover:bg-emerald-400 active:scale-95'
                onClick={handleContactClick}
              >
                <span>✉️</span> Initiate Direct Contact
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
