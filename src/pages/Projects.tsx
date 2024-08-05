import { motion } from 'framer-motion'
import ProjectDescription from '../components/ProjectDescription'
const Projects = () => {
	return (
		<motion.article
			className="mt-8 max-w-screen-xl text-left flex flex-col items-center justify-center"
			initial="initial"
			animate="final"
		>
			{/* <Gallery /> */}
			<ProjectDescription />
		</motion.article>
	)
}
export default Projects
