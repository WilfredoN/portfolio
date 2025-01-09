import { motion } from 'framer-motion'
import { TechnologyStack } from './TechnologyStack'

interface ProjectCardProps {
	title: string
	description: string
	technologies: string[]
	link: string
	imageUrl?: string
	imageTitle?: string
	imageStyle?: string
	additionalDescription?: React.ReactNode
}

export const ProjectCard = ({
	title,
	description,
	technologies,
	link,
	imageUrl,
	imageTitle,
	imageStyle,
	additionalDescription
}: ProjectCardProps) => {
	return (
		<motion.div className="mb-12 w-full hover:scale-105 transition-transform duration-100 max-w-[31.25rem] border-3 rounded-lg p-4">
			<motion.h1
				className="text-4xl text-center flex items-center flex-col"
				initial="initial"
				animate="final"
			>
				{imageUrl ? (
					<motion.img
						src={imageUrl}
						alt={title}
						title={imageTitle}
						className={imageStyle || 'px-4 py-2 rounded-md my-2'}
					/>
				) : (
					<span className="my-6 font-['Courgette'] text-[4rem] text-[#5287AD]">
						<a href={link}>{title}</a>
					</span>
				)}
				<div className="text-[1.7rem] mt-4">
					{description}
					{additionalDescription && (
						<div className="mt-2">{additionalDescription}</div>
					)}
				</div>
			</motion.h1>

			<div className="mt-6">
				<h3 className="text-3xl text-center mb-2">Technologies used:</h3>
				<TechnologyStack technologies={technologies} />
			</div>
		</motion.div>
	)
}
