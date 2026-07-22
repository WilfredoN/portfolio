import type { IconVariant } from '@shared/components/Icon'

export const SKILL_KEYS = {
  JAVA: 'java',
  CSHARP: 'csharp',
  TYPESCRIPT: 'typescript',
  JAVASCRIPT: 'javascript',
  PYTHON: 'python',
  C: 'c',
  CPLUSPLUS: 'cplusplus',
  REACT: 'react',
  ANGULAR: 'angular',
  AVALONIA: 'avalonia',
  HTML5: 'html5',
  CSS3: 'css3',
  TAILWINDCSS: 'tailwindcss',
  CHAKRAUI: 'chakraui',
  VITE: 'vitejs',
  NODEJS: 'nodejs',
  EXPRESS: 'express',
  DOTNET: 'dotnet',
  SPRING: 'spring',
  SIGNALR: 'signalr',
  SOCKETIO: 'socketio',
  BUN: 'bun',
  POSTGRESQL: 'postgresql',
  MYSQL: 'mysql',
  SQLITE: 'sqlite',
  REDIS: 'redis',
  DOCKER: 'docker',
  PLAYWRIGHT: 'playwright',
  JEST: 'jest',
  SDL: 'sdl',
  EXPO: 'expo',
  OAUTH: 'oauth',
  STORYBOOK: 'storybook',
  FIREBASE: 'firebase',
  TANSTACK_TABLE: 'tanstack-table',
  CELERY: 'celery',
  LANGCHAIN: 'langchain',
  LANGGRAPH: 'langgraph',
  WEBHOOKS: 'webhooks',
  CHATGPT: 'chatgpt',
  REDUX: 'redux'
} as const

export type SkillKey = (typeof SKILL_KEYS)[keyof typeof SKILL_KEYS]

export interface SkillDefinition {
  icon: string
  id: SkillKey
  name: string
  type?: IconVariant
}

