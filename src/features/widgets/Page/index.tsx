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

const KNOWN_PATHS = ['/about', '/projects', '/feedback']

export const Page = () => {
  const location = useLocation()

  if (location.pathname === '/' || !KNOWN_PATHS.includes(location.pathname)) {
    return <Navigate replace to='/about' />
  }

  return (
    <AnimatePresence initial={false} mode='wait'>
      <motion.div
        key={location.pathname}
        animate='final'
        className='flex min-h-screen w-full max-w-screen-2xl items-center justify-center'
        exit='exit'
        initial='initial'
        variants={variants}
      >
        <Suspense
          fallback={
            <div
              style={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          }
        >
          <Routes location={location}>
            <Route element={<About />} path='/about' />
            <Route element={<Projects />} path='/projects' />
            <Route element={<Feedback />} path='/feedback' />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}
