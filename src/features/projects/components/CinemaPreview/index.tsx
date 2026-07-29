import clsx from 'clsx'
import { motion } from 'motion/react'
import { useState } from 'react'

interface CinemaPreviewProps {
  link: string
  onClose: () => void
  title: string
}

export const CinemaPreview = ({ title, link, onClose }: CinemaPreviewProps) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>(
    'desktop'
  )

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className='mb-8 flex w-full flex-col overflow-hidden rounded-3xl border border-emerald-500/40 bg-zinc-950 shadow-2xl backdrop-blur-xl'
      initial={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className='flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900 px-4 py-3 sm:px-6'>
        <div className='flex items-center gap-3'>
          <span className='text-xl'>👁️</span>
          <div>
            <h2 className='text-sm font-bold text-white sm:text-base'>
              Live Preview: {title}
            </h2>
            <p className='font-mono text-[11px] text-emerald-400'>
              Full-Scale Interactive Canvas
            </p>
          </div>
        </div>

        <div className='flex items-center gap-2 sm:gap-3'>
          <div className='flex rounded-lg border border-zinc-800 bg-zinc-950 p-1'>
            <button
              className={clsx(
                'rounded-md px-2.5 py-1 text-xs font-semibold transition-colors',
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
                'rounded-md px-2.5 py-1 text-xs font-semibold transition-colors',
                viewport === 'tablet'
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'text-zinc-400 hover:text-white'
              )}
              onClick={() => setViewport('tablet')}
            >
              📱 Tablet
            </button>
            <button
              className={clsx(
                'rounded-md px-2.5 py-1 text-xs font-semibold transition-colors',
                viewport === 'mobile'
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'text-zinc-400 hover:text-white'
              )}
              onClick={() => setViewport('mobile')}
            >
              📲 Mobile
            </button>
          </div>

          <a
            className='hidden rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-bold text-zinc-200 transition-colors hover:bg-zinc-700 sm:block'
            href={link}
            rel='noopener noreferrer'
            target='_blank'
          >
            Open New Tab ↗
          </a>

          <button
            aria-label='Close cinema preview'
            className='flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-rose-500 hover:text-white'
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>

      <div className='flex h-150 w-full items-center justify-center overflow-auto bg-zinc-950 p-2 sm:p-4'>
        <div
          className={clsx(
            'h-full overflow-hidden rounded-xl border border-zinc-800 bg-white shadow-2xl transition-all duration-300',
            viewport === 'desktop'
              ? 'w-full'
              : viewport === 'tablet'
                ? 'w-3xl max-w-full'
                : 'w-93.75 max-w-full'
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
  )
}
