import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { PageType } from '../Types/PageType'
import { nextPageVariant, prevPageVariant } from '../Types/RouterVariants'
const About = lazy(() => import('./About'))
const Projects = lazy(() => import('./Projects'))

interface PageProps {
	currentPage: PageType
}

export const Main = ({ currentPage }: PageProps) => {
	const variants =
		currentPage === PageType.About ? nextPageVariant : prevPageVariant

	return (
		<AnimatePresence
			mode="wait"
			initial={false}
		>
			<Suspense fallback={<CgSpinner className="animate-spin" />}>
				<motion.div
					key={`id-${Math.random()}`}
					variants={variants}
					initial="initial"
					animate="final"
					exit="exit"
					className="w-screen-xl"
				>
					{currentPage === PageType.About ? <About /> : <Projects />}
				</motion.div>
			</Suspense>
		</AnimatePresence>
	)
}
