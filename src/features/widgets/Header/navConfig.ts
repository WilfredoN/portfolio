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

/**
 * Easy-to-manage percentage configuration for header minimization stages.
 * Values represent percent of total scrollable page height (0 to 100%).
 */
export interface HeaderStageConfig {
  /** Percent of page scroll when Stage 2 (Compact Pill) activates */
  compactStartPercent: number
  /** Percent of page scroll when Stage 3 (Micro Status Dot) activates */
  microStartPercent: number
  /** Percent of page scroll when Stage 4 (Header Auto-Hide) activates */
  hideStartPercent: number
  /** Minimum pixel offset for Stage 2 on short pages */
  minCompactPx?: number
  /** Minimum pixel offset for Stage 3 on short pages */
  minMicroPx?: number
}

export const HEADER_STAGE_CONFIG: HeaderStageConfig = {
  compactStartPercent: 3,
  microStartPercent: 30,
  hideStartPercent: 50,
  minCompactPx: 60,
  minMicroPx: 250
}
