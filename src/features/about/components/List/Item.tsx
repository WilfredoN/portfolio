import type { IconVariant } from '@shared/components/Icon'

import { Icon } from '@shared/components/Icon'

interface ItemProps {
  icon: string
  text: string
  type?: IconVariant
}
export const Item = ({ text, icon, type }: ItemProps) => {
  return (
    <li className='flex flex-auto items-center justify-between gap-3 rounded-md border border-zinc-700/30 bg-zinc-800/20 px-3.5 py-2 transition-all duration-150 select-none hover:bg-zinc-800/40'>
      <span className='whitespace-nowrap'>{text}</span>
      <Icon alt={`${text} icon`} iconName={icon} type={type} />
    </li>
  )
}
