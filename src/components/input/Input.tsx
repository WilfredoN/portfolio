import { motion } from 'motion/react'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	required?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, required, className = '', ...props }, ref) => {
		return (
			<motion.div
				className="w-full"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				{label && (
					<label className="block text-lg font-medium mb-2 text-current">
						{label}
						{required && <span className="text-red-500 ml-1">*</span>}
					</label>
				)}
				<input
					ref={ref}
					className={`
						w-full px-4 py-3 text-lg rounded-lg border-2 
						transition-all duration-200 
						bg-white dark:bg-gray-800
						border-gray-300 dark:border-gray-600
						text-gray-900 dark:text-gray-100
						placeholder-gray-500 dark:placeholder-gray-400
						focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
						${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
						${className}
					`}
					{...props}
				/>
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
)

Input.displayName = 'Input'
