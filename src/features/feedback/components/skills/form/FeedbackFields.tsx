import type {
  FeedbackFormData,
  FeedbackFormErrors
} from '@features/feedback/types/feedback'
import type { ReactElement } from 'react'

import React from 'react'

import { CompanyInput } from './CompanyInput'
import { FeedbackTextarea } from './FeedbackTextarea'
import { NameInput } from './NameInput'

interface Props {
  errors: FeedbackFormErrors
  formData: FeedbackFormData
  updateField: <K extends keyof FeedbackFormData>(
    field: K,
    value: FeedbackFormData[K]
  ) => void
}

const FeedbackFieldsComponent = ({
  formData,
  errors,
  updateField
}: Props): ReactElement => {
  return (
    <>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <NameInput
          error={errors.author}
          value={formData.author}
          onChange={(e) => updateField('author', e.target.value)}
        />
        <CompanyInput
          value={formData.company ?? ''}
          onChange={(e) => updateField('company', e.target.value)}
        />
      </div>
      <FeedbackTextarea
        error={errors.text}
        value={formData.text}
        onChange={(e) => updateField('text', e.target.value)}
      />
    </>
  )
}

export const FeedbackFields = React.memo(FeedbackFieldsComponent)
