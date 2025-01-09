import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { ProjectCard } from './projects/ProjectCard'

export const ProjectDescription = () => {
	return (
		<motion.section className="flex flex-row gap-8 flex-wrap items-center justify-center p-4 w-full">
			{projects.map(project => (
				<>
					<ProjectCard
						key={project.title}
						{...project}
					/>
				</>
			))}
			<motion.h1 className="text-4xl font-bold text-center">
				More projects coming soon...
			</motion.h1>
		</motion.section>
	)
}
