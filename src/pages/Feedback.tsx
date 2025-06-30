import { motion } from 'motion/react'
import { useEffect } from 'react'

import { FeedbackForm } from '../components/feedback/FeedbackForm'
import { FeedbackItem } from '../components/feedback/FeedbackItem'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'
import { NoFeedbacks } from '../components/shared/NoFeedbacks'
import { useFeedbacks } from '../hooks/useFeedback'

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
      className='mt-8 max-w-screen-2xl text-left flex flex-col items-center justify-center'
      initial='initial'
      animate='final'
    >
      <motion.div className='w-full max-w-6xl mx-auto px-4 py-8'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12'
        >
          <h1 className='text-4xl md:text-5xl mb-4'>Feedback</h1>
          <p className='text-2xl opacity-80 max-w-2xl mx-auto'>
            Share your thoughts and experiences, or read what others have to say
            about working with me.
          </p>
        </motion.div>

        <FeedbackForm onSuccess={handleFormSuccess} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className='flex items-center justify-center mb-8'>
            <h2 className='text-3xl font-bold'>Recent Feedback</h2>
          </div>

          {isLoading && <LoadingSpinner text='Loading feedback...' />}

          {!isLoading && feedbacks.length === 0 && (
            <NoFeedbacks
              title='No feedback yet'
              description='Be the first to share your thoughts and experiences!'
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
