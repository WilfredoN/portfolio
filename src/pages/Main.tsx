import { AnimatePresence, motion } from 'motion/react'
import { Suspense } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { PageType } from '../types/PageType'
import { nextPageVariant, prevPageVariant } from '../types/RouterVariants'
import { About } from './About'
import { Projects } from './Projects'

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
					key={currentPage}
					variants={variants}
					initial="initial"
					animate="final"
					exit="exit"
					className="max-w-screen-2xl w-full"
				>
					{currentPage === PageType.About ? <About /> : <Projects />}
				</motion.div>
			</Suspense>
		</AnimatePresence>
	)
}
