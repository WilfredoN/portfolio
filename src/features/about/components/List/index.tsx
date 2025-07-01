import { Item } from '@features/about/components/List/Item'

interface ListProps {
  items: { icon: string; text: string; }[]
}

export const List = ({ items }: ListProps) => {
  return (
    <ul className='text-3xl flex flex-row flex-wrap justify-evenly items-center gap-4 p-4'>
      {items.map((item, index) => (
        <Item key={index} icon={item.icon} text={item.text} />
      ))}
    </ul>
  )
}
