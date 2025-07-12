import { SkillSelector } from '@features/feedback/components/skills/form/SkillSelector'
import { useFeedback } from '@features/feedback/hooks/useFeedback'
import { toggleSkill } from '@features/feedback/utils/toggleSkill'
import { Button } from '@shared/components/Button'
import { Input, Textarea } from '@shared/components/Input'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

interface FeedbackFormProps {
  onSuccess: () => void
}

export const FeedbackForm = ({ onSuccess }: FeedbackFormProps) => {
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

  const handleSkillToggle = (skillId: number) => {
    const newSkills = toggleSkill(skillId, formData.skills)
    updateField('skills', newSkills)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await submitForm()

    if (result.success) {
      setShowForm(false)
    }
  }

  const handleCancel = () => {
    resetForm()
    setShowForm(false)
  }

  if (!showForm) {
    return (
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className='mb-8 flex justify-center'
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          className='flex items-center space-x-2'
          size='lg'
          variant='primary'
          onClick={() => setShowForm(true)}
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
      </motion.div>
    )
  }

  // TODO: fix form re-renders when we click in technologies tabs
  return (
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
          className='rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800/30'
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
            <button className='transition-colors' onClick={handleCancel}>
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

          {submitError && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className='mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20'
              initial={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className='text-sm text-red-600 dark:text-red-400'>
                {submitError}
              </p>
            </motion.div>
          )}

          <form className='space-y-6' onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <Input
                required
                error={errors.author}
                label='Your Name'
                placeholder='Enter your full name'
                value={formData.author}
                onChange={(e) => updateField('author', e.target.value)}
              />

              <Input
                label='Company'
                placeholder='Your company or organization (optional)'
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
              />
            </div>

            <Textarea
              required
              error={errors.text}
              label='Feedback'
              placeholder='Share your thoughts, experiences, or suggestions...'
              rows={5}
              value={formData.text}
              onChange={(e) => updateField('text', e.target.value)}
            />

            <SkillSelector
              error={errors.skills}
              selectedSkills={formData.skills}
              onSkillToggle={handleSkillToggle}
            />

            <div className='flex justify-end space-x-4 pt-4'>
              <Button
                disabled={isSubmitting}
                type='button'
                variant='outline'
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                disabled={isSubmitting}
                isLoading={isSubmitting}
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
