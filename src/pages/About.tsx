import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { fetchSkills, SkillDTO } from '../api/fetchData'
import { MainInfo } from '../components/about/MainInfo'
import { Section } from '../components/AboutSection'
import { Footer } from '../components/Footer'
import { groupSkillsByCategory } from '../types/ListItems'

export const About = () => {
	const [skills, setSkills] = useState<Record<string, SkillDTO[]>>({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const loadSkills = async () => {
			try {
				const skillsData = await fetchSkills()
				setSkills(groupSkillsByCategory(skillsData))
			} catch (error) {
				console.error('Error fetching skills:', error)
			} finally {
				setIsLoading(false)
			}
		}

		loadSkills()
	}, [])

	return (
		<motion.article
			className="mt-8 max-w-screen-2xl flex items-center justify-center flex-col"
			initial="initial"
			animate="final"
		>
			<motion.aside>
				<MainInfo />
			</motion.aside>
			<h2 className="text-4xl">My skills</h2>

			{isLoading ? (
				<p>Loading skills...</p>
			) : (
				<div className="flex flex-col justify-center sm:flex-row mt-4 mb-8 w-full">
					{Object.entries(skills).map(([category, items]) => (
						<Section
							key={category}
							title={category.charAt(0).toUpperCase() + category.slice(1)}
							items={items}
						/>
					))}
				</div>
			)}

			<Footer />
		</motion.article>
	)
}
