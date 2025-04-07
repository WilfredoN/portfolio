import { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'

interface MediaLinkProps {
	href: string
	icon: React.ReactNode
}

export const MediaLink = ({ href, icon }: MediaLinkProps) => {
	const { theme } = useContext(ThemeContext)
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={`rounded-xl p-2 transition-colors duration-150 ease-in-out ${
				theme === 'dark'
					? 'hover:bg-gray-600 hover:text-white'
					: 'hover:bg-neutral-600 hover:text-white'
			}`}
		>
			{icon}
		</a>
	)
}
