interface GAEventParams {
  action: string
  category: string
  label?: string
  params?: Record<string, unknown>
  value?: number
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export const sendGAEvent = ({
  action,
  category,
  label,
  value,
  params
}: GAEventParams): void => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
      ...params
    })
  }
}

export const sendGAPageView = (path: string, title?: string): void => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    })
  }
}

export const sendOutboundClick = (destination: string, url: string): void => {
  sendGAEvent({
    action: 'outbound_click',
    category: 'Outbound',
    label: destination,
    params: {
      link_url: url,
      destination
    }
  })
}
