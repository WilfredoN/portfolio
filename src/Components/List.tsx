import Icon from "./image/TableIcon"

interface ListProps {
	text: string
	icon: string
}

const List = ({ text, icon }: ListProps) => {
	return (
		<li className="flex items-center justify-center">
			{text}
			<Icon iconName={icon} alt={text} />
		</li>
	)
}

export default List
