import ListItem from './List/ListItem'

interface SectionProps {
  title: string
  items: { text: string, icon: string }[]
}

export const Section = ({ title, items }: SectionProps) => {
  return (
    <section className="border mb-4 md:mb-0 md:w-1/3 mr-0 xl:mr-8 sm:w-full">
      <h2 className="border-b text-4xl py-3">{title}</h2>
      <ul className="text-3xl flex flex-row flex-wrap justify-evenly items-center gap-4 p-4">
        {items.map((item, index) => (
          <ListItem
            key={index}
            text={item.text}
            icon={item.icon}
          />
        ))}
      </ul>
    </section>
  )
}
