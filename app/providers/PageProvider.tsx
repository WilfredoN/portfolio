import type { JSX, ReactNode } from 'react'

import { PageContext } from '@app/contexts/PageContext'
import { PageType } from '@features/types'
import { useState } from 'react'

export const PageProvider = ({
  children
}: {
  children: ReactNode
}): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<PageType>(PageType.About)

  return (
    <PageContext value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext>
  )
}
