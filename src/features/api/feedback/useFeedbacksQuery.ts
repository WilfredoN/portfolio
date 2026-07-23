import { fetchFeedbacks } from '@features/api/feedback'
import { useQuery } from '@tanstack/react-query'

export const FEEDBACKS_QUERY_KEY = ['feedbacks']

export const useFeedbacksQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: FEEDBACKS_QUERY_KEY,
    queryFn: fetchFeedbacks,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    refetchInterval: (query) =>
      query.state.status === 'error' ? 10000 : 30000,
    ...options
  })
}
