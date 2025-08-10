import type { FeedbackFormData } from '@features/feedback/types/feedback'

export const mapFeedbackData = (formData: FeedbackFormData) => ({
  author: formData.author.trim(),
  company: formData.company?.trim() || undefined,
  text: formData.text.trim(),
  skills: formData.skills
})
