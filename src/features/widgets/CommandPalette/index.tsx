import { CommandModal } from './components/CommandModal'
import { useCommandKeyboard } from './hooks/useCommandKeyboard'
import { useCommandPalette } from './hooks/useCommandPalette'

export const CommandPaletteWidget = () => {
  const {
    isOpen,
    search,
    setSearch,
    selectedIndex,
    setSelectedIndex,
    filteredCommands,
    groupedCommands,
    closePalette,
    togglePalette,
    executeCommand
  } = useCommandPalette()

  useCommandKeyboard({
    isOpen,
    togglePalette,
    closePalette,
    filteredCommands,
    selectedIndex,
    setSelectedIndex,
    executeCommand
  })

  return (
    <>
      <CommandModal
        filteredCommands={filteredCommands}
        groupedCommands={groupedCommands}
        isOpen={isOpen}
        search={search}
        selectedIndex={selectedIndex}
        onClose={closePalette}
        onSearchChange={setSearch}
        onSelectCommand={executeCommand}
      />
    </>
  )
}

export { useCommandPalette }
