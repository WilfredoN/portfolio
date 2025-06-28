import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { fetchSkills } from '../../api/feedback'
import { Skill } from '../../types/feedback'
import { Icon } from '../Icon/Icon'
import {
	programmingLanguages,
	technologiesAndLibraries
} from '../../types/ListItems'

interface SkillSelectorProps {
	selectedSkills: number[]
	onSkillToggle: (skillId: number) => void
	error?: string
}

export const SkillSelector = ({
	selectedSkills,
	onSkillToggle,
	error
}: SkillSelectorProps) => {
	const [skills, setSkills] = useState<Skill[]>([])
	const [loading, setLoading] = useState(true)
	const [activeTab, setActiveTab] = useState<'programming' | 'technologies'>(
		'programming'
	)

	useEffect(() => {
		const loadSkills = async () => {
			try {
				const fetchedSkills = await fetchSkills()
				setSkills(fetchedSkills)
			} catch (error) {
				console.error('Failed to load skills:', error)
			} finally {
				setLoading(false)
			}
		}

		loadSkills()
	}, [])

	const programmingSkills = skills.filter(skill =>
		programmingLanguages.some(lang => lang.text === skill.name)
	)

	const technologySkills = skills.filter(skill =>
		technologiesAndLibraries.some(tech => tech.text === skill.name)
	)

	const currentSkills =
		activeTab === 'programming' ? programmingSkills : technologySkills

	const getIconName = (skillName: string): string => {
		const allSkills = [...programmingLanguages, ...technologiesAndLibraries]

		const skill = allSkills.find(skill => skill.text === skillName)
		return skill?.icon || 'default'
	}

	if (loading) {
		return (
			<div className="w-full">
				<label className="block text-lg font-medium mb-2 text-current">
					Skills & Technologies
				</label>
				<div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg"></div>
			</div>
		)
	}

	return (
		<motion.div
			className="w-full"
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<label className="block text-lg font-medium mb-2 text-current">
				Skills & Technologies
			</label>

			<div className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1 mb-4">
				<button
					type="button"
					onClick={() => setActiveTab('programming')}
					className={`
						flex-1 rounded-md py-2 px-3 text-sm font-medium transition-all duration-200
						${
							activeTab === 'programming'
								? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
								: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
						}
					`}
				>
					Programming Languages
				</button>
				<button
					type="button"
					onClick={() => setActiveTab('technologies')}
					className={`
						flex-1 rounded-md py-2 px-3 text-sm font-medium transition-all duration-200
						${
							activeTab === 'technologies'
								? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
								: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
						}
					`}
				>
					Technologies & Libraries
				</button>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
				{currentSkills.map(skill => (
					<motion.button
						key={skill.id}
						type="button"
						onClick={() => onSkillToggle(skill.id)}
						className={`
							flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200
							${
								selectedSkills.includes(skill.id)
									? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
									: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10'
							}
						`}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						transition={{ type: 'spring', stiffness: 300, damping: 25 }}
					>
						<Icon
							iconName={getIconName(skill.name)}
							size="medium"
						/>
						<span className="text-sm font-medium">{skill.name}</span>
						{selectedSkills.includes(skill.id) && (
							<motion.svg
								className="w-4 h-4 ml-auto"
								fill="currentColor"
								viewBox="0 0 20 20"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: 'spring', stiffness: 300, damping: 25 }}
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</motion.svg>
						)}
					</motion.button>
				))}
			</div>

			{selectedSkills.length > 0 && (
				<motion.div
					className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
				>
					<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
						Selected skills ({selectedSkills.length}):
					</p>
					<div className="flex flex-wrap gap-2">
						{selectedSkills.map(skillId => {
							const skill = skills.find(s => s.id === skillId)
							return skill ? (
								<motion.span
									key={skill.id}
									className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ type: 'spring', stiffness: 300, damping: 25 }}
								>
									{skill.name}
									<button
										type="button"
										onClick={() => onSkillToggle(skill.id)}
										className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
									>
										×
									</button>
								</motion.span>
							) : null
						})}
					</div>
				</motion.div>
			)}

			{error && (
				<motion.p
					className="mt-2 text-sm text-red-500 dark:text-red-400"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
				>
					{error}
				</motion.p>
			)}
		</motion.div>
	)
}
