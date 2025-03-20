import { motion } from 'framer-motion'
import { useSkills } from '../../hooks/useSkills'
import { Icon } from '../image/Icon'

interface TechnologyStackProps {
	technologies: string[]
	size?: 'medium' | 'large'
}

export const TechnologyStack = ({
	technologies,
	size = 'medium'
}: TechnologyStackProps) => {
	const { skillsMap } = useSkills()

	return (
		<motion.div className="flex flex-row justify-center items-center gap-4">
			{technologies.map(tech => (
				<Icon
					key={tech}
					iconName={tech}
					alt={skillsMap[tech]?.name || tech}
					size={size}
				/>
			))}
		</motion.div>
	)
}
