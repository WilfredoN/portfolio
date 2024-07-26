import { motion } from 'framer-motion'
import { nextPageVariant } from '../Types/RouterVariants'

const ProjectDescription = () => (
	<motion.section
		style={{
			textAlign: 'center',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			padding: '0 1rem',
			maxWidth: '62.5rem'
		}}
	>
		<motion.h1
			className="text-4xl text-center mt-8"
			variants={nextPageVariant}
			initial="initial"
			animate="final"
			style={{
				fontSize: '1.7rem',
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<span
				style={{ fontFamily: 'Courgette', fontSize: '4rem', color: '#5287AD' }}
			>
				<a href="https://github.com/WilfredoN/alexandria-app">Alexandria</a>
			</span>
			<br />
			From serious projects I can highlight my web application called
			<span className="text-blue-400">Alexandria.</span>
			it is a web platform for organizing a convenient learning process as well
			as communication <br /> between teachers and students. <br />
			It was made as part of a exam project in a college.
		</motion.h1>
		<motion.h1
			className="text-4xl text-center mt-2"
			variants={nextPageVariant}
			initial="initial"
			animate="final"
			style={{
				fontSize: '1.7rem',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<a href="https://www.winwin.travel/demo-request">
				<motion.img
					src="https://github.com/WilfredoN/portfolio/blob/main/src/assets/winwin.png?raw=true"
					className="bg-gray-200 px-4 py-2 rounded-md my-2"
				/>
			</a>
			<span>
				Now I am working on a project called WinWin.Travel. <br />
				It is an hotel room comparison platform that allows users to find the
				best hotel room for their needs. <br />
				If you wanna get demo - contact{' '}
				<a
					href="https://www.winwin.travel/demo-request"
					className="text-blue-400"
				>
					here
				</a>
			</span>
		</motion.h1>
	</motion.section>
)

export default ProjectDescription
