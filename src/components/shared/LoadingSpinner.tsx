import { motion } from 'motion/react'

interface LoadingSpinnerProps {
	size?: 'sm' | 'md' | 'lg'
	text?: string
	className?: string
}

export const LoadingSpinner = ({
	size = 'md',
	text = 'Loading...',
	className = ''
}: LoadingSpinnerProps) => {
	const sizeClasses = {
		sm: 'h-4 w-4',
		md: 'h-8 w-8',
		lg: 'h-12 w-12'
	}

	const textSizeClasses = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg'
	}

	return (
		<motion.div
			className={`flex justify-center items-center py-12 ${className}`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<div className="flex items-center space-x-2 opacity-70">
				<svg
					className={`animate-spin ${sizeClasses[size]}`}
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
				<span className={textSizeClasses[size]}>{text}</span>
			</div>
		</motion.div>
	)
}
