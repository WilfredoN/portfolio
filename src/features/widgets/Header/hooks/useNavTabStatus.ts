import { useFeedbacksQuery } from '@features/api/feedback/useFeedbacksQuery'

import { NavStatus } from '../navConfig'

export const useNavTabStatus = (path: string): NavStatus => {
  const isFeedback = path === '/feedback'
  const feedbackQuery = useFeedbacksQuery({ enabled: isFeedback })

  if (isFeedback && feedbackQuery.isError) {
    return NavStatus.IN_CONSTRUCTION
  }

  return NavStatus.READY
}

export const useAllNavStatuses = (
  paths: string[]
): Record<string, NavStatus> => {
  const isFeedbackRequired = paths.includes('/feedback')
  const feedbackQuery = useFeedbacksQuery({ enabled: isFeedbackRequired })

  const statuses: Record<string, NavStatus> = {}

  for (const path of paths) {
    if (path === '/feedback') {
      statuses[path] = feedbackQuery.isSuccess
        ? NavStatus.READY
        : NavStatus.IN_CONSTRUCTION
    } else {
      statuses[path] = NavStatus.READY
    }
  }

  return statuses
}
