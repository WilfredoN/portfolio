const themes = {
  light: {
    bg: '#d1e9ff',
    bgCard: '#ffffff',
    bgElevated: '#e6f2ff',
    nav: '#b3d9ff',
    text: '#1a202c',
    textMuted: '#4a5568',
    border: '#99ccff',
    borderOpacity: 'hsla(210, 100%, 80%, 0.4)',
    accent: '#0056b3',
    toastBg: 'rgba(255, 255, 255, 0.95)',
    toastText: '#1a202c',
    statusSuccess: '#15803d',
    statusSuccessBg: '#dcfce7',
    statusSuccessBorder: '#86efac',
    statusError: '#b91c1c',
    statusErrorBg: '#fee2e2',
    statusErrorBorder: '#fca5a5',
    statusWarning: '#c2410c',
    statusWarningBg: '#ffedd5',
    statusWarningBorder: '#fdba74',
    statusInfo: '#0369a1',
    statusInfoBg: '#e0f2fe',
    statusInfoBorder: '#7dd3fc'
  },
  dark: {
    bg: '#2d2d2d',
    bgCard: '#1f1f1f',
    bgElevated: '#282828',
    nav: '#242424',
    text: '#f0f0f0',
    textMuted: '#a0aec0',
    border: '#474747',
    borderOpacity: 'hsla(0, 0%, 28%, 0.4)',
    accent: '#1e90ff',
    toastBg: 'rgba(30, 30, 42, 0.95)',
    toastText: '#f0f0f0',
    statusSuccess: '#34d399',
    statusSuccessBg: 'rgba(6, 78, 59, 0.75)',
    statusSuccessBorder: 'rgba(52, 211, 153, 0.5)',
    statusError: '#f87171',
    statusErrorBg: 'rgba(127, 29, 29, 0.75)',
    statusErrorBorder: 'rgba(248, 113, 113, 0.5)',
    statusWarning: '#fbbf24',
    statusWarningBg: 'rgba(120, 53, 15, 0.75)',
    statusWarningBorder: 'rgba(251, 191, 36, 0.5)',
    statusInfo: '#38bdf8',
    statusInfoBg: 'rgba(12, 74, 110, 0.75)',
    statusInfoBorder: 'rgba(56, 189, 248, 0.5)'
  }
}

export const applyTheme = (isDark: boolean) => {
  const theme = isDark ? themes.dark : themes.light
  const root = document.documentElement

  root.style.setProperty('--color-bg', theme.bg)
  root.style.setProperty('--color-bg-card', theme.bgCard)
  root.style.setProperty('--color-bg-elevated', theme.bgElevated)
  root.style.setProperty('--color-nav', theme.nav)
  root.style.setProperty('--color-text', theme.text)
  root.style.setProperty('--color-text-muted', theme.textMuted)
  root.style.setProperty('--color-border', theme.border)
  root.style.setProperty('--color-border-opacity', theme.borderOpacity)
  root.style.setProperty('--color-accent', theme.accent)
  root.style.setProperty('--color-toast-bg', theme.toastBg)
  root.style.setProperty('--color-toast-text', theme.toastText)

  root.style.setProperty('--color-status-success', theme.statusSuccess)
  root.style.setProperty('--color-status-success-bg', theme.statusSuccessBg)
  root.style.setProperty('--color-status-success-border', theme.statusSuccessBorder)

  root.style.setProperty('--color-status-error', theme.statusError)
  root.style.setProperty('--color-status-error-bg', theme.statusErrorBg)
  root.style.setProperty('--color-status-error-border', theme.statusErrorBorder)

  root.style.setProperty('--color-status-warning', theme.statusWarning)
  root.style.setProperty('--color-status-warning-bg', theme.statusWarningBg)
  root.style.setProperty('--color-status-warning-border', theme.statusWarningBorder)

  root.style.setProperty('--color-status-info', theme.statusInfo)
  root.style.setProperty('--color-status-info-bg', theme.statusInfoBg)
  root.style.setProperty('--color-status-info-border', theme.statusInfoBorder)

  document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
}


export const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme === 'dark') {
    return true
  }

  if (savedTheme === 'light') {
    return false
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const saveTheme = (isDark: boolean) => {
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}
