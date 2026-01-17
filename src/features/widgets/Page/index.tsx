import { Spinner } from '@shared/components/Spinner'
import { AnimatePresence, motion } from 'motion/react'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { variants } from './variants'

const About = lazy(() =>
  import('@features/about').then((module) => ({ default: module.About }))
)
const Feedback = lazy(() =>
  import('@features/feedback').then((module) => ({
    default: module.FeedbackPage
  }))
)
const Projects = lazy(() =>
  import('@features/projects').then((module) => ({ default: module.Projects }))
)

export const Page = () => {
  const location = useLocation()

  return (
    <AnimatePresence initial={false} mode='wait'>
      <motion.div
        key={location.pathname}
        animate='final'
        className='flex min-h-12 w-full max-w-screen-2xl items-center justify-center'
        exit='exit'
        initial='initial'
        variants={variants}
      >
        <Suspense fallback={<Spinner />}>
          <Routes location={location}>
            <Route element={<Navigate replace to='/about' />} path='/' />
            <Route element={<About />} path='/about' />
            <Route element={<Projects />} path='/projects' />
            <Route element={<Feedback />} path='/feedback' />
            <Route element={<Navigate replace to='/about' />} path='*' />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}
