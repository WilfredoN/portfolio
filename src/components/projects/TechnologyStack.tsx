import { motion } from 'framer-motion'
import { Icon } from '../image/Icon'

interface TechnologyStackProps {
	technologies: string[]
}

export const TechnologyStack = ({ technologies }: TechnologyStackProps) => {
	return (
		<motion.div className="flex flex-row justify-center items-center gap-4">
			{technologies.map(tech => (
				<Icon
					key={tech}
					iconName={tech}
					alt={tech}
				/>
			))}
		</motion.div>
	)
}
