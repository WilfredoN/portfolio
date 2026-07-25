interface CommandInputProps {
  onClose: () => void
  onSearchChange: (value: string) => void
  search: string
}

export const CommandInput = ({
  search,
  onSearchChange,
  onClose
}: CommandInputProps) => {
  return (
    <div className='flex items-center border-b border-(--color-border) px-4 py-3'>
      <span className='mr-3 text-lg opacity-70'>🔍</span>
      <input
        autoFocus
        className='w-full bg-transparent text-base text-(--color-text) placeholder-(--color-text-muted) outline-none border-none p-0 focus:outline-none focus:ring-0 focus:border-none focus:shadow-none'
        placeholder='Type a command or search page...'
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className='flex items-center gap-1.5 ml-2'>
        <kbd className='rounded bg-current/10 px-2 py-0.5 text-xs text-(--color-text-muted) font-mono'>
          ESC
        </kbd>
        <button
          aria-label='Close command palette'
          className='text-sm opacity-50 hover:opacity-100'
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>

  )
}
