import { usePage } from '@app/hooks/usePage'
import { About } from '@features/about'
import { FeedbackPage } from '@features/feedback'
import { Projects } from '@features/projects'
import { PageType } from '@features/types'
import { AnimatePresence, motion } from 'motion/react'
import { Suspense } from 'react'
import { CgSpinner } from 'react-icons/cg'

import { variants } from './variants'

export const Page = () => {
  const { currentPage } = usePage()

  const pageMap = {
    [PageType.About]: <About />,
    [PageType.Projects]: <Projects />,
    [PageType.Feedback]: <FeedbackPage />
  }

  const page = pageMap[currentPage] ?? <About />

  return (
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        key={currentPage}
        variants={variants}
        initial='initial'
        animate='final'
        exit='exit'
        className='max-w-screen-2xl w-full'
      >
        <Suspense fallback={<CgSpinner className='animate-spin' />}>
          {page}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}
