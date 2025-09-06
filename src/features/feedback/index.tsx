import { FeedbackItem } from '@features/feedback/components/FeedbackItem'
import { NoFeedbacks } from '@features/feedback/components/NoFeedback'
import { useFeedbacks } from '@features/feedback/hooks/useFeedback'
import { LoadingSpinner } from '@shared/components/Spinner'
import { lazy, Suspense, useEffect } from 'react'
const Form = lazy(() =>
  import('@features/feedback/components/skills/form').then((module) => ({
    default: module.FeedbackForm
  }))
)

export const FeedbackPage = () => {
  const { feedbacks, isLoading, loadFeedbacks } = useFeedbacks()

  useEffect(() => {
    loadFeedbacks()
  }, [loadFeedbacks])

  const handleFormSuccess = () => {
    loadFeedbacks()
  }

  return (
    <article className='z-[5] mt-8 flex max-w-screen-2xl flex-col items-center justify-center bg-[var(--color-bg)] text-left text-[var(--color-text)]'>
      <div className='mx-auto w-full max-w-6xl px-4 py-8'>
        <div className='mb-12 text-center'>
          <h1 className='mb-4 text-4xl md:text-5xl'>Feedback</h1>
          <p className='mx-auto max-w-2xl text-2xl opacity-80'>
            Share your thoughts and experiences, or read what others have to say
            about working with me.
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner text='Loading form...' />}>
          <Form onSuccess={handleFormSuccess} />
        </Suspense>

        <div>
          <div className='mb-8 flex items-center justify-center'>
            <h2 className='text-3xl font-bold'>Recent Feedback</h2>
          </div>

          {isLoading && <LoadingSpinner text='Loading feedback...' />}

          {!isLoading && feedbacks.length === 0 && <NoFeedbacks />}

          {!isLoading && feedbacks.length > 0 && (
            <div className='grid gap-6 md:gap-8'>
              {feedbacks.map((feedback) => (
                <FeedbackItem key={feedback.id} feedback={feedback} />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
