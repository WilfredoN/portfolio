import type { CommandAction } from '../types/command'

interface CreateCommandsParams {
  isDarkTheme: boolean
  navigate: (path: string) => void
  showToast: (msg: string, type?: 'success' | 'info') => void
  toggleTheme: () => void
}

export const createCommands = ({
  navigate,
  toggleTheme,
  isDarkTheme,
  showToast
}: CreateCommandsParams): CommandAction[] => [
  {
    id: 'nav-about',
    title: 'Go to About Me',
    subtitle: 'Career timeline, background & skill stack',
    icon: '👤',
    category: 'navigation',
    shortcut: 'G A',
    perform: () => {
      navigate('/about')
      showToast('Navigated to About page', 'info')
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
      showToast('Navigated to Projects page', 'info')
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
      showToast('Navigated to Feedback page', 'info')
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
      showToast(`Switched to ${isDarkTheme ? 'Light' : 'Dark'} mode`, 'success')
    }
  },
  {
    id: 'action-github',
    title: 'Open GitHub Profile',
    subtitle: 'github.com/WilfredoN',
    icon: '🐙',
    category: 'actions',
    perform: () => {
      window.open('https://github.com/WilfredoN', '_blank', 'noopener,noreferrer')
      showToast('Opened GitHub profile', 'info')
    }
  },
  {
    id: 'action-copy-email',
    title: 'Copy Contact Email',
    subtitle: 'Copy email address to clipboard',
    icon: '✉️',
    category: 'actions',
    shortcut: 'C E',
    perform: () => {
      navigator.clipboard.writeText('wilfredon@example.com')
      showToast('Email copied to clipboard!', 'success')
    }
  }
]
