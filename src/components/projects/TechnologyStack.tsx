import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { fetchSkills, SkillDTO } from '../../api/fetchData'
import { Icon } from '../image/Icon'

interface TechnologyStackProps {
	technologies: string[]
	size?: 'medium' | 'large'
}

export const TechnologyStack = ({
	technologies,
	size = 'medium'
}: TechnologyStackProps) => {
	const [skills, setSkills] = useState<Record<string, SkillDTO>>({})

	useEffect(() => {
		const loadSkills = async () => {
			try {
				const skillsData = await fetchSkills()
				const skillsMap = skillsData.reduce(
					(acc, skill) => {
						acc[skill.image_key] = skill
						return acc
					},
					{} as Record<string, SkillDTO>
				)
				setSkills(skillsMap)
			} catch (error) {
				console.error('Error fetching skills:', error)
			}
		}

		loadSkills()
	}, [])

	return (
		<motion.div className="flex flex-row justify-center items-center gap-4">
			{technologies.map(tech => (
				<Icon
					key={tech}
					iconName={tech}
					alt={skills[tech]?.name || tech}
					size={size}
				/>
			))}
		</motion.div>
	)
}
