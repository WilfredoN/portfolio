import { motion } from 'framer-motion'
import { useContext } from 'react'
import ReactGA from 'react-ga4'
import { ThemeContext } from './ThemeContext'

export const ProjectDescription = () => {
	const { theme } = useContext(ThemeContext)

	const handleLinkClick = (label: string) => {
		ReactGA.event({
			category: 'User',
			action: 'Clicked Link',
			label: label
		})
	}
	return (
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
				className="text-4xl text-center"
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
					style={{
						fontFamily: 'Courgette',
						fontSize: '4rem',
						color: '#5287AD'
					}}
					className="my-6"
				>
					<a
						href="https://github.com/WilfredoN/alexandria-app"
						onClick={() => handleLinkClick('Alexandria')}
					>
						Alexandria
					</a>
				</span>
				<br />
				From serious projects I can highlight my web application called
				<span className="text-blue-400">Alexandria.</span>
				it is a web platform for organizing a convenient learning process as
				well as communication <br /> between teachers and students. <br />
				It was made as part of a exam project in a college.
			</motion.h1>
			<hr />
			<motion.h1
				className="text-4xl text-center"
				initial="initial"
				animate="final"
				style={{
					fontSize: '1.7rem',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<a
					href="https://www.winwin.travel/"
					onClick={() => handleLinkClick('WinWin.Travel')}
				>
					<motion.img
						src="assets/winwin.png"
						alt="WinWin.Travel Logo"
						className={`${theme === 'dark' ? 'bg-gray-200' : ''} px-4 py-2 rounded-md my-2`}
					/>
				</a>
				<span>
					Now I am working on a project called WinWin.Travel. <br />
					It is an hotel room comparison platform that allows users to find the
					best hotel room for their needs. <br />
					If you wanna get demo - contact{' '}
					<a
						href="https://www.winwin.travel/"
						className="text-blue-400"
						onClick={() => handleLinkClick('WinWin.Travel Contact')}
					>
						here
					</a>
				</span>
			</motion.h1>
		</motion.section>
	)
}
