import { FeedbackItem } from '@features/feedback/components/FeedbackItem'
import { NoFeedbacks } from '@features/feedback/components/NoFeedback'
import { FeedbackForm } from '@features/feedback/components/skills/form'
import { useFeedbacks } from '@features/feedback/hooks/useFeedback'
import { LoadingSpinner } from '@shared/components/Spinner'
import { motion } from 'motion/react'
import { useEffect } from 'react'

export const FeedbackPage = () => {
  const { feedbacks, isLoading, loadFeedbacks } = useFeedbacks()

  useEffect(() => {
    loadFeedbacks()
  }, [loadFeedbacks])

  const handleFormSuccess = () => {
    loadFeedbacks()
  }

  return (
    <motion.article
      animate='final'
      className='mt-8 max-w-screen-2xl text-left flex flex-col items-center justify-center'
      initial='initial'
    >
      <motion.div className='w-full max-w-6xl mx-auto px-4 py-8'>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12'
          initial={{ opacity: 0, y: -20 }}
        >
          <h1 className='text-4xl md:text-5xl mb-4'>Feedback</h1>
          <p className='text-2xl opacity-80 max-w-2xl mx-auto'>
            Share your thoughts and experiences, or read what others have to say
            about working with me.
          </p>
        </motion.div>

        <FeedbackForm onSuccess={handleFormSuccess} />

        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
          <div className='flex items-center justify-center mb-8'>
            <h2 className='text-3xl font-bold'>Recent Feedback</h2>
          </div>

          {isLoading && <LoadingSpinner text='Loading feedback...' />}

          {!isLoading && feedbacks.length === 0 && (
            <NoFeedbacks
              description='Be the first to share your thoughts and experiences!'
              title='No feedback yet'
            />
          )}

          {!isLoading && feedbacks.length > 0 && (
            <div className='grid gap-6 md:gap-8'>
              {feedbacks.map((feedback) => (
                <FeedbackItem key={feedback.id} feedback={feedback} />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.article>
  )
}
