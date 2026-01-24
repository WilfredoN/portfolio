import type {
  Feedback,
  FeedbackFormData,
  FeedbackFormErrors
} from '@features/feedback/types/feedback'

import { fetchFeedbacks, submitFeedbackWithNames } from '@features/api/feedback'
import { mapFeedbackData } from '@features/feedback/utils/format/mapFeedbackData'
import { validateFeedbackForm } from '@features/feedback/utils/format/validateFeedback'
import { useCallback, useState } from 'react'

import { useSkills } from './useSkills'

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
    loadFeedbacks
  }
}

export const useFeedback = (onSuccess?: () => void) => {
  const { skills: allSkills } = useSkills()
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
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (field in errors) {
        setErrors((prev) => {
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
    error?: string
    success: boolean
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
      const result = await submitFeedbackWithNames(
        mapFeedbackData(formData),
        allSkills
      )

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
  }, [formData, onSuccess, resetForm, allSkills])

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
