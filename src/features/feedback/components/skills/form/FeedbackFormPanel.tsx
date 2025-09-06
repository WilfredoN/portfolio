import type {
  FeedbackFormData,
  FeedbackFormErrors
} from '@features/feedback/types/feedback'
import type { ReactElement } from 'react'

import { FeedbackFields } from '@features/feedback/components/skills/form/FeedbackFields'
import { SkillSelector } from '@features/feedback/components/skills/form/SkillSelector'
import { Button } from '@shared/components/Button'
import { AnimatePresence, motion } from 'motion/react'
import React from 'react'

interface PanelState {
  data: FeedbackFormData
  errors: FeedbackFormErrors
  isSubmitting: boolean
  submitError?: string
}

interface PanelActions {
  cancel: () => void
  submit: (e: React.FormEvent) => Promise<void>
  toggleSkill: (id: number) => void
  updateField: <K extends keyof FeedbackFormData>(
    field: K,
    value: FeedbackFormData[K]
  ) => void
}

interface Props {
  actions: PanelActions
  setShow: (v: boolean) => void
  show: boolean
  state: PanelState
}

const FeedbackFormPanel = ({
  show,
  setShow,
  state,
  actions
}: Props): ReactElement => {
  return !show ? (
    <div className='mb-8 flex justify-center'>
      <Button
        className='flex items-center space-x-2'
        size='lg'
        variant='primary'
        onClick={() => setShow(true)}
      >
        <svg
          className='h-5 w-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M12 4v16m8-8H4'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
        <span>Add Feedback</span>
      </Button>
    </div>
  ) : (
    <AnimatePresence mode='wait'>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className='mx-auto mb-8 max-w-2xl'
        exit={{ opacity: 0, y: 20 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ scale: 1 }}
          className='rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-200/30'
          initial={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <div className='mb-6 flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-900/50'>
                <svg
                  className='h-6 w-6 text-blue-600 dark:text-blue-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    d='M12 4v16m8-8H4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h2 className='text-2xl font-bold'>Share Your Feedback</h2>
            </div>
            <button className='transition-colors' onClick={actions.cancel}>
              <svg
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  d='M6 18L18 6M6 6l12 12'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                />
              </svg>
            </button>
          </div>

          {state.submitError && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className='mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20'
              initial={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className='text-sm text-red-600 dark:text-red-400'>
                {state.submitError}
              </p>
            </motion.div>
          )}

          <form className='space-y-6' onSubmit={actions.submit}>
            <FeedbackFields
              errors={state.errors}
              formData={state.data}
              updateField={actions.updateField}
            />

            <SkillSelector
              error={state.errors.skills}
              selectedSkills={state.data.skills}
              onSkillToggle={actions.toggleSkill}
            />

            <div className='flex justify-end space-x-4 pt-4'>
              <Button
                disabled={state.isSubmitting}
                type='button'
                variant='outline'
                onClick={actions.cancel}
              >
                Cancel
              </Button>
              <Button
                disabled={state.isSubmitting}
                isLoading={state.isSubmitting}
                size='lg'
                type='submit'
              >
                Submit Feedback
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default FeedbackFormPanel
