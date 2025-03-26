import { motion } from 'motion/react'
import { MainInfo } from '../components/about/MainInfo'
import { Section } from '../components/AboutSection'
import { Footer } from '../components/Footer'
import {
    programmingLanguages,
    technologiesAndLibraries
} from '../types/ListItems'

export const About = () => {
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
			<div className="flex flex-col justify-center sm:flex-row mt-4 mb-8 w-full">
				<Section
					title="Programming Languages"
					items={programmingLanguages}
				/>
				<Section
					title="Technologies and Libraries"
					items={technologiesAndLibraries}
				/>
			</div>
			<Footer />

		</motion.article>
	)
}
