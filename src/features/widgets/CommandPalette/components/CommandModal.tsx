import { AnimatePresence, motion } from 'motion/react'

import type { CommandAction, CommandGroup } from '../types/command'

import { CommandInput } from './CommandInput'
import { CommandList } from './CommandList'

interface CommandModalProps {
  filteredCommands: CommandAction[]
  groupedCommands: CommandGroup[]
  isOpen: boolean
  onClose: () => void
  onSearchChange: (val: string) => void
  onSelectCommand: (cmd: CommandAction) => void
  search: string
  selectedIndex: number
}

export const CommandModal = ({
  isOpen,
  onClose,
  search,
  onSearchChange,
  groupedCommands,
  filteredCommands,
  selectedIndex,
  onSelectCommand
}: CommandModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-start justify-center px-4 pt-24'>
          <motion.div
            animate={{ opacity: 1 }}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm'
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className='relative w-full max-w-xl overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-bg-card) text-(--color-text) shadow-md backdrop-blur-xl'
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          >
            <CommandInput
              search={search}
              onClose={onClose}
              onSearchChange={onSearchChange}
            />
            <CommandList
              filteredCommands={filteredCommands}
              groups={groupedCommands}
              selectedIndex={selectedIndex}
              onSelectCommand={onSelectCommand}
            />
            <div className='flex items-center justify-between border-t border-(--color-border) px-4 py-2 text-xs text-(--color-text-muted)'>
              <span>
                Use{' '}
                <kbd className='rounded bg-current/10 px-1 py-0.5 font-mono'>
                  ↑
                </kbd>{' '}
                <kbd className='rounded bg-current/10 px-1 py-0.5 font-mono'>
                  ↓
                </kbd>{' '}
                to navigate
              </span>
              <span>
                <kbd className='rounded bg-current/10 px-1 py-0.5 font-mono'>
                  ↵
                </kbd>{' '}
                to select
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
