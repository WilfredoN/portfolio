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
    const searchParams = new URLSearchParams(location.search)

    const utmSource = searchParams.get('utm_source') || undefined
    const utmMedium = searchParams.get('utm_medium') || undefined
    const utmCampaign = searchParams.get('utm_campaign') || undefined
    const referrer = document.referrer || undefined

    sendGAPageView(location.pathname, title, {
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      referrer
    })
  }, [location.pathname, location.search])
}
