import { motion } from 'motion/react'
import { Feedback } from '../../types/feedback'
import { Icon } from '../Icon/Icon'

interface FeedbackItemProps {
	feedback: Feedback
	index: number
}

export const FeedbackItem = ({ feedback, index }: FeedbackItemProps) => {
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	// Helper function to get icon name for skill
	const getIconName = (skillName: string): string => {
		const iconMap: Record<string, string> = {
			Java: 'java',
			JavaScript: 'javascript',
			TypeScript: 'typescript',
			Python: 'python',
			C: 'c',
			'C++': 'cplusplus',
			React: 'react',
			Playwright: 'playwright',
			Jest: 'jest',
			Vite: 'vitejs',
			Bun: 'bun',
			TailwindCSS: 'tailwindcss',
			ChakraUI: 'chakraui',
			Spring: 'spring',
			PostgreSQL: 'postgresql',
			Redis: 'redis',
			Docker: 'docker'
		}
		return iconMap[skillName] || 'default'
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.1, duration: 0.5 }}
			className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
			whileHover={{ y: -2 }}
		>
			{/* Header */}
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center space-x-3">
					<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
						{feedback.author.charAt(0).toUpperCase()}
					</div>
					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
							{feedback.author}
						</h3>
						{feedback.company && (
							<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
								{feedback.company}
							</p>
						)}
					</div>
				</div>
				<time className="text-sm text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
					{formatDate(feedback.created_at)}
				</time>
			</div>

			{/* Feedback Text */}
			<div className="mb-6">
				<div className="relative">
					<svg
						className="absolute -top-2 -left-2 w-6 h-6 text-gray-300 dark:text-gray-600"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
					</svg>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-6 italic">
						"{feedback.text}"
					</p>
				</div>
			</div>

			{/* Skills */}
			{feedback.skills && feedback.skills.length > 0 && (
				<div>
					<h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
						Related Skills:
					</h4>
					<div className="flex flex-wrap gap-2">
						{feedback.skills.map(skill => (
							<motion.div
								key={skill.id}
								className="inline-flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700 rounded-lg"
								whileHover={{ scale: 1.05 }}
								transition={{ type: 'spring', stiffness: 300, damping: 25 }}
							>
								<Icon
									iconName={getIconName(skill.name)}
									size="medium"
								/>
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									{skill.name}
								</span>
							</motion.div>
						))}
					</div>
				</div>
			)}
		</motion.div>
	)
}
