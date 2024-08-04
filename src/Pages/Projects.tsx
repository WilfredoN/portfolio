import { motion } from 'framer-motion'
import ProjectDescription from '../Components/ProjectDescription'
import { nextPageVariant } from '../Types/RouterVariants'
const Projects = () => {
	return (
		<motion.article
			className="mt-8 max-w-screen-xl text-left flex flex-col items-center justify-center"
			variants={nextPageVariant}
			initial="initial"
			animate="final"
		>
			{/* <Gallery /> */}
			<ProjectDescription />
		</motion.article>
	)
}
export default Projects
