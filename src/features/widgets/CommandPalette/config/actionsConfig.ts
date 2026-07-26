import type { CommandAction } from '../types/command'

interface CreateCommandsParams {
  isDarkTheme: boolean
  navigate: (path: string) => void
  toggleTheme: () => void
}

export const createCommands = ({
  navigate,
  toggleTheme,
  isDarkTheme
}: CreateCommandsParams): CommandAction[] => [
  {
    id: 'nav-about',
    title: 'Go to About',
    subtitle: 'Career timeline, background & skill stack',
    icon: '👤',
    category: 'navigation',
    shortcut: 'G A',
    perform: () => {
      navigate('/about')
    }
  },
  {
    id: 'nav-projects',
    title: 'Go to Projects Showcase',
    subtitle: 'Browse featured apps, games & architecture',
    icon: '🚀',
    category: 'navigation',
    shortcut: 'G P',
    perform: () => {
      navigate('/projects')
    }
  },
  {
    id: 'nav-feedback',
    title: 'Go to Guestbook & Feedback',
    subtitle: 'Read and submit community feedback',
    icon: '💬',
    category: 'navigation',
    shortcut: 'G F',
    perform: () => {
      navigate('/feedback')
    }
  },
  {
    id: 'action-theme',
    title: `Switch to ${isDarkTheme ? 'Light' : 'Dark'} Mode`,
    subtitle: `Current theme: ${isDarkTheme ? 'Dark' : 'Light'}`,
    icon: isDarkTheme ? '☀️' : '🌙',
    category: 'theme',
    shortcut: 'T',
    perform: () => {
      toggleTheme()
    }
  },
  {
    id: 'social-linkedin',
    title: 'Open LinkedIn Profile',
    subtitle: 'linkedin.com/in/capynq',
    icon: '💼',
    category: 'social',
    shortcut: 'S L',
    perform: () => {
      window.open(
        'https://www.linkedin.com/in/capynq',
        '_blank',
        'noopener,noreferrer'
      )
    }
  },
  {
    id: 'social-github',
    title: 'Open GitHub Profile',
    subtitle: 'github.com/WilfredoN',
    icon: '🐙',
    category: 'social',
    shortcut: 'S G',
    perform: () => {
      window.open(
        'https://github.com/WilfredoN',
        '_blank',
        'noopener,noreferrer'
      )
    }
  },
  {
    id: 'social-email',
    title: 'Send Contact Email',
    subtitle: 'nikita.afanasyevnn@gmail.com',
    icon: '✉️',
    category: 'social',
    shortcut: 'S E',
    perform: () => {
      window.open('mailto:nikita.afanasyevnn@gmail.com', '_self')
    }
  },
  {
    id: 'social-monkeytype',
    title: 'Open Monkeytype Profile',
    subtitle: 'monkeytype.com/profile/WilfredoN',
    icon: '⌨️',
    category: 'social',
    shortcut: 'S M',
    perform: () => {
      window.open(
        'https://monkeytype.com/profile/WilfredoN',
        '_blank',
        'noopener,noreferrer'
      )
    }
  },
  {
    id: 'social-wakatime',
    title: 'Open WakaTime Profile',
    subtitle: 'wakatime.com/@CapybaraN',
    icon: '📊',
    category: 'social',
    shortcut: 'S W',
    perform: () => {
      window.open(
        'https://wakatime.com/@CapybaraN',
        '_blank',
        'noopener,noreferrer'
      )
    }
  }
]
