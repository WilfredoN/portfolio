import type { SkillKey } from '@shared/constants/skills'
import type { JSX } from 'react'

import { SKILL_KEYS } from '@shared/constants/skills'

export type Category = 'web-app' | 'game' | 'landing'

export interface CategoryConfig {
  color: 'blue' | 'purple' | 'emerald'
  emoji: string
  id: Category
  label: string
}

export const CATEGORIES: CategoryConfig[] = [
  { id: 'web-app', label: 'Web Apps', emoji: '🚀', color: 'blue' },
  { id: 'game', label: 'Games', emoji: '🎮', color: 'purple' },
  { id: 'landing', label: 'Landings', emoji: '🧪', color: 'emerald' }
]

export interface ProjectProps {
  additionalDescription?: JSX.Element
  category: Category
  description: string
  imageStyle?: string
  imageTitle?: string
  imageUrl?: string
  link?: string
  scale?: 'small' | 'medium' | 'large'
  technologies: SkillKey[]
  title: string
  videoUrl?: string
}

export const projects: ProjectProps[] = [
  {
    title: 'Order Summary Component',
    description:
      'A responsive order summary card component built with HTML, CSS, and JavaScript. Features hover states for interactive elements and follows Frontend Mentor design specifications.',
    technologies: [SKILL_KEYS.HTML5, SKILL_KEYS.CSS3, SKILL_KEYS.JAVASCRIPT],
    scale: 'small',
    link: '/projects/order-summary-component-main/index.html',
    imageUrl: 'projects/order-summary-component-main/design/desktop-design.jpg',
    category: 'landing'
  },
  {
    title: 'Calculator App',
    description:
      'A fully functional calculator application with multiple themes. Features theme switching, keyboard support, and responsive design for all device sizes.',
    technologies: [SKILL_KEYS.HTML5, SKILL_KEYS.CSS3, SKILL_KEYS.JAVASCRIPT],
    scale: 'small',
    link: '/projects/calculator-app-main/index.html',
    imageUrl: 'projects/calculator-app-main/design/desktop-design-theme-1.jpg',
    category: 'landing'
  },
  {
    title: 'Sunnyside Agency Landing Page',
    description:
      'A modern, responsive landing page for a creative agency. Features smooth animations, mobile navigation toggle, and optimized images with CSS Grid and Flexbox layouts.',
    technologies: [SKILL_KEYS.HTML5, SKILL_KEYS.CSS3, SKILL_KEYS.JAVASCRIPT],
    scale: 'large',
    link: '/projects/sunnyside-agency-landing-page-main/index.html',
    imageUrl:
      'projects/sunnyside-agency-landing-page-main/design/desktop-design.jpg',
    category: 'landing'
  },
  {
    title: 'Blogr Landing Page',
    description:
      'A feature-rich landing page for a modern publishing platform. Includes custom dropdown menus, responsive design, and engaging visual hierarchy.',
    technologies: [SKILL_KEYS.HTML5, SKILL_KEYS.CSS3, SKILL_KEYS.JAVASCRIPT],
    scale: 'small',
    link: '/projects/Blogr-landing-page/index.html',
    imageUrl: 'projects/Blogr-landing-page/design/desktop-design.jpg',
    category: 'landing'
  },
  {
    title: 'FAQ Accordion Card',
    description:
      'An interactive FAQ component with smooth accordion animations. Built with accessible HTML structure and vanilla JavaScript for functionality.',
    technologies: [SKILL_KEYS.HTML5, SKILL_KEYS.CSS3, SKILL_KEYS.JAVASCRIPT],
    scale: 'small',
    link: '/projects/faq-accordion-card-main/index.html',
    imageUrl: 'projects/faq-accordion-card-main/design/desktop-design.jpg',
    category: 'landing'
  },
  {
    title: 'Interactive Pricing Component',
    description:
      'A dynamic pricing component with toggle functionality and responsive design. Features smooth transitions and interactive elements for better user experience.',
    technologies: [SKILL_KEYS.HTML5, SKILL_KEYS.CSS3, SKILL_KEYS.JAVASCRIPT],
    scale: 'small',
    link: '/projects/interactive-pricing-component-main/index.html',
    imageUrl:
      'projects/interactive-pricing-component-main/design/desktop-design.jpg',
    category: 'landing'
  },
  {
    title: 'UChat',
    description:
      'A cross-platform real-time chat application built with ASP.NET Core, SignalR, and Avalonia UI as a native desktop client. Features direct and group messaging with AES-256 message encryption, file attachments, user search and blocking, and paginated message history. Developed in 10 days within a 5-person team, where I served as team lead, front-end developer, and mentor.',
    technologies: [
      SKILL_KEYS.CSHARP,
      SKILL_KEYS.DOTNET,
      SKILL_KEYS.SIGNALR,
      SKILL_KEYS.SQLITE,
      SKILL_KEYS.AVALONIA
    ],
    imageUrl: 'uchat.png',
    scale: 'large',
    category: 'web-app'
  },
  {
    title: 'Alexandria',
    scale: 'medium',
    imageTitle: 'Github Repository',
    description:
      'A web platform for organizing a convenient learning process as well as communication between teachers and students. It was made as part of a exam project in a college.',
    technologies: [
      SKILL_KEYS.ANGULAR,
      SKILL_KEYS.TYPESCRIPT,
      SKILL_KEYS.NODEJS,
      SKILL_KEYS.SPRING,
      SKILL_KEYS.POSTGRESQL
    ],
    link: 'https://github.com/WilfredoN/alexandria-app',
    category: 'web-app'
  },
  {
    title: 'WinWin.Travel',
    description:
      'A hotel room comparison platform that allows users to find the best hotel room for their needs.',
    additionalDescription: (
      <span>
        If you wanna get demo - contact{' '}
        <a
          className='text-blue-400 hover:underline'
          href='https://www.winwin.travel/'
        >
          here
        </a>
      </span>
    ),
    technologies: [
      SKILL_KEYS.REACT,
      SKILL_KEYS.TYPESCRIPT,
      SKILL_KEYS.CHAKRAUI,
      SKILL_KEYS.NODEJS
    ],
    link: 'https://www.winwin.travel/',
    imageUrl: 'winwin.png',
    imageStyle: 'bg-white px-4 py-2 rounded-md',
    category: 'web-app'
  },
  {
    title: 'Marvel Bit',
    description:
      'A real-time 1v1 browser card battler with an 8-bit pixel art aesthetic, built with Node.js, Express, Socket.IO, and MySQL. Features a server-authoritative game engine with a mana system, 20 Marvel hero cards across 4 tiers, 11 passive and 13 active abilities, drag-and-drop card play with SVG Bézier attack arrows, and seamless reconnection recovery.',
    technologies: [
      SKILL_KEYS.NODEJS,
      SKILL_KEYS.EXPRESS,
      SKILL_KEYS.SOCKETIO,
      SKILL_KEYS.MYSQL,
      SKILL_KEYS.JAVASCRIPT
    ],
    scale: 'large',
    videoUrl: 'marvel_bit.mp4',
    category: 'game'
  },
  {
    title: 'Deadlines Rule The World',
    description:
      'Deadlines Rule The World is a 2D game developed in C using the SDL2 library. The game features a bee character that the player controls, tasked with avoiding enemies, while collecting coins. The game incorporates collision detection, object management, and a start screen UI. Enemies and sprints move around the screen, and the player can shoot missiles. The goal of the game is to survive until all tasks and sprints are eliminated.',
    technologies: [SKILL_KEYS.C, SKILL_KEYS.SDL],
    scale: 'large',
    videoUrl: 'endgame_gif.webm',
    category: 'game'
  }
]
