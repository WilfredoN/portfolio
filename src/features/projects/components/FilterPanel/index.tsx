import type { Category } from '@features/projects/data/projects'

import { useTheme } from '@app/hooks/useTheme'
import { CATEGORIES } from '@features/projects/data/projects'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

interface FilterPanelProps {
  activeCategories: Category[]
  allTags: string[]
  onCategoryChange: (category: Category) => void
  onResetFilters: () => void
  onToggleTag: (tag: string) => void
  projectCount: number
  selectedTags: string[]
}

const getCategoryStyles = (
  color: 'blue' | 'purple' | 'emerald',
  isActive: boolean,
  isDarkTheme: boolean
) => {
  if (isDarkTheme) {
    if (isActive) {
      if (color === 'blue') {
        return 'border-blue-500/80 bg-blue-500/25 text-blue-400 translate-y-1 shadow-none'
      }
      if (color === 'purple') {
        return 'border-purple-500/80 bg-purple-500/25 text-purple-400 translate-y-1 shadow-none'
      }
      return 'border-emerald-500/80 bg-emerald-500/25 text-emerald-400 translate-y-1 shadow-none'
    }
    return 'border-zinc-700 bg-zinc-800/40 text-zinc-400 translate-y-0 shadow-[0_4px_0_#3f3f46] hover:bg-zinc-700/40 hover:text-zinc-300 hover:translate-y-0.5 hover:shadow-[0_2px_0_#3f3f46]'
  } else {
    if (isActive) {
      if (color === 'blue') {
        return 'border-blue-600 bg-blue-50/90 text-blue-800 translate-y-1 shadow-none'
      }
      if (color === 'purple') {
        return 'border-purple-600 bg-purple-50/90 text-purple-800 translate-y-1 shadow-none'
      }
      return 'border-emerald-600 bg-emerald-50/90 text-emerald-800 translate-y-1 shadow-none'
    }
    return 'border-zinc-300 bg-white/70 text-zinc-600 translate-y-0 shadow-[0_4px_0_#b3d9ff] hover:bg-white hover:text-zinc-800 hover:translate-y-0.5 hover:shadow-[0_2px_0_#b3d9ff]'
  }
}

export const FilterPanel = ({
  activeCategories,
  allTags,
  projectCount,
  selectedTags,
  onCategoryChange,
  onResetFilters,
  onToggleTag
}: FilterPanelProps) => {
  const { isDarkTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [rotation, setRotation] = useState(0)
  const hasFilters = selectedTags.length > 0
  const isFilterDisabled = allTags.length === 0
  const showFilterPanel = isOpen && !isFilterDisabled

  const isDefaultCategories =
    activeCategories.length === 2 &&
    activeCategories.includes('web-app') &&
    activeCategories.includes('game')
  const canReset = !isDefaultCategories || selectedTags.length > 0

  const handleResetClick = () => {
    if (canReset) {
      setRotation((prev) => prev + 360)
      onResetFilters()
    }
  }

  return (
    <div className='mb-4 flex w-full flex-col gap-4 border-b border-zinc-800 pb-6 select-none'>
      <div className='flex w-full max-w-5xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-baseline gap-2'>
          <span className='text-3xl font-bold text-(--color-text)'>
            Projects
          </span>
          <span className='text-xl font-medium text-zinc-500'>
            ({projectCount})
          </span>
        </div>

        <div className='flex flex-wrap items-center gap-4 sm:gap-6'>
          <div className='flex flex-wrap gap-3 pb-1 select-none sm:gap-4'>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategories.includes(cat.id)
              return (
                <button
                  key={cat.id}
                  className={clsx(
                    'flex cursor-pointer items-center gap-2 rounded-xl border-2 px-5 py-2 text-lg font-extrabold tracking-wide uppercase transition-all duration-150',
                    getCategoryStyles(cat.color, isActive, isDarkTheme)
                  )}
                  onClick={() => onCategoryChange(cat.id)}
                >
                  <span>{cat.emoji}</span> {cat.label}
                </button>
              )
            })}
          </div>

          <div className='flex items-center gap-3'>
            <button
              className={clsx(
                'flex items-center gap-2 rounded-full border px-4 py-1.5 text-xl transition-all duration-200',
                isFilterDisabled
                  ? isDarkTheme
                    ? 'cursor-not-allowed border-zinc-800 bg-zinc-800/10 text-zinc-600 opacity-50'
                    : 'cursor-not-allowed border-zinc-200 bg-zinc-100/50 text-zinc-400 opacity-50'
                  : 'cursor-pointer',
                !isFilterDisabled && (isOpen || hasFilters)
                  ? isDarkTheme
                    ? 'border-blue-500/80 bg-blue-500/10 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                    : 'border-blue-600 bg-blue-50/80 text-blue-700 shadow-[0_0_10px_rgba(37,99,235,0.1)]'
                  : !isFilterDisabled &&
                      (isDarkTheme
                        ? 'border-zinc-700/50 bg-zinc-800/30 text-zinc-400 hover:bg-zinc-700/30 hover:text-zinc-300'
                        : 'border-zinc-300 bg-white/70 text-zinc-600 hover:bg-white hover:text-zinc-800')
              )}
              disabled={isFilterDisabled}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Tags</span>
            </button>

            <button
              className={clsx(
                'flex h-[42px] w-[42px] items-center justify-center rounded-full border transition-all duration-200',
                !canReset
                  ? isDarkTheme
                    ? 'cursor-not-allowed border-zinc-800 bg-zinc-800/10 text-zinc-600 opacity-40'
                    : 'cursor-not-allowed border-zinc-200 bg-zinc-100/50 text-zinc-400 opacity-40'
                  : isDarkTheme
                    ? 'cursor-pointer border-red-500/40 bg-red-500/10 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.15)] hover:border-red-500/60 hover:bg-red-500/20 hover:text-red-300'
                    : 'cursor-pointer border-red-600 bg-red-50/80 text-red-700 shadow-[0_0_10px_rgba(220,38,38,0.1)] hover:border-red-600 hover:bg-red-100/80 hover:text-red-800'
              )}
              disabled={!canReset}
              onClick={handleResetClick}
            >
              <motion.svg
                animate={{ rotate: rotation }}
                className='h-5 w-5'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2.5'
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' />
                <path d='M21 3v5h-5' />
                <path d='M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' />
                <path d='M3 21v-5h5' />
              </motion.svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {showFilterPanel && (
          <motion.div
            animate={{ height: 'auto', opacity: 1 }}
            className='w-full overflow-hidden'
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className='flex w-full justify-center'>
              <div className='flex w-full max-w-5xl flex-col items-center gap-4 border-t border-zinc-800/40 px-4 pt-4'>
                <div className='flex w-full flex-wrap justify-center gap-3'>
                  {allTags.map((tag) => {
                    const isActive = selectedTags.includes(tag)
                    return (
                      <motion.button
                        key={tag}
                        layout
                        className={clsx(
                          'cursor-pointer rounded-full border px-4 py-1.5 text-xl transition-all duration-200 select-none',
                          isActive
                            ? isDarkTheme
                              ? 'border-blue-500/80 bg-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                              : 'border-blue-600 bg-blue-50/80 text-blue-700 shadow-[0_0_12px_rgba(37,99,235,0.15)]'
                            : isDarkTheme
                              ? 'border-zinc-700/50 bg-zinc-800/30 text-zinc-400 hover:bg-zinc-700/30 hover:text-zinc-300'
                              : 'border-zinc-300 bg-white/70 text-zinc-600 hover:bg-white hover:text-zinc-800'
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onToggleTag(tag)}
                      >
                        #{tag}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
