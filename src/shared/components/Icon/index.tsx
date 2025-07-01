import { fetchValidIconUrl } from '@features/api/icon/fetchValidIconUrl'
import { memo, useEffect, useState } from 'react'

export type IconSize = 'medium' | 'large'

interface IconProps {
  alt?: string
  iconName: string
  size?: IconSize
  title?: string
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
        alt={alt ?? iconName}
        className={`ml-2 ${size === 'medium' ? 'w-8 h-8' : 'w-12 h-12'}`}
        src={imageUrl}
        title={title ?? iconName}
      />
    )
  }
)
