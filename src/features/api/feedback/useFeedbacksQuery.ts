import { fetchFeedbacks } from '@features/api/feedback'
import { useQuery } from '@tanstack/react-query'

export const FEEDBACKS_QUERY_KEY = ['feedbacks']

export const useFeedbacksQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: FEEDBACKS_QUERY_KEY,
    queryFn: fetchFeedbacks,
    retry: 1,
    retryDelay: 1000,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    ...options
  })
}
