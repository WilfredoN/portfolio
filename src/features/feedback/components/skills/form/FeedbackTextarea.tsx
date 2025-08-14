import React from 'react'
import { Textarea } from '@shared/components/Input'

interface FeedbackTextareaProps {
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
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
