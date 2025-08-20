import { Input } from '@shared/components/Input'
import React from 'react'

interface CompanyInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

export const CompanyInput = React.memo(
  ({ value, onChange }: CompanyInputProps) => (
    <Input
      label='Company'
      placeholder='Your company or organization (optional)'
      value={value}
      onChange={onChange}
    />
  )
)
