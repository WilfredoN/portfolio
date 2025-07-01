import type { JSX, ReactNode } from 'react'

import { ThemeContext } from '@app/contexts/ThemeContext'
import {
  applyTheme,
  getInitialTheme,
  saveTheme
} from '@features/about/utils/theme'
import { useEffect, useState } from 'react'

export const ThemeProvider = ({
  children
}: {
  children: ReactNode
}): JSX.Element => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialTheme())

  useEffect(() => {
    applyTheme(isDarkTheme)
  }, [isDarkTheme])

  const toggleTheme = () => {
    const newTheme = !isDarkTheme
    setIsDarkTheme(newTheme)
    saveTheme(newTheme)
  }

  return (
    <ThemeContext value={{ isDarkTheme, toggleTheme }}>{children}</ThemeContext>
  )
}
