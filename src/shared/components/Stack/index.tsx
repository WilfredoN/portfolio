import { Icon } from '@shared/components/Icon'
import clsx from 'clsx'
import { motion } from 'motion/react'

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
    <motion.div
      className={clsx(
        'flex flex-row items-center justify-center gap-4',
        className
      )}
    >
      {items.map((item) => (
        <Icon key={item} alt={item} iconName={item} size={size} />
      ))}
    </motion.div>
  )
}
