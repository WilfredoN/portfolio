import { motion } from 'motion/react'

interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'outline'
	size?: 'sm' | 'md' | 'lg'
	isLoading?: boolean
	children: React.ReactNode
	className?: string
	disabled?: boolean
	onClick?: () => void
	type?: 'button' | 'submit' | 'reset'
}

export const Button = ({
	variant = 'primary',
	size = 'md',
	isLoading = false,
	className = '',
	children,
	disabled,
	onClick,
	type = 'button'
}: ButtonProps) => {
	const baseClasses = `
		inline-flex items-center justify-center font-medium rounded-lg
		transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
		disabled:opacity-50 disabled:cursor-not-allowed
	`

	const variantClasses = {
		primary: `
			bg-blue-600 hover:bg-blue-700 text-white
			focus:ring-blue-500 dark:focus:ring-blue-400
			shadow-md hover:shadow-lg
		`,
		secondary: `
			bg-gray-600 hover:bg-gray-700 text-white
			focus:ring-gray-500 dark:focus:ring-gray-400
			shadow-md hover:shadow-lg
		`,
		outline: `
			border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
			hover:bg-gray-50 dark:hover:bg-gray-800
			focus:ring-gray-500 dark:focus:ring-gray-400
		`
	}

	const sizeClasses = {
		sm: 'px-3 py-2 text-sm',
		md: 'px-4 py-3 text-base',
		lg: 'px-6 py-4 text-lg'
	}

	return (
		<motion.button
			whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
			whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
			className={`
				${baseClasses}
				${variantClasses[variant]}
				${sizeClasses[size]}
				${className}
			`}
			disabled={disabled || isLoading}
			onClick={onClick}
			type={type}
		>
			{isLoading ? (
				<>
					<svg
						className="animate-spin -ml-1 mr-2 h-4 w-4"
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
					Loading...
				</>
			) : (
				children
			)}
		</motion.button>
	)
}
