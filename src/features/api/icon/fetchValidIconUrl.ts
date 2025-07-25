import { getIconUrl } from '@features/helpers/url/icon'

const iconUrlCache = new Map<string, Promise<string | undefined>>()

export const fetchValidIconUrl = async (
  iconName: string
): Promise<string | undefined> => {
  if (iconUrlCache.has(iconName)) {
    return iconUrlCache.get(iconName)!
  }

  const fetchIconUrl = async (
    iconName: string
  ): Promise<string | undefined> => {
    const originalUrl = getIconUrl(iconName, 'original')
    const plainUrl = getIconUrl(iconName, 'plain')

    try {
      // FIXME: fix error in console log even though we catch it
      const res = await fetch(originalUrl, { method: 'HEAD' })

      if (res.ok) {
        return originalUrl
      }
    } catch (error) {
      console.error(`Error fetching original icon: ${error}`)
    }

    try {
      const res = await fetch(plainUrl, { method: 'HEAD' })

      if (res.ok) {
        return plainUrl
      }
    } catch (error) {
      console.error(`Error fetching plain icon: ${error}`)
    }

    return undefined
  }

  const fetchPromise = (async () => await fetchIconUrl(iconName))()
  iconUrlCache.set(iconName, fetchPromise)

  return fetchPromise
}
