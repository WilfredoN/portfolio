import { List } from '@features/about/components/List'

interface SectionProps {
  items: { icon: string; text: string }[]
  title: string
}

export const Section = ({ title, items }: SectionProps) => {
  return (
    <section className='mr-0 mb-4 border sm:w-full md:mb-0 md:w-1/3 xl:mr-8'>
      <h2 className='border-b py-3 text-4xl'>{title}</h2>
      <List items={items} />
    </section>
  )
}
