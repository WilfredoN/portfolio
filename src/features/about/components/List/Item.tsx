import { Icon } from '@shared/components/Icon'

interface ItemProps {
  icon: string
  text: string
}
export const Item = ({ text, icon }: ItemProps) => {
  return (
    <li className='flex items-center justify-center'>
      {text}
      <Icon alt={text} iconName={icon} />
    </li>
  )
}