export const SKILL_DEFINITIONS: Record<string, SkillDefinition> = {
  [SKILL_KEYS.JAVA]: { id: SKILL_KEYS.JAVA, name: 'Java', icon: 'java' },
  [SKILL_KEYS.CSHARP]: { id: SKILL_KEYS.CSHARP, name: 'C#', icon: 'csharp' },
  [SKILL_KEYS.TYPESCRIPT]: {
    id: SKILL_KEYS.TYPESCRIPT,
    name: 'TypeScript',
    icon: 'typescript'
  },
  [SKILL_KEYS.JAVASCRIPT]: {
    id: SKILL_KEYS.JAVASCRIPT,
    name: 'JavaScript',
    icon: 'javascript'
  },
  [SKILL_KEYS.PYTHON]: {
    id: SKILL_KEYS.PYTHON,
    name: 'Python',
    icon: 'python'
  },
  [SKILL_KEYS.C]: { id: SKILL_KEYS.C, name: 'C', icon: 'c' },
  [SKILL_KEYS.CPLUSPLUS]: {
    id: SKILL_KEYS.CPLUSPLUS,
    name: 'C++',
    icon: 'cplusplus'
  },
  [SKILL_KEYS.REACT]: { id: SKILL_KEYS.REACT, name: 'React', icon: 'react' },
  [SKILL_KEYS.ANGULAR]: {
    id: SKILL_KEYS.ANGULAR,
    name: 'Angular',
    icon: 'angular'
  },
  [SKILL_KEYS.AVALONIA]: {
    id: SKILL_KEYS.AVALONIA,
    name: 'Avalonia UI',
    icon: 'dot-net'
  },
  [SKILL_KEYS.HTML5]: { id: SKILL_KEYS.HTML5, name: 'HTML5', icon: 'html5' },
  [SKILL_KEYS.CSS3]: { id: SKILL_KEYS.CSS3, name: 'CSS3', icon: 'css3' },
  [SKILL_KEYS.TAILWINDCSS]: {
    id: SKILL_KEYS.TAILWINDCSS,
    name: 'TailwindCSS',
    icon: 'tailwindcss'
  },
  [SKILL_KEYS.CHAKRAUI]: {
    id: SKILL_KEYS.CHAKRAUI,
    name: 'ChakraUI',
    icon: 'chakraui'
  },
  [SKILL_KEYS.VITE]: { id: SKILL_KEYS.VITE, name: 'Vite', icon: 'vitejs' },
  [SKILL_KEYS.NODEJS]: {
    id: SKILL_KEYS.NODEJS,
    name: 'Node.js',
    icon: 'nodejs'
  },
  [SKILL_KEYS.EXPRESS]: {
    id: SKILL_KEYS.EXPRESS,
    name: 'Express',
    icon: 'express',
    type: 'original'
  },
  [SKILL_KEYS.DOTNET]: {
    id: SKILL_KEYS.DOTNET,
    name: 'ASP.NET Core',
    icon: 'dot-net'
  },
  [SKILL_KEYS.SPRING]: {
    id: SKILL_KEYS.SPRING,
    name: 'Spring',
    icon: 'spring'
  },
  [SKILL_KEYS.SIGNALR]: {
    id: SKILL_KEYS.SIGNALR,
    name: 'SignalR',
    icon: 'dot-net'
  },
  [SKILL_KEYS.SOCKETIO]: {
    id: SKILL_KEYS.SOCKETIO,
    name: 'Socket.IO',
    icon: 'socketio',
    type: 'original'
  },
  [SKILL_KEYS.BUN]: { id: SKILL_KEYS.BUN, name: 'Bun', icon: 'bun' },
  [SKILL_KEYS.POSTGRESQL]: {
    id: SKILL_KEYS.POSTGRESQL,
    name: 'PostgreSQL',
    icon: 'postgresql'
  },
  [SKILL_KEYS.MYSQL]: { id: SKILL_KEYS.MYSQL, name: 'MySQL', icon: 'mysql' },
  [SKILL_KEYS.SQLITE]: {
    id: SKILL_KEYS.SQLITE,
    name: 'SQLite',
    icon: 'sqlite'
  },
  [SKILL_KEYS.REDIS]: { id: SKILL_KEYS.REDIS, name: 'Redis', icon: 'redis' },
  [SKILL_KEYS.DOCKER]: {
    id: SKILL_KEYS.DOCKER,
    name: 'Docker',
    icon: 'docker'
  },
  [SKILL_KEYS.PLAYWRIGHT]: {
    id: SKILL_KEYS.PLAYWRIGHT,
    name: 'Playwright',
    icon: 'playwright'
  },
  [SKILL_KEYS.JEST]: {
    id: SKILL_KEYS.JEST,
    name: 'Jest',
    icon: 'jest',
    type: 'plain'
  },
  [SKILL_KEYS.SDL]: { id: SKILL_KEYS.SDL, name: 'SDL2', icon: 'sdl' },
  [SKILL_KEYS.EXPO]: { id: SKILL_KEYS.EXPO, name: 'Expo', icon: 'expo' },
  [SKILL_KEYS.OAUTH]: {
    id: SKILL_KEYS.OAUTH,
    name: 'OAuth 2.0',
    icon: 'oauth'
  },
  [SKILL_KEYS.STORYBOOK]: {
    id: SKILL_KEYS.STORYBOOK,
    name: 'Storybook',
    icon: 'storybook'
  },
  [SKILL_KEYS.FIREBASE]: {
    id: SKILL_KEYS.FIREBASE,
    name: 'Firebase',
    icon: 'firebase'
  },
  [SKILL_KEYS.TANSTACK_TABLE]: {
    id: SKILL_KEYS.TANSTACK_TABLE,
    name: 'TanStack Table',
    icon: 'react'
  },
  [SKILL_KEYS.CELERY]: {
    id: SKILL_KEYS.CELERY,
    name: 'Celery',
    icon: 'python'
  },
  [SKILL_KEYS.LANGCHAIN]: {
    id: SKILL_KEYS.LANGCHAIN,
    name: 'LangChain',
    icon: 'python'
  },
  [SKILL_KEYS.LANGGRAPH]: {
    id: SKILL_KEYS.LANGGRAPH,
    name: 'LangGraph',
    icon: 'python'
  },
  [SKILL_KEYS.WEBHOOKS]: {
    id: SKILL_KEYS.WEBHOOKS,
    name: 'Webhooks',
    icon: 'javascript'
  },
  [SKILL_KEYS.CHATGPT]: {
    id: SKILL_KEYS.CHATGPT,
    name: 'ChatGPT API',
    icon: 'react'
  },
  [SKILL_KEYS.REDUX]: { id: SKILL_KEYS.REDUX, name: 'Redux', icon: 'redux' }
}
