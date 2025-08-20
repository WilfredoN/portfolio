import type {
  FeedbackFormData,
  FeedbackFormErrors
} from '@features/feedback/types/feedback'
import type { ReactElement } from 'react'

import FeedbackFormPanel from '@features/feedback/components/skills/form/FeedbackFormPanel'
import { useFeedback } from '@features/feedback/hooks/useFeedback'
import { toggleSkill } from '@features/feedback/utils/toggleSkill'
import React, { useCallback, useMemo, useState } from 'react'

interface FormState {
  data: FeedbackFormData
  errors: FeedbackFormErrors
  isSubmitting: boolean
  submitError?: string
}

interface FormActions {
  cancel: () => void
  submit: (e: React.FormEvent) => Promise<void>
  toggleSkill: (id: number) => void
  updateField: <K extends keyof FeedbackFormData>(
    field: K,
    value: FeedbackFormData[K]
  ) => void
}

interface Props {
  onSuccess?: () => void
}

export const FeedbackFormContainer = ({ onSuccess }: Props): ReactElement => {
  const {
    formData,
    errors,
    submitError,
    isSubmitting,
    updateField,
    resetForm,
    submitForm
  } = useFeedback(onSuccess)

  const [showForm, setShowForm] = useState(false)

  const toggle = useCallback(
    (skillId: number) => {
      const newSkills = toggleSkill(skillId, formData.skills)
      updateField('skills', newSkills)
    },
    [formData.skills, updateField]
  )

  const actions = useMemo<FormActions>(() => {
    const submit = async (e: React.FormEvent) => {
      e.preventDefault()
      const result = await submitForm()
      if (result.success) {
        setShowForm(false)
      }
    }

    const cancel = () => {
      resetForm()
      setShowForm(false)
    }

    return {
      updateField,
      toggleSkill: toggle,
      submit,
      cancel
    }
  }, [updateField, submitForm, resetForm, toggle])

  const state = useMemo<FormState>(
    () => ({ data: formData, errors, isSubmitting, submitError }),
    [formData, errors, isSubmitting, submitError]
  )

  return (
    <FeedbackFormPanel
      actions={actions}
      setShow={setShowForm}
      show={showForm}
      state={state}
    />
  )
}
