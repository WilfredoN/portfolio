import { getIconUrl } from '@features/helpers/url/icon'
import { IconVariant } from '@shared/components/Icon'

const iconUrlCache = new Map<string, Promise<string | undefined>>()

export const fetchValidIconUrl = async (
  iconName: string,
  type?: IconVariant
): Promise<string | undefined> => {
  const cacheKey = type ? `${iconName}-${type}` : iconName
  if (iconUrlCache.has(cacheKey)) {
    return iconUrlCache.get(cacheKey)!
  }

  const fetchIconUrl = async (): Promise<string | undefined> => {
    const url = getIconUrl(iconName, type || 'original')
    try {
      const res = await fetch(url, { method: 'HEAD' })
      if (res.ok) {
        return url
      }
    } catch {}
    return undefined
  }

  const fetchPromise = (async () => await fetchIconUrl())()
  iconUrlCache.set(cacheKey, fetchPromise)

  return fetchPromise
}
