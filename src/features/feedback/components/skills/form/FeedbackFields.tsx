import React, { ReactElement } from 'react'
import { NameInput } from './NameInput'
import { CompanyInput } from './CompanyInput'
import { FeedbackTextarea } from './FeedbackTextarea'
import type {
  FeedbackFormData,
  FeedbackFormErrors
} from '@features/feedback/types/feedback'

type Props = {
  formData: FeedbackFormData
  errors: FeedbackFormErrors
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
          value={formData.author}
          error={errors.author}
          onChange={(e) => updateField('author', e.target.value)}
        />
        <CompanyInput
          value={formData.company ?? ''}
          onChange={(e) => updateField('company', e.target.value)}
        />
      </div>
      <FeedbackTextarea
        value={formData.text}
        error={errors.text}
        onChange={(e) => updateField('text', e.target.value)}
      />
    </>
  )
}

export const FeedbackFields = React.memo(FeedbackFieldsComponent)
