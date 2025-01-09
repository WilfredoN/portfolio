export const projects = [
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
				If you wanna get demo - contact
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
	}
]
