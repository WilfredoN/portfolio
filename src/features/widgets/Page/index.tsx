import { About } from '@features/about'
import { AnimatePresence, motion } from 'motion/react'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

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
        <Routes location={location}>
          <Route element={<Navigate replace to='/about' />} path='/' />
          <Route element={<About />} path='/about' />
          <Route
            element={
              <Suspense fallback={null}>
                <Projects />
              </Suspense>
            }
            path='/projects'
          />
          <Route
            element={
              <Suspense fallback={null}>
                <Feedback />
              </Suspense>
            }
            path='/feedback'
          />
          <Route element={<Navigate replace to='/about' />} path='*' />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}
