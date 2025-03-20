import { SkillDTO } from '../api/fetchData'
import { Icon } from './image/Icon'

interface ListProps {
	skill: SkillDTO
}

export const List = ({ skill }: ListProps) => {
	return (
		<li className="flex items-center justify-center">
			{skill.name}
			<Icon
				iconName={skill.image_key}
				alt={skill.name}
			/>
		</li>
	)
}
