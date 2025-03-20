import { SkillDTO } from '../api/fetchData'
import { List } from './List'

interface SectionProps {
	title: string
	items: SkillDTO[]
}

export const Section = ({ title, items }: SectionProps) => {
	return (
		<section className="border mb-4 md:mb-0 md:w-96 mr-0 xl:mr-8 sm:w-full">
			<h2 className="border-b text-4xl">{title}</h2>
			<ul className="text-3xl">
				{items.map(skill => (
					<List
						key={skill.id}
						skill={skill}
					/>
				))}
			</ul>
		</section>
	)
}
