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
        className='w-full border-none bg-transparent p-0 text-base text-(--color-text) placeholder-(--color-text-muted) outline-none focus:border-none focus:shadow-none focus:ring-0 focus:outline-none'
        placeholder='Type a command or search page...'
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className='ml-2 flex items-center gap-1.5'>
        <kbd className='rounded bg-current/10 px-2 py-0.5 font-mono text-xs text-(--color-text-muted)'>
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
