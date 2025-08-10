import type { IconVariant } from '@shared/components/Icon';

import { Icon } from '@shared/components/Icon'

interface ItemProps {
  icon: string
  text: string
  type?: IconVariant
}
export const Item = ({ text, icon, type }: ItemProps) => {
  return (
    <li className='flex items-center justify-center'>
      {text}
      <Icon alt={`${text} icon`} iconName={icon} type={type} />
    </li>
  )
}
