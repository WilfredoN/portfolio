import { JSX } from 'react'

export interface ProjectInfo {
	title: string
	imageTitle?: string
	description: string
	technologies: string[]
	link?: string
	scale?: 'small' | 'medium' | 'large'
	additionalDescription?: JSX.Element
	imageUrl?: string
	videoUrl?: string
	imageStyle?: string
}

export const projects: ProjectInfo[] = [
	{
		title: 'Alexandria',
		imageTitle: 'Github Repository',
		description:
			'A web platform for organizing a convenient learning process as well as communication between teachers and students. It was made as part of a exam project in a college.',
		technologies: ['angular', 'typescript', 'nodejs', 'spring', 'postgresql'],
		link: 'https://github.com/WilfredoN/alexandria-app'
	},
	{
		title: 'WinWin.Travel',
		description:
			'A hotel room comparison platform that allows users to find the best hotel room for their needs.',
		additionalDescription: (
			<span>
				If you wanna get demo - contact{' '}
				<a
					href="https://www.winwin.travel/"
					className="text-blue-400"
				>
					here
				</a>
			</span>
		),
		technologies: ['react', 'typescript', 'chakraui', 'nodejs'],
		link: 'https://www.winwin.travel/',
		imageUrl: 'assets/winwin.png',
		imageStyle: 'bg-white px-4 py-2 rounded-md'
	},
	{
		title: 'Deadlines Rule The World',
		description:
			'Deadlines Rule The World is a 2D game developed in C using the SDL2 library. The game features a bee character that the player controls, tasked with avoiding enemies, while collecting coins. The game incorporates collision detection, object management, and a start screen UI. Enemies and sprints move around the screen, and the player can shoot missiles. The goal of the game is to survive until all tasks and sprints are eliminated.',
		technologies: ['c', 'sdl'],
		scale: 'large',
		videoUrl: 'assets/endgame_gif.webm'
	}
]
