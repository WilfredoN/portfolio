import type { IconVariant } from '@shared/components/Icon'

export interface SkillItem {
  icon: string
  text: string
  type?: IconVariant
}

export const programmingLanguages: SkillItem[] = [
  { text: 'Java', icon: 'java' },
  { text: 'C#', icon: 'csharp' },
  { text: 'TypeScript', icon: 'typescript' },
  { text: 'JavaScript', icon: 'javascript' },
  { text: 'Python', icon: 'python' },
  { text: 'C', icon: 'c' },
  { text: 'C++', icon: 'cplusplus' }
]

export const frontendAndDesktop: SkillItem[] = [
  { text: 'React', icon: 'react' },
  { text: 'Angular', icon: 'angular' },
  { text: 'Avalonia UI', icon: 'dot-net' },
  { text: 'HTML5', icon: 'html5' },
  { text: 'CSS3', icon: 'css3' },
  { text: 'TailwindCSS', icon: 'tailwindcss' },
  { text: 'ChakraUI', icon: 'chakraui' },
  { text: 'Vite', icon: 'vitejs' }
]

export const backendAndRealtime: SkillItem[] = [
  { text: 'Node.js', icon: 'nodejs' },
  { text: 'Express', icon: 'express', type: 'original' },
  { text: 'ASP.NET Core', icon: 'dot-net' },
  { text: 'Spring', icon: 'spring' },
  { text: 'SignalR', icon: 'dot-net' },
  { text: 'Socket.IO', icon: 'socketio', type: 'original' },
  { text: 'Bun', icon: 'bun' }
]

export const databasesAndTools: SkillItem[] = [
  { text: 'PostgreSQL', icon: 'postgresql' },
  { text: 'MySQL', icon: 'mysql' },
  { text: 'SQLite', icon: 'sqlite' },
  { text: 'Redis', icon: 'redis' },
  { text: 'Docker', icon: 'docker' },
  { text: 'Playwright', icon: 'playwright' },
  { text: 'Jest', icon: 'jest', type: 'plain' }
]
