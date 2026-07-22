import type { IconVariant } from '@shared/components/Icon'

import { Item } from '@features/about/components/List/Item'

interface ListProps {
  items: { icon: string; text: string; type?: IconVariant }[]
}

export const List = ({ items }: ListProps) => {
  return (
    <ul className='flex flex-wrap gap-3 p-4 text-xl font-medium sm:text-2xl'>
      {items.map((item, index) => (
        <Item key={index} icon={item.icon} text={item.text} type={item.type} />
      ))}
    </ul>
  )
}
