import { useCallback, useState } from 'react'
import { fetchFeedbacks, submitFeedback } from '../api/feedback'
import { Feedback } from '../types/feedback'
import {
	FeedbackFormData,
	FeedbackFormErrors,
	validateFeedbackForm,
	prepareFeedbackData
} from '../utils/feedback'

export const useFeedbacks = () => {
	const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const loadFeedbacks = useCallback(async () => {
		setIsLoading(true)
		try {
			const data = await fetchFeedbacks()
			setFeedbacks(data)
		} catch (error) {
			console.error('Error loading feedbacks:', error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	return {
		feedbacks,
		isLoading,
		loadFeedbacks,
		refreshFeedbacks: loadFeedbacks
	}
}

export const useFeedbackForm = (onSuccess?: () => void) => {
	const [formData, setFormData] = useState<FeedbackFormData>({
		author: '',
		company: '',
		text: '',
		skills: []
	})
	const [errors, setErrors] = useState<FeedbackFormErrors>({})
	const [submitError, setSubmitError] = useState<string>('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const updateField = useCallback(
		(
			field: keyof FeedbackFormData,
			value: FeedbackFormData[keyof FeedbackFormData]
		) => {
			setFormData(prev => ({ ...prev, [field]: value }))
			if (field in errors) {
				setErrors(prev => {
					const newErrors = { ...prev }
					delete newErrors[field as keyof FeedbackFormErrors]
					return newErrors
				})
			}
			if (submitError) {
				setSubmitError('')
			}
		},
		[errors, submitError]
	)

	const resetForm = useCallback(() => {
		setFormData({
			author: '',
			company: '',
			text: '',
			skills: []
		})
		setErrors({})
		setSubmitError('')
	}, [])

	const submitForm = useCallback(async (): Promise<{
		success: boolean
		error?: string
	}> => {
		const validationErrors = validateFeedbackForm(formData)

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			setSubmitError('')
			return { success: false, error: 'Please fix the validation errors' }
		}

		setIsSubmitting(true)
		setSubmitError('')

		try {
			const result = await submitFeedback(prepareFeedbackData(formData))

			if (result.success) {
				resetForm()
				onSuccess?.()
				return { success: true }
			} else {
				setSubmitError(result.error || 'Failed to submit feedback')
				return { success: false, error: result.error }
			}
		} catch (error) {
			console.error('Error submitting feedback:', error)
			const errorMessage = 'An unexpected error occurred'
			setSubmitError(errorMessage)
			return { success: false, error: errorMessage }
		} finally {
			setIsSubmitting(false)
		}
	}, [formData, onSuccess, resetForm])

	return {
		formData,
		errors,
		submitError,
		isSubmitting,
		updateField,
		resetForm,
		submitForm
	}
}
