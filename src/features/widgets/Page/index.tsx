import { About } from '@features/about'
import { useNavTabStatus } from '@features/widgets/Header/hooks/useNavTabStatus'
import { DEFAULT_PATH, NavStatus } from '@features/widgets/Header/navConfig'
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
const SecretAnalytics = lazy(() =>
  import('@features/admin/pages/SecretAnalyticsPage').then((module) => ({
    default: module.SecretAnalyticsPage
  }))
)

const KNOWN_PATHS = ['/about', '/projects', '/feedback', '/42']

export const Page = () => {
  const location = useLocation()
  const currentNavStatus = useNavTabStatus(location.pathname)

  if (
    location.pathname === '/' ||
    (!KNOWN_PATHS.includes(location.pathname) && location.pathname !== '/42') ||
    (currentNavStatus === NavStatus.IN_CONSTRUCTION && location.pathname !== '/42')
  ) {
    return <Navigate replace to={DEFAULT_PATH} />
  }

  return (
    <AnimatePresence initial={false} mode='wait'>
      <motion.div
        key={location.pathname}
        animate='final'
        className='flex min-h-screen w-full max-w-5xl items-start justify-center'
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
            <Route element={<SecretAnalytics />} path='/42' />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}
