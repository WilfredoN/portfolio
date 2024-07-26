import { motion } from 'framer-motion'
import Section from '../Components/AboutSection'
import AboutMe from '../Components/image/CapybaraBinary'
import {
	programmingLanguages,
	technologiesAndLibraries
} from '../Types/ListItems'
import { prevPageVariant } from '../Types/RouterVariants'

const About = () => {
	return (
		<motion.article
			className="mt-8 w-full"
			variants={prevPageVariant}
			initial="initial"
			animate="final"
		>
			<motion.aside>
				<AboutMe />
			</motion.aside>
			<div className="flex flex-col justify-center sm:flex-row mt-8 mb-8 w-full">
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
