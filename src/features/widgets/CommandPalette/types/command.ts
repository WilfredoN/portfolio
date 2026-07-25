export type CommandCategory = 'navigation' | 'actions' | 'theme'

export interface CommandAction {
  category: CommandCategory
  icon: string
  id: string
  perform: () => void
  shortcut?: string
  subtitle?: string
  title: string
}

export interface CommandGroup {
  category: CommandCategory
  commands: CommandAction[]
  label: string
}
