export enum NavStatus {
  READY = 'READY',
  PROCESSING = 'PROCESSING',
  IN_CONSTRUCTION = 'IN_CONSTRUCTION'
}

export interface NavItem {
  label: string
  path: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Feedback', path: '/feedback' }
]

export const DEFAULT_PATH = NAV_ITEMS[0]?.path ?? '/about'
