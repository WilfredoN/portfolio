import { motion } from 'motion/react'
import { Icon } from '../Icon/Icon'

interface TechnologyStackProps {
	technologies: string[]
	size?: 'medium' | 'large'
}

export const TechnologyStack = ({
	technologies,
	size = 'medium'
}: TechnologyStackProps) => {
	return (
		<motion.div className="flex flex-row justify-center items-center gap-4">
			{technologies.map(tech => (
				<Icon
					key={tech}
					iconName={tech}
					alt={tech}
					size={size}
				/>
			))}
		</motion.div>
	)
}
