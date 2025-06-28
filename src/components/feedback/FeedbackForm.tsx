import { motion } from 'motion/react'
import { useState } from 'react'
import { submitFeedback } from '../../api/feedback'
import { Button } from '../input/button/Button'
import { Input } from '../input/Input'
import { SkillSelector } from '../input/SkillSelector'
import { Textarea } from '../input/Textarea'

interface FeedbackFormProps {
	onSuccess: () => void
}

interface FormData {
	author: string
	company: string
	text: string
	skills: number[]
}

interface FormErrors {
	author?: string
	text?: string
	skills?: string
}

export const FeedbackForm = ({ onSuccess }: FeedbackFormProps) => {
	const [formData, setFormData] = useState<FormData>({
		author: '',
		company: '',
		text: '',
		skills: []
	})
	const [errors, setErrors] = useState<FormErrors>({})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [showForm, setShowForm] = useState(false)

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {}

		if (!formData.author.trim()) {
			newErrors.author = 'Author name is required'
		}

		if (!formData.text.trim()) {
			newErrors.text = 'Feedback text is required'
		}

		if (formData.text.trim().length < 10) {
			newErrors.text = 'Feedback must be at least 10 characters long'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSkillToggle = (skillId: number) => {
		setFormData(prev => ({
			...prev,
			skills: prev.skills.includes(skillId)
				? prev.skills.filter(id => id !== skillId)
				: [...prev.skills, skillId]
		}))
		if (errors.skills) {
			setErrors(prev => ({ ...prev, skills: undefined }))
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateForm()) {
			return
		}

		setIsSubmitting(true)

		try {
			const result = await submitFeedback({
				author: formData.author.trim(),
				company: formData.company.trim() || undefined,
				text: formData.text.trim(),
				skills: formData.skills
			})

			if (result.success) {
				setFormData({
					author: '',
					company: '',
					text: '',
					skills: []
				})
				setErrors({})
				setShowForm(false)
				onSuccess()
			} else {
				setErrors({ text: result.error || 'Failed to submit feedback' })
			}
		} catch (error) {
			console.error('Error submitting feedback:', error)
			setErrors({ text: 'An unexpected error occurred' })
		} finally {
			setIsSubmitting(false)
		}
	}

	if (!showForm) {
		return (
			<motion.div
				className="flex justify-center mb-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<Button
					onClick={() => setShowForm(true)}
					variant="primary"
					size="lg"
					className="flex items-center space-x-2"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 4v16m8-8H4"
						/>
					</svg>
					<span>Add Feedback</span>
				</Button>
			</motion.div>
		)
	}

	return (
		<motion.div
			className="max-w-2xl mx-auto mb-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<motion.div
				className="bg-white dark:bg-gray-800/30 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
				initial={{ scale: 0.95 }}
				animate={{ scale: 1 }}
				transition={{ type: 'spring', stiffness: 200, damping: 25 }}
			>
				<div className="flex justify-between items-center mb-6">
					<div className="flex items-center space-x-3">
						<div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
							<svg
								className="w-6 h-6 text-blue-600 dark:text-blue-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 4v16m8-8H4"
								/>
							</svg>
						</div>
						<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
							Share Your Feedback
						</h2>
					</div>
					<button
						onClick={() => setShowForm(false)}
						className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<form
					onSubmit={handleSubmit}
					className="space-y-6"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Input
							label="Your Name"
							required
							value={formData.author}
							onChange={e => {
								setFormData(prev => ({ ...prev, author: e.target.value }))
								if (errors.author)
									setErrors(prev => ({ ...prev, author: undefined }))
							}}
							placeholder="Enter your full name"
							error={errors.author}
						/>

						<Input
							label="Company"
							value={formData.company}
							onChange={e =>
								setFormData(prev => ({ ...prev, company: e.target.value }))
							}
							placeholder="Your company or organization (optional)"
						/>
					</div>

					<Textarea
						label="Feedback"
						required
						value={formData.text}
						onChange={e => {
							setFormData(prev => ({ ...prev, text: e.target.value }))
							if (errors.text) setErrors(prev => ({ ...prev, text: undefined }))
						}}
						placeholder="Share your thoughts, experiences, or suggestions..."
						rows={5}
						error={errors.text}
					/>

					<SkillSelector
						selectedSkills={formData.skills}
						onSkillToggle={handleSkillToggle}
						error={errors.skills}
					/>

					<div className="flex justify-end space-x-4 pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => setShowForm(false)}
							disabled={isSubmitting}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							isLoading={isSubmitting}
							disabled={isSubmitting}
							size="lg"
						>
							Submit Feedback
						</Button>
					</div>
				</form>
			</motion.div>
		</motion.div>
	)
}
