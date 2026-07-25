import { useFeedbacksQuery } from '@features/api/feedback/useFeedbacksQuery'

import { NavStatus } from '../navConfig'

export const useNavTabStatus = (path: string): NavStatus => {
  const isFeedback = path === '/feedback'
  const feedbackQuery = useFeedbacksQuery({ enabled: isFeedback })

  if (isFeedback) {
    if (feedbackQuery.isError) {
      return NavStatus.IN_CONSTRUCTION
    }
    if (!feedbackQuery.isSuccess) {
      return NavStatus.PROCESSING
    }
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
      if (feedbackQuery.isError) {
        statuses[path] = NavStatus.IN_CONSTRUCTION
      } else if (!feedbackQuery.isSuccess) {
        statuses[path] = NavStatus.PROCESSING
      } else {
        statuses[path] = NavStatus.READY
      }
    } else {
      statuses[path] = NavStatus.READY
    }
  }

  return statuses
}
