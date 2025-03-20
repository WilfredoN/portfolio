import { SkillDTO } from '../api/fetchData'

export const groupSkillsByCategory = (skills: SkillDTO[]) => {
	return skills.reduce(
		(acc, skill) => {
			const category = skill.category.toLowerCase()

			if (!acc[category]) {
				acc[category] = []
			}

			acc[category].push(skill)
			return acc
		},
		{} as Record<string, SkillDTO[]>
	)
}

export const programmingLanguages = [
	{ text: 'Java', icon: 'java' },
	{ text: 'HTML', icon: 'html5' },
	{ text: 'CSS', icon: 'css3' },
	{ text: 'TypeScript', icon: 'typescript' },
	{ text: 'Python', icon: 'python' },
	{ text: 'C', icon: 'c' },
	{ text: 'C++', icon: 'cplusplus' }
]

export const technologiesAndLibraries = [
	{ text: 'React', icon: 'react' },
	{ text: 'Angular', icon: 'angular' },
	{ text: 'Vite', icon: 'vitejs' },
	{ text: 'TailwindCSS', icon: 'tailwindcss' },
	{ text: 'ChakraUI', icon: 'chakraui' },
	{ text: 'Spring', icon: 'spring' },
	{ text: 'PostgreSQL', icon: 'postgresql' },
	{ text: 'Docker', icon: 'docker' }
]
