import React from 'react'
import { Input } from '@shared/components/Input'

interface CompanyInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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
