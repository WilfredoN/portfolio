import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, lazy, useContext } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { ThemeContext } from '../Components/ThemeContext'
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
	const theme = useContext(ThemeContext)
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
					className={`w-screen-xl ${theme}`}
				>
					{currentPage === PageType.About ? <About /> : <Projects />}
				</motion.div>
			</Suspense>
		</AnimatePresence>
	)
}
