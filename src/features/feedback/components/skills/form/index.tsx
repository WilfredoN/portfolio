import { SkillSelector } from '@features/feedback/components/skills/form/SkillSelector'
import { useFeedback } from '@features/feedback/hooks/useFeedback'
import { toggleSkill } from '@features/feedback/utils/toggleSkill'
import { Button } from '@shared/components/Button'
import { Input, Textarea } from '@shared/components/Input'
import { AnimatePresence, motion } from 'framer-motion'
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
        className='flex justify-center mb-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => setShowForm(true)}
          variant='primary'
          size='lg'
          className='flex items-center space-x-2'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 4v16m8-8H4'
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
        className='max-w-2xl mx-auto mb-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className='bg-white dark:bg-gray-800/30 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700'
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <div className='flex justify-between items-center mb-6'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-blue-900/50 rounded-full flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-blue-600 dark:text-blue-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 4v16m8-8H4'
                  />
                </svg>
              </div>
              <h2 className='text-2xl font-bold'>Share Your Feedback</h2>
            </div>
            <button onClick={handleCancel} className='transition-colors'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          {submitError && (
            <motion.div
              className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className='text-sm text-red-600 dark:text-red-400'>
                {submitError}
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Input
                label='Your Name'
                required
                value={formData.author}
                onChange={(e) => updateField('author', e.target.value)}
                placeholder='Enter your full name'
                error={errors.author}
              />

              <Input
                label='Company'
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                placeholder='Your company or organization (optional)'
              />
            </div>

            <Textarea
              label='Feedback'
              required
              value={formData.text}
              onChange={(e) => updateField('text', e.target.value)}
              placeholder='Share your thoughts, experiences, or suggestions...'
              rows={5}
              error={errors.text}
            />

            <SkillSelector
              selectedSkills={formData.skills}
              onSkillToggle={handleSkillToggle}
              error={errors.skills}
            />

            <div className='flex justify-end space-x-4 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                isLoading={isSubmitting}
                disabled={isSubmitting}
                size='lg'
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
