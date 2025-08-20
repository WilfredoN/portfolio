import { Textarea } from '@shared/components/Input'
import React from 'react'

interface FeedbackTextareaProps {
  error?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  value: string
}

export const FeedbackTextarea = React.memo(
  ({ value, error, onChange }: FeedbackTextareaProps) => (
    <Textarea
      required
      error={error}
      label='Feedback'
      placeholder='Share your thoughts, experiences, or suggestions...'
      rows={5}
      value={value}
      onChange={onChange}
    />
  )
)
