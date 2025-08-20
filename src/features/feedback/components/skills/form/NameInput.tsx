import { Input } from '@shared/components/Input'
import React from 'react'

interface NameInputProps {
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

export const NameInput = React.memo(
  ({ value, error, onChange }: NameInputProps) => (
    <Input
      required
      error={error}
      label='Your Name'
      placeholder='Enter your full name'
      value={value}
      onChange={onChange}
    />
  )
)
