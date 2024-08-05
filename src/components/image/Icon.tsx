interface IconProps {
	iconName: string
	alt?: string
	title?: string
}

export const Icon = ({ iconName, alt, title }: IconProps) => {
	const src = `https://raw.githubusercontent.com/devicons/devicon/0cb57ede339bb83cb2b3f35bec861dd962c01dea/icons/${iconName}/${iconName}-original.svg`
	return (
		<img
			className="ml-2 w-8 h-8"
			src={src}
			alt={alt}
			title={title}
		/>
	)
}
