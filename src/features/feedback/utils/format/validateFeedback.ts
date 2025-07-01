import type {
  FeedbackFormData,
  FeedbackFormErrors
} from '@features/feedback/types/feedback'

export const validateFeedbackForm = (
  formData: FeedbackFormData
): FeedbackFormErrors => {
  const errors: FeedbackFormErrors = {}

  if (!formData.author.trim()) {
    errors.author = 'Author name is required'
  }

  if (!formData.text.trim()) {
    errors.text = 'Feedback text is required'
  } else if (formData.text.trim().length < 10) {
    errors.text = 'Feedback must be at least 10 characters long'
  }

  return errors
}
