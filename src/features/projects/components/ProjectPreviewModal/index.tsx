import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

interface ProjectPreviewModalProps {
  link: string
  onClose: () => void
  title: string
}

export const ProjectPreviewModal = ({
  title,
  link,
  onClose
}: ProjectPreviewModalProps) => {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <AnimatePresence>
      <div className='fixed inset-0 z-10000 flex items-center justify-center bg-black/75 p-2 backdrop-blur-md sm:p-6'>
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className='flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-zinc-900 text-white shadow-2xl'
          exit={{ opacity: 0, scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className='flex shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 py-3'>
            <div className='flex items-center gap-3'>
              <h2 className='text-base font-bold text-white sm:text-lg'>
                {title}
              </h2>
              <span className='rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-xs text-emerald-400'>
                Live Interactive Demo
              </span>
            </div>

            <div className='flex items-center gap-2 sm:gap-3'>
              <div className='hidden rounded-lg border border-zinc-800 bg-zinc-900 p-1 sm:flex'>
                <button
                  className={clsx(
                    'rounded-md px-3 py-1 text-xs font-semibold transition-colors',
                    viewport === 'desktop'
                      ? 'bg-emerald-500 text-zinc-950'
                      : 'text-zinc-400 hover:text-white'
                  )}
                  onClick={() => setViewport('desktop')}
                >
                  🖥️ Desktop
                </button>
                <button
                  className={clsx(
                    'rounded-md px-3 py-1 text-xs font-semibold transition-colors',
                    viewport === 'mobile'
                      ? 'bg-emerald-500 text-zinc-950'
                      : 'text-zinc-400 hover:text-white'
                  )}
                  onClick={() => setViewport('mobile')}
                >
                  📱 Mobile
                </button>
              </div>

              <a
                className='rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-bold text-zinc-200 transition-colors hover:bg-zinc-700'
                href={link}
                rel='noopener noreferrer'
                target='_blank'
              >
                Open in New Tab ↗
              </a>

              <button
                aria-label='Close preview'
                className='flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-rose-500 hover:text-white'
                onClick={onClose}
              >
                ✕
              </button>
            </div>
          </div>

          <div className='flex flex-1 items-center justify-center overflow-auto bg-zinc-950 p-2 sm:p-4'>
            <div
              className={clsx(
                'h-full overflow-hidden rounded-xl border border-zinc-800 bg-white shadow-2xl transition-all duration-300',
                viewport === 'desktop' ? 'w-full' : 'w-93.75 max-w-full'
              )}
            >
              <iframe
                className='h-full w-full border-none'
                src={link}
                title={title}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
