import List from './List'

interface SectionProps {
	title: string
	items: { text: string; icon: string }[]
}

export const Section = ({ title, items }: SectionProps) => {
	return (
		<section className="border mb-4 md:mb-0 md:w-96 mr-0 xl:mr-8 sm:w-full">
			<h2 className="border-b text-4xl">{title}</h2>
			<ul className="text-3xl">
				{items.map((item, index) => (
					<List
						key={index}
						text={item.text}
						icon={item.icon}
					/>
				))}
			</ul>
		</section>
	)
}
