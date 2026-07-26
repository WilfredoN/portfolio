import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { sendGAPageView } from './ga'

export const useGAPageView = () => {
  const location = useLocation()

  useEffect(() => {
    const titleMap: Record<string, string> = {
      '/': 'About - Nikita Afanasiev',
      '/about': 'About - Nikita Afanasiev',
      '/projects': 'Projects - Nikita Afanasiev',
      '/feedback': 'Guestbook & Feedback - Nikita Afanasiev'
    }

    const title = titleMap[location.pathname] || document.title
    sendGAPageView(location.pathname, title)
  }, [location.pathname])
}
