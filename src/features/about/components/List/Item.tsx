import { Icon } from '@shared/components/Icon'

interface ItemProps {
  text: string
  icon: string
}
export const Item = ({ text, icon }: ItemProps) => {
  return (
    <li className='flex items-center justify-center'>
      {text}
      <Icon iconName={icon} alt={text} />
    </li>
  )
}
