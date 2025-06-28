const themes = {
  light: {
    bg: '#d1e9ff',
    nav: '#b3d9ff',
    text: '#333333',
    border: '#99ccff',
    borderOpacity: 'hsla(210, 100%, 80%, 0.4)',
    accent: '#0056b3'
  },
  dark: {
    bg: '#2d2d2d',
    nav: '#242424',
    text: '#f0f0f0',
    border: '#474747',
    borderOpacity: 'hsla(0, 0%, 28%, 0.4)',
    accent: '#1e90ff'
  }
}

export const applyTheme = (isDark: boolean) => {
  const theme = isDark ? themes.dark : themes.light
  const root = document.documentElement

  root.style.setProperty('--color-bg', theme.bg)
  root.style.setProperty('--color-nav', theme.nav)
  root.style.setProperty('--color-text', theme.text)
  root.style.setProperty('--color-border', theme.border)
  root.style.setProperty('--color-border-opacity', theme.borderOpacity)
  root.style.setProperty('--color-accent', theme.accent)

  document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
}

export const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme === 'dark') { return true }

  if (savedTheme === 'light') { return false }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const saveTheme = (isDark: boolean) => {
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}
