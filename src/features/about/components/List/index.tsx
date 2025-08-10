import type { IconVariant } from '@shared/components/Icon'

import { Item } from '@features/about/components/List/Item'

interface ListProps {
  items: { icon: string; text: string; type?: IconVariant }[]
}

export const List = ({ items }: ListProps) => {
  return (
    <ul className='flex flex-row flex-wrap items-center justify-evenly gap-4 p-4 text-3xl'>
      {items.map((item, index) => (
        <Item key={index} icon={item.icon} text={item.text} type={item.type} />
      ))}
    </ul>
  )
}
