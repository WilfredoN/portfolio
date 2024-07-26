import { motion } from "framer-motion"
import ProjectDescription from "../Components/ProjectDescription"
import { nextPageVariant } from "../Types/RouterVariants"

const Projects = () => (
	<>
		<ProjectDescription />
		<motion.article
			className="mt-8 w-full text-left flex flex-col items-center justify-center"
			variants={nextPageVariant}
			initial="initial"
			animate="final"
		>
			{/* <Gallery /> */}
		</motion.article>
	</>
)

export default Projects
