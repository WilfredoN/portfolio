import type { PageType } from '@features/types'

import { createContext, useContext } from 'react'

interface PageContextProps {
  currentPage: PageType
  setCurrentPage: (page: PageType) => void
}

export const PageContext = createContext<PageContextProps | undefined>(
  undefined
)

export const usePageContext = () => {
  const context = useContext(PageContext)

  if (!context) {
    throw new Error('usePageContext must be used within a PageProvider')
  }

  return context
}
