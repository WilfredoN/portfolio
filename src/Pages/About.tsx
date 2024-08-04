import { motion } from 'framer-motion'
import Section from '../Components/AboutSection'
import AboutMe from '../Components/image/CapybaraBinary'
import {
	programmingLanguages,
	technologiesAndLibraries
} from '../Types/ListItems'

const About = () => {
	return (
		<motion.article
			className="mt-8 max-w-screen-xl flex items-center justify-center flex-col"
			initial="initial"
			animate="final"
		>
			<motion.aside>
				<AboutMe />
			</motion.aside>
			<h2 className="text-4xl ">My skills</h2>
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
		</motion.article>
	)
}

export default About
