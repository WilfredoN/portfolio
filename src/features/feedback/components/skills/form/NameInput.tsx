import React from 'react'
import { Input } from '@shared/components/Input'

interface NameInputProps {
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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
