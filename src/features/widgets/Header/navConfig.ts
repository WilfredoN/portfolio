export enum NavStatus {
  READY = 'READY',
  IN_CONSTRUCTION = 'IN_CONSTRUCTION'
}

export interface NavItem {
  label: string
  path: string
  status: NavStatus
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'About Me', path: '/about', status: NavStatus.READY },
  { label: 'Projects', path: '/projects', status: NavStatus.READY },
  { label: 'Feedback', path: '/feedback', status: NavStatus.IN_CONSTRUCTION }
]

export const CONSTRUCTION_PATHS = new Set(
  NAV_ITEMS.filter((i) => i.status === NavStatus.IN_CONSTRUCTION).map((i) => i.path)
)

export const DEFAULT_PATH =
  NAV_ITEMS.find((i) => i.status === NavStatus.READY)?.path ?? '/about'
