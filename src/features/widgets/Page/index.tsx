import { usePage } from '@app/hooks/usePage'
import { About } from '@features/about'
import { PageType } from '@features/types'
import { AnimatePresence, motion } from 'motion/react'
import { lazy, Suspense } from 'react'
import { Spinner } from '@shared/components/Spinner'

import { variants } from './variants'

const Feedback = lazy(() =>
  import('@features/feedback').then((module) => ({
    default: module.FeedbackPage
  }))
)
const Projects = lazy(() =>
  import('@features/projects').then((module) => ({ default: module.Projects }))
)

export const Page = () => {
  const { currentPage } = usePage()

  const pageMap = {
    [PageType.About]: <About />,
    [PageType.Projects]: <Projects />,
    [PageType.Feedback]: <Feedback />
  }

  const page = pageMap[currentPage] ?? <About />

  return (
    <AnimatePresence initial={false} mode='wait'>
      <motion.div
        key={currentPage}
        animate='final'
        className='w-full max-w-screen-2xl'
        exit='exit'
        initial='initial'
        variants={variants}
      >
        <Suspense fallback={<Spinner />}>{page}</Suspense>
      </motion.div>
    </AnimatePresence>
  )
}
