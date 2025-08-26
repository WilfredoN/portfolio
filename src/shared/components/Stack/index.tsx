import { Icon } from '@shared/components/Icon'
import clsx from 'clsx'

export interface StackProps {
  className?: string
  items: string[]
  size?: 'medium' | 'large'
}

export const Stack = ({
  items,
  size = 'medium',
  className = ''
}: StackProps) => {
  return (
    <div
      className={clsx(
        'flex flex-row items-center justify-center gap-4',
        className
      )}
    >
      {items.map((item) => (
        <Icon key={item} alt={item} iconName={item} size={size} />
      ))}
    </div>
  )
}
