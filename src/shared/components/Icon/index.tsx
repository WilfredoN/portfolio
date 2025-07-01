import { fetchValidIconUrl } from '@features/api/icon/fetchValidIconUrl'
import { memo, useEffect, useState } from 'react'

export type IconSize = 'medium' | 'large'

interface IconProps {
  iconName: string
  alt?: string
  title?: string
  size?: IconSize
}

export const Icon = memo(
  ({ iconName, alt, title, size = 'medium' }: IconProps) => {
    const [imageUrl, setImageUrl] = useState<string>()

    useEffect(() => {
      let isMounted = true
      const load = async () => {
        const url = await fetchValidIconUrl(iconName)

        if (isMounted) {
          setImageUrl(url)
        }
      }
      load()

      return () => {
        isMounted = false
      }
    }, [iconName])

    if (!imageUrl) {
      return null
    }

    return (
      <img
        className={`ml-2 ${size === 'medium' ? 'w-8 h-8' : 'w-12 h-12'}`}
        src={imageUrl}
        alt={alt ?? iconName}
        title={title ?? iconName}
      />
    )
  }
)
