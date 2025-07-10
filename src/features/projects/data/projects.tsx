import type { JSX } from 'react'

type Category = 'project' | 'live'

export interface ProjectProps {
  additionalDescription?: JSX.Element
  category?: Category
  description: string
  imageStyle?: string
  imageTitle?: string
  imageUrl?: string
  link?: string
  scale?: 'small' | 'medium' | 'large'
  technologies: string[]
  title: string
  videoUrl?: string
}

export const projects: ProjectProps[] = [
  {
    title: 'Order Summary Component',
    description:
      'A responsive order summary card component built with HTML, CSS, and JavaScript. Features hover states for interactive elements and follows Frontend Mentor design specifications.',
    technologies: ['html5', 'css3', 'javascript'],
    scale: 'small',
    link: '/projects/order-summary-component-main/index.html',
    imageUrl: 'projects/order-summary-component-main/design/desktop-design.jpg',
    category: 'live'
  },
  {
    title: 'Calculator App',
    description:
      'A fully functional calculator application with multiple themes. Features theme switching, keyboard support, and responsive design for all device sizes.',
    technologies: ['html5', 'css3', 'javascript'],
    scale: 'small',
    link: '/projects/calculator-app-main/index.html',
    imageUrl: 'projects/calculator-app-main/design/desktop-design-theme-1.jpg',
    category: 'live'
  },
  {
    title: 'Sunnyside Agency Landing Page',
    description:
      'A modern, responsive landing page for a creative agency. Features smooth animations, mobile navigation toggle, and optimized images with CSS Grid and Flexbox layouts.',
    technologies: ['html5', 'css3', 'javascript'],
    scale: 'large',
    link: '/projects/sunnyside-agency-landing-page-main/index.html',
    imageUrl:
      'projects/sunnyside-agency-landing-page-main/design/desktop-design.jpg',
    category: 'live'
  },
  {
    title: 'Blogr Landing Page',
    description:
      'A feature-rich landing page for a modern publishing platform. Includes custom dropdown menus, responsive design, and engaging visual hierarchy.',
    technologies: ['html5', 'css3', 'javascript'],
    scale: 'small',
    link: '/projects/Blogr-landing-page/index.html',
    imageUrl: 'projects/Blogr-landing-page/design/desktop-design.jpg',
    category: 'live'
  },
  {
    title: 'FAQ Accordion Card',
    description:
      'An interactive FAQ component with smooth accordion animations. Built with accessible HTML structure and vanilla JavaScript for functionality.',
    technologies: ['html5', 'css3', 'javascript'],
    scale: 'small',
    link: '/projects/faq-accordion-card-main/index.html',
    imageUrl: 'projects/faq-accordion-card-main/design/desktop-design.jpg',
    category: 'live'
  },
  {
    title: 'Interactive Pricing Component',
    description:
      'A dynamic pricing component with toggle functionality and responsive design. Features smooth transitions and interactive elements for better user experience.',
    technologies: ['html5', 'css3', 'javascript'],
    scale: 'small',
    link: '/projects/interactive-pricing-component-main/index.html',
    imageUrl:
      'projects/interactive-pricing-component-main/design/desktop-design.jpg',
    category: 'live'
  },
  {
    title: 'Alexandria',
    scale: 'medium',
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
          className='text-blue-400 hover:underline'
          href='https://www.winwin.travel/'
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
