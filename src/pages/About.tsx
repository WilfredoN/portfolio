import { motion } from 'framer-motion'
import { MainInfo } from '../components/about/MainInfo'
import { Section } from '../components/AboutSection'
import { Footer } from '../components/Footer'
import { useSkills } from '../hooks/useSkills'

export const About = () => {
	const { categorizedSkills, loading } = useSkills()

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

			{loading ? (
				<p>Loading skills...</p>
			) : (
				<div className="flex flex-col justify-center sm:flex-row mt-4 mb-8 w-full">
					{Object.entries(categorizedSkills).map(([category, items]) => (
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
