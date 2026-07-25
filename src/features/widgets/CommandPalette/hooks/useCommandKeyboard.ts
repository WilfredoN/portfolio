import { useEffect } from 'react'

import type { CommandAction } from '../types/command'

interface UseCommandKeyboardProps {
  closePalette: () => void
  executeCommand: (cmd: CommandAction) => void
  filteredCommands: CommandAction[]
  isOpen: boolean
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  togglePalette: () => void
}

export const useCommandKeyboard = ({
  isOpen,
  togglePalette,
  closePalette,
  filteredCommands,
  selectedIndex,
  setSelectedIndex,
  executeCommand
}: UseCommandKeyboardProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Command Palette on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        togglePalette()
        return
      }

      if (!isOpen) {return}

      if (e.key === 'Escape') {
        e.preventDefault()
        closePalette()
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => {
          if (filteredCommands.length === 0) {return 0}
          const validPrev = prev >= filteredCommands.length || prev < 0 ? 0 : prev
          return validPrev === filteredCommands.length - 1 ? 0 : validPrev + 1
        })
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => {
          if (filteredCommands.length === 0) {return 0}
          const validPrev = prev >= filteredCommands.length || prev < 0 ? 0 : prev
          return validPrev === 0 ? filteredCommands.length - 1 : validPrev - 1
        })
        return
      }


      if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    isOpen,
    togglePalette,
    closePalette,
    filteredCommands,
    selectedIndex,
    setSelectedIndex,
    executeCommand
  ])
}
