import type { Category } from '@features/projects/data/projects'

import { useTheme } from '@app/hooks/useTheme'
import { CATEGORIES } from '@features/projects/data/projects'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import {
  BUTTON_BASE,
  getCategoryStyles,
  getResetStyles,
  getTagItemStyles,
  getTagToggleStyles
} from './styles'

interface FilterPanelProps {
  activeCategories: Category[]
  allTags: string[]
  onCategoryChange: (category: Category) => void
  onResetFilters: () => void
  onToggleTag: (tag: string) => void
  projectCount: number
  selectedTags: string[]
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
                    BUTTON_BASE.category,
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
              className={getTagToggleStyles(
                isOpen,
                hasFilters,
                isFilterDisabled,
                isDarkTheme
              )}
              disabled={isFilterDisabled}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Tags</span>
            </button>

            <button
              className={getResetStyles(canReset, isDarkTheme)}
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
                        className={getTagItemStyles(isActive, isDarkTheme)}
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
