import type {
  FeedbackFormData,
  FeedbackFormErrors
} from '@features/feedback/types/feedback'

import { submitFeedbackWithNames } from '@features/api/feedback'
import {
  FEEDBACKS_QUERY_KEY,
  useFeedbacksQuery
} from '@features/api/feedback/useFeedbacksQuery'
import { mapFeedbackData } from '@features/feedback/utils/format/mapFeedbackData'
import { validateFeedbackForm } from '@features/feedback/utils/format/validateFeedback'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { useSkills } from './useSkills'

export const useFeedbacks = () => {
  const query = useFeedbacksQuery()

  const loadFeedbacks = useCallback(async () => {
    await query.refetch()
  }, [query])

  return {
    feedbacks: query.data ?? [],
    isLoading: query.isLoading,
    loadFeedbacks
  }
}

export const useFeedback = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()
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
        queryClient.invalidateQueries({ queryKey: FEEDBACKS_QUERY_KEY })
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
  }, [formData, onSuccess, resetForm, allSkills, queryClient])

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
