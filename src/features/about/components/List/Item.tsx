import type { IconVariant } from '@shared/components/Icon'

import { useTheme } from '@app/hooks/useTheme'
import { Icon } from '@shared/components/Icon'
import clsx from 'clsx'

interface ItemProps {
  icon: string
  text: string
  type?: IconVariant
}

export const Item = ({ text, icon, type }: ItemProps) => {
  const { isDarkTheme } = useTheme()

  return (
    <li
      className={clsx(
        'flex flex-auto items-center justify-between gap-3 rounded-md border px-3.5 py-2 transition-all duration-200 select-none',
        isDarkTheme
          ? 'border-zinc-700/50 bg-zinc-800/40 text-zinc-200 hover:-translate-y-0.5 hover:border-blue-400/80 hover:bg-zinc-700/80 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.35)]'
          : 'border-blue-200/80 bg-white/70 text-zinc-800 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-white hover:text-blue-900 hover:shadow-[0_4px_12px_rgba(0,86,179,0.12)]'
      )}
    >
      <span className='font-medium whitespace-nowrap'>{text}</span>
      <Icon alt={`${text} icon`} iconName={icon} type={type} />
    </li>
  )
}
