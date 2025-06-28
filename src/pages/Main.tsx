import { AnimatePresence, motion } from 'motion/react'
import { Suspense } from 'react'
import { CgSpinner } from 'react-icons/cg'

import { PageType } from '../types/PageType'
import { nextPageVariant, prevPageVariant } from '../types/RouterVariants'
import { About } from './About'
import { FeedbackPage } from './Feedback'
import { Projects } from './Projects'

interface PageProps {
  currentPage: PageType
}

export const Main = ({ currentPage }: PageProps) => {
  const getPageVariant = () => {
    if (currentPage === PageType.About) { return nextPageVariant }

    if (currentPage === PageType.Projects) { return prevPageVariant }

    return nextPageVariant
  }

  const renderPage = () => {
    switch (currentPage) {
      case PageType.About:
        return <About />
      case PageType.Projects:
        return <Projects />
      case PageType.Feedback:
        return <FeedbackPage />
      default:
        return <About />
    }
  }

  const variants = getPageVariant()

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
    >
      <Suspense fallback={<CgSpinner className="animate-spin" />}>
        <motion.div
          key={currentPage}
          variants={variants}
          initial="initial"
          animate="final"
          exit="exit"
          className="max-w-screen-2xl w-full"
        >
          {renderPage()}
        </motion.div>
      </Suspense>
    </AnimatePresence>
  )
}
