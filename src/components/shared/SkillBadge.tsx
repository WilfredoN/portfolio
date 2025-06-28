import { motion } from 'motion/react'
import { Skill } from '../../types/feedback'
import { getSkillIconName } from '../../utils/feedback'
import { Icon } from '../Icon/Icon'

interface SkillBadgeProps {
	skill: Skill
	isSelected?: boolean
	showRemoveButton?: boolean
	onClick?: () => void
	onRemove?: () => void
	variant?: 'default' | 'compact' | 'selectable'
}

export const SkillBadge = ({
	skill,
	isSelected = false,
	showRemoveButton = false,
	onClick,
	onRemove,
	variant = 'default'
}: SkillBadgeProps) => {
	const baseClasses =
		'inline-flex items-center space-x-2 rounded-lg transition-all duration-200'

	const variantClasses = {
		default: `px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 
				  border border-blue-200 dark:border-blue-700`,
		compact: `px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200`,
		selectable: `p-3 border ${
			isSelected
				? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
				: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10'
		}`
	}

	const content = (
		<>
			<Icon
				iconName={getSkillIconName(skill.name)}
				size="medium"
			/>
			<span
				className={
					variant === 'compact' ? 'text-xs font-medium' : 'text-sm font-medium'
				}
			>
				{skill.name}
			</span>
			{isSelected && variant === 'selectable' && (
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
			{showRemoveButton && (
				<button
					type="button"
					onClick={e => {
						e.stopPropagation()
						onRemove?.()
					}}
					className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
				>
					×
				</button>
			)}
		</>
	)

	if (onClick || variant === 'selectable') {
		return (
			<motion.button
				type="button"
				onClick={onClick}
				className={`${baseClasses} ${variantClasses[variant]}`}
				whileHover={{ scale: variant === 'selectable' ? 1.02 : 1.05 }}
				whileTap={{ scale: 0.98 }}
				transition={{ type: 'spring', stiffness: 300, damping: 25 }}
			>
				{content}
			</motion.button>
		)
	}

	return (
		<motion.div
			className={`${baseClasses} ${variantClasses[variant]}`}
			whileHover={{ scale: 1.05 }}
			transition={{ type: 'spring', stiffness: 300, damping: 25 }}
		>
			{content}
		</motion.div>
	)
}
