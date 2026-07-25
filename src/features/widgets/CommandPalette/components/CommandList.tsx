import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'

import type { CommandAction, CommandGroup } from '../types/command'

interface CommandListProps {
  filteredCommands: CommandAction[]
  groups: CommandGroup[]
  onSelectCommand: (command: CommandAction) => void
  selectedIndex: number
}

export const CommandList = ({
  groups,
  filteredCommands,
  selectedIndex,
  onSelectCommand
}: CommandListProps) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  if (filteredCommands.length === 0) {
    return (
      <div className='p-8 text-center text-sm text-(--color-text-muted)'>
        No commands found matching your search.
      </div>
    )
  }

  let globalIndexCounter = 0

  return (
    <div className='max-h-80 scrollbar-thin overflow-y-auto p-2'>
      {groups.map((group) => (
        <div key={group.category} className='mb-3'>
          <div className='px-3 py-1.5 text-xs font-semibold tracking-wider text-(--color-text-muted) uppercase'>
            {group.label}
          </div>
          <div className='flex flex-col gap-1'>
            {group.commands.map((command) => {
              const currentIndex = globalIndexCounter++
              const isSelected = currentIndex === selectedIndex

              return (
                <motion.div
                  key={command.id}
                  ref={(el) => {
                    itemRefs.current[currentIndex] = el
                  }}
                  animate={{ scale: isSelected ? 1.01 : 1 }}
                  className={`flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 ${
                    isSelected
                      ? 'border border-(--color-accent) bg-(--color-nav) font-semibold text-(--color-text) shadow-xs'
                      : 'text-(--color-text) hover:bg-current/5'
                  }`}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  onClick={() => onSelectCommand(command)}
                >

                  <div className='flex min-w-0 items-center gap-3'>
                    <span className='text-xl'>{command.icon}</span>
                    <div className='flex flex-col truncate'>
                      <span className='truncate text-sm leading-tight font-medium'>
                        {command.title}
                      </span>
                      {command.subtitle && (
                        <span className='truncate text-xs text-(--color-text-muted)'>
                          {command.subtitle}
                        </span>
                      )}
                    </div>
                  </div>
                  {command.shortcut && (
                    <kbd className='ml-2 shrink-0 rounded bg-current/10 px-2 py-0.5 font-mono text-xs opacity-75'>
                      {command.shortcut}
                    </kbd>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
