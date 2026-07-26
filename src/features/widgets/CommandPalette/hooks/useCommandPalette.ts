import { useTheme } from '@app/hooks/useTheme'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { CommandAction, CommandGroup } from '../types/command'

import { createCommands } from '../config/actionsConfig'

export const useCommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const navigate = useNavigate()
  const { isDarkTheme, toggleTheme } = useTheme()

  const commands = useMemo(
    () => createCommands({ navigate, toggleTheme, isDarkTheme }),
    [navigate, toggleTheme, isDarkTheme]
  )

  const filteredCommands = useMemo(() => {
    if (!search.trim()) {
      return commands
    }
    const query = search.toLowerCase().trim()
    const queryNoSpaces = query.replace(/\s+/g, '')

    return commands.filter((cmd) => {
      const titleMatch = cmd.title.toLowerCase().includes(query)
      const subtitleMatch = cmd.subtitle?.toLowerCase().includes(query)
      const categoryMatch = cmd.category.toLowerCase().includes(query)
      const shortcutMatch =
        cmd.shortcut &&
        (cmd.shortcut.toLowerCase().includes(query) ||
          cmd.shortcut
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(queryNoSpaces))

      return titleMatch || subtitleMatch || categoryMatch || shortcutMatch
    })
  }, [commands, search])

  const groupedCommands = useMemo(() => {
    const groups: CommandGroup[] = []
    const categoryLabels: Record<string, string> = {
      navigation: 'Navigation',
      theme: 'Theme Settings',
      actions: 'Quick Actions',
      social: 'Social Profiles & Links'
    }

    filteredCommands.forEach((cmd) => {
      let group = groups.find((g) => g.category === cmd.category)
      if (!group) {
        group = {
          category: cmd.category,
          label: categoryLabels[cmd.category] || 'Commands',
          commands: []
        }
        groups.push(group)
      }
      group.commands.push(cmd)
    })

    return groups
  }, [filteredCommands])

  const openPalette = useCallback(() => {
    setIsOpen(true)
    setSearch('')
    setSelectedIndex(0)
  }, [])

  const closePalette = useCallback(() => {
    setIsOpen(false)
    setSearch('')
    setSelectedIndex(0)
  }, [])

  const togglePalette = useCallback(() => {
    setIsOpen((prev) => !prev)
    setSearch('')
    setSelectedIndex(0)
  }, [])

  const executeCommand = useCallback(
    (cmd: CommandAction) => {
      closePalette()
      cmd.perform()
    },
    [closePalette]
  )

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    setSelectedIndex(0)
  }, [])

  return {
    isOpen,
    search,
    setSearch: handleSearchChange,
    selectedIndex,
    setSelectedIndex,
    filteredCommands,
    groupedCommands,
    openPalette,
    closePalette,
    togglePalette,
    executeCommand
  }
}
