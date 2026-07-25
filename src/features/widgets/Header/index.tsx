import { ClassicHeader } from './ClassicHeader'
import { DynamicIslandHeader } from './DynamicIslandHeader'

export interface HeaderProps {
  variant?: 'dynamic-island' | 'classic'
}

export const Header = ({ variant = 'dynamic-island' }: HeaderProps) => {
  if (variant === 'classic') {
    return <ClassicHeader />
  }

  return <DynamicIslandHeader />
}
