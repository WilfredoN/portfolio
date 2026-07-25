export const getOSKeySymbol = (): { label: string; name: string } => {
  if (typeof window === 'undefined') {
    return { label: '⌘K', name: 'Cmd+K' }
  }

  const isMac = /Mac|iPod|iPhone|iPad/.test(
    navigator.platform || navigator.userAgent
  )

  return isMac
    ? { label: '⌘K', name: 'Cmd+K' }
    : { label: 'Ctrl+K', name: 'Ctrl+K' }
}
