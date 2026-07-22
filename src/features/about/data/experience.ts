import type { SkillKey } from '@shared/constants/skills'

import { SKILL_KEYS } from '@shared/constants/skills'

export enum EmploymentType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  APPRENTICESHIP = 'Apprenticeship',
  FREELANCE = 'Freelance',
  INTERNSHIP = 'Internship'
}

export enum LocationType {
  HYBRID = 'Hybrid',
  REMOTE = 'Remote',
  ON_SITE = 'On-site'
}

export interface ExperienceItem {
  bullets: string[]
  company: string
  companyLogoUrl?: string
  displayPeriod: string
  employmentType: EmploymentType
  endDate: string
  id: string
  locationType: LocationType
  relatedProjectTitles?: string[]
  role: string
  skillsUsed: SkillKey[]
  startDate: string
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'accenture',
    company: 'Accenture Baltics',
    companyLogoUrl: 'companies/accenture.png',
    role: 'Full Stack Engineer',
    employmentType: EmploymentType.FULL_TIME,
    locationType: LocationType.HYBRID,
    startDate: '2026-05',
    endDate: 'Present',
    displayPeriod: 'May 2026 - Present · 3 mos',
    bullets: [
      'Architecting and building enterprise-scale full-stack web applications and microservices.'
    ],
    skillsUsed: [
      SKILL_KEYS.REACT,
      SKILL_KEYS.TYPESCRIPT,
      SKILL_KEYS.NODEJS,
      SKILL_KEYS.JAVA,
      SKILL_KEYS.DOCKER
    ],
    relatedProjectTitles: []
  },
  {
    id: 'wwg',
    company: 'WWG',
    companyLogoUrl: 'companies/wwg.png',
    role: 'Frontend Developer',
    employmentType: EmploymentType.FULL_TIME,
    locationType: LocationType.REMOTE,
    startDate: '2025-08',
    endDate: '2026-05',
    displayPeriod: 'Aug 2025 - May 2026 · 10 mos',
    bullets: [
      'Architected end-to-end monetization & multi-tier subscription payment flows, establishing core revenue channels.',
      'Led mobile infrastructure migration to Expo, restructuring global state to cut tech debt & boost stability.',
      'Designed secure OAuth authentication (Apple, Google) and complex multi-step onboarding flows.',
      'Engineered interactive multimedia, geolocation, and AI-driven content generation features.'
    ],
    skillsUsed: [
      SKILL_KEYS.REACT,
      SKILL_KEYS.TYPESCRIPT,
      SKILL_KEYS.EXPO,
      SKILL_KEYS.TAILWINDCSS,
      SKILL_KEYS.OAUTH
    ],
    relatedProjectTitles: []
  },
  {
    id: 'massive',
    company: 'Massive',
    companyLogoUrl: 'companies/massive.png',
    role: 'Full Stack Engineer',
    employmentType: EmploymentType.APPRENTICESHIP,
    locationType: LocationType.REMOTE,
    startDate: '2025-03',
    endDate: '2025-06',
    displayPeriod: 'Mar 2025 - Jun 2025 · 4 mos',
    bullets: [
      'Modernized legacy architecture into a high-performance web app, boosting dev efficiency by 50%.',
      'Architected a Storybook component library, accelerating feature deployments.',
      'Boosted web performance by 40% using strategic lazy loading for pages and assets.',
      'Built multi-layered CI/CD testing with Playwright & Jest, reducing test execution times by 50%.',
      'Engineered Firebase authentication and dynamic TanStack Table UI components from scratch.'
    ],
    skillsUsed: [
      SKILL_KEYS.REACT,
      SKILL_KEYS.TYPESCRIPT,
      SKILL_KEYS.STORYBOOK,
      SKILL_KEYS.PLAYWRIGHT,
      SKILL_KEYS.JEST,
      SKILL_KEYS.FIREBASE,
      SKILL_KEYS.TANSTACK_TABLE
    ],
    relatedProjectTitles: []
  },
  {
    id: 'freelance',
    company: 'Freelance',
    companyLogoUrl: 'companies/upwork.png',
    role: 'Full Stack Engineer',
    employmentType: EmploymentType.FREELANCE,
    locationType: LocationType.REMOTE,
    startDate: '2024-12',
    endDate: '2025-02',
    displayPeriod: 'Dec 2024 - Feb 2025 · 3 mos',
    bullets: [
      'Refactored gateway microservice to event-driven webhooks for real-time blockchain balance updates.',
      'Built automated Midjourney API image generation pipeline for trigger-based card visualization.',
      'Orchestrated AI Telegram bot memory and behavior transitions using LangGraph & LangChain.',
      'Implemented async task processing with Redis & Celery for real-time persona-based dialogues.'
    ],
    skillsUsed: [
      SKILL_KEYS.PYTHON,
      SKILL_KEYS.REDIS,
      SKILL_KEYS.CELERY,
      SKILL_KEYS.LANGCHAIN,
      SKILL_KEYS.LANGGRAPH,
      SKILL_KEYS.WEBHOOKS
    ],
    relatedProjectTitles: []
  },
  {
    id: 'winwin-travel',
    company: 'www.WinWin.travel',
    companyLogoUrl: 'companies/winwin.png',
    role: 'Frontend Developer',
    employmentType: EmploymentType.PART_TIME,
    locationType: LocationType.REMOTE,
    startDate: '2024-05',
    endDate: '2024-12',
    displayPeriod: 'May 2024 - Dec 2024 · 8 mos',
    bullets: [
      'Integrated ChatGPT for intelligent user interactions and built responsive, performance-optimized hotel comparison interfaces.'
    ],
    skillsUsed: [
      SKILL_KEYS.REACT,
      SKILL_KEYS.TYPESCRIPT,
      SKILL_KEYS.CHAKRAUI,
      SKILL_KEYS.NODEJS,
      SKILL_KEYS.CHATGPT
    ],
    relatedProjectTitles: ['WinWin.Travel']
  },
  {
    id: 'meduzzen',
    company: 'Meduzzen',
    companyLogoUrl: 'companies/meduzzen.png',
    role: 'Frontend Developer',
    employmentType: EmploymentType.INTERNSHIP,
    locationType: LocationType.REMOTE,
    startDate: '2024-03',
    endDate: '2024-04',
    displayPeriod: 'Mar 2024 - Apr 2024 · 2 mos',
    bullets: [
      'Developed company and quiz management web applications using React, TypeScript, and Redux.'
    ],
    skillsUsed: [SKILL_KEYS.REACT, SKILL_KEYS.TYPESCRIPT, SKILL_KEYS.REDUX],
    relatedProjectTitles: []
  }
]
