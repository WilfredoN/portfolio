import { Icon } from '../Icon/Icon'

interface ListProps {
	text: string
	icon: string
}

const ListItem = ({ text, icon }: ListProps) => {
	return (
		<li className="flex items-center justify-center">
			{text}
			<Icon
				iconName={icon}
				alt={text}
			/>
		</li>
	)
}

export default ListItem
