import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { fetchFeedbacks } from '../api/feedback'
import { FeedbackForm } from '../components/feedback/FeedbackForm'
import { FeedbackItem } from '../components/feedback/FeedbackItem'
import { Feedback } from '../types/feedback'

export const FeedbackPage = () => {
	const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const loadFeedbacks = async () => {
		setIsLoading(true)
		try {
			const data = await fetchFeedbacks()
			setFeedbacks(data)
		} catch (error) {
			console.error('Error loading feedbacks:', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		loadFeedbacks()
	}, [])

	const handleFormSuccess = () => {
		loadFeedbacks()
	}

	return (
		<motion.article
			className="mt-8 max-w-screen-2xl text-left flex flex-col items-center justify-center"
			initial="initial"
			animate="final"
		>
			<motion.div className="w-full max-w-6xl mx-auto px-4 py-8">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl md:text-5xl mb-4">Feedback</h1>
					<p className="text-2xl opacity-80 max-w-2xl mx-auto">
						Share your thoughts and experiences, or read what others have to say
						about working with me.
					</p>
				</motion.div>

				{/* Feedback Form */}
				<FeedbackForm onSuccess={handleFormSuccess} />

				{/* Feedbacks List */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
				>
					<div className="flex items-center justify-center mb-8">
						<h2 className="text-3xl font-bold">Recent Feedback</h2>
					</div>

					{isLoading && (
						<div className="flex justify-center items-center py-12">
							<div className="flex items-center space-x-2 opacity-70">
								<svg
									className="animate-spin h-8 w-8"
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
								<span className="text-lg">Loading feedback...</span>
							</div>
						</div>
					)}

					{!isLoading && feedbacks.length === 0 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-center py-12"
						>
							<div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
								<svg
									className="w-10 h-10 opacity-50"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
									/>
								</svg>
							</div>
							<h3 className="text-2xl font-medium mb-4">No feedback yet</h3>
							<p className="text-lg opacity-70 mb-6">
								Be the first to share your thoughts and experiences!
							</p>
						</motion.div>
					)}

					{!isLoading && feedbacks.length > 0 && (
						<div className="grid gap-6 md:gap-8">
							{feedbacks.map((feedback, index) => (
								<FeedbackItem
									key={feedback.id}
									feedback={feedback}
									index={index}
								/>
							))}
						</div>
					)}
				</motion.div>
			</motion.div>
		</motion.article>
	)
}
