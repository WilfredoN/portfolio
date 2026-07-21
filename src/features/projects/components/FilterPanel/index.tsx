import type { Category } from '@features/projects/data/projects'

import { CATEGORIES } from '@features/projects/data/projects'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

interface FilterPanelProps {
  activeCategories: Category[]
  allTags: string[]
  onCategoryChange: (category: Category) => void
  onClearFilters: () => void
  onToggleTag: (tag: string) => void
  projectCount: number
  selectedTags: string[]
}

const getCategoryStyles = (
  color: 'blue' | 'purple' | 'emerald',
  isActive: boolean
) => {
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
}

export const FilterPanel = ({
  activeCategories,
  allTags,
  projectCount,
  selectedTags,
  onCategoryChange,
  onClearFilters,
  onToggleTag
}: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasFilters = selectedTags.length > 0

  return (
    <div className='mb-4 flex w-full flex-col gap-4 border-b border-zinc-800 pb-6 select-none'>
      <div className='flex w-full max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-baseline gap-2'>
          <span className='text-3xl font-bold text-(--color-text)'>
            Projects
          </span>
          <span className='text-xl font-medium text-zinc-500'>
            ({projectCount})
          </span>
        </div>

        <div className='flex flex-wrap items-center gap-6'>
          <div className='flex gap-4 pb-1 select-none'>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategories.includes(cat.id)
              return (
                <button
                  key={cat.id}
                  className={clsx(
                    'flex cursor-pointer items-center gap-2 rounded-xl border-2 px-5 py-2 text-lg font-extrabold tracking-wide uppercase transition-all duration-150',
                    getCategoryStyles(cat.color, isActive)
                  )}
                  onClick={() => onCategoryChange(cat.id)}
                >
                  <span>{cat.emoji}</span> {cat.label}
                </button>
              )
            })}
          </div>

          <button
            className={clsx(
              'flex cursor-pointer items-center gap-2 rounded-full border px-4 py-1.5 text-xl transition-all duration-200',
              isOpen || hasFilters
                ? 'border-blue-500/80 bg-blue-500/10 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                : 'border-zinc-700/50 bg-zinc-800/30 text-zinc-400 hover:bg-zinc-700/30 hover:text-zinc-300'
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>Filter by Tag</span>
            {hasFilters && (
              <span className='flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white'>
                {selectedTags.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            animate={{ height: 'auto', opacity: 1 }}
            className='w-full overflow-hidden'
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className='flex w-full justify-center'>
              <div className='flex w-full max-w-6xl flex-col items-center gap-4 border-t border-zinc-800/40 px-4 pt-4'>
                <div className='flex w-full flex-wrap justify-center gap-3'>
                  {allTags.map((tag) => {
                    const isActive = selectedTags.includes(tag)
                    return (
                      <motion.button
                        key={tag}
                        className={clsx(
                          'cursor-pointer rounded-full border px-4 py-1.5 text-xl transition-all duration-200 select-none',
                          isActive
                            ? 'border-blue-500/80 bg-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                            : 'border-zinc-700/50 bg-zinc-800/30 text-zinc-400 hover:bg-zinc-700/30 hover:text-zinc-300'
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
                {hasFilters && (
                  <button
                    className='mt-2 cursor-pointer rounded-md border border-red-500/30 px-3 py-1 text-xl text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300'
                    onClick={onClearFilters}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
