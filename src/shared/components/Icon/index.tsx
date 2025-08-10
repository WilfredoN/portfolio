import { fetchValidIconUrl } from '@features/api/icon/fetchValidIconUrl'
import { memo, useEffect, useState } from 'react'

export type IconSize = 'medium' | 'large'
export type IconVariant = 'original' | 'plain'

interface IconProps {
  alt?: string
  iconName: string
  size?: IconSize
  title?: string
  type?: IconVariant
}

export const Icon = memo(
  ({ iconName, alt, title, size = 'medium', type = 'original' }: IconProps) => {
    const [imageUrl, setImageUrl] = useState<string>()

    useEffect(() => {
      let isMounted = true
      const load = async () => {
        const url = await fetchValidIconUrl(iconName, type)

        if (isMounted) {
          setImageUrl(url)
        }
      }
      load()

      return () => {
        isMounted = false
      }
    }, [iconName, type])

    if (!imageUrl) {
      return null
    }

    return (
      <img
        alt={alt ?? iconName}
        className={`ml-2 ${size === 'medium' ? 'h-8 w-8' : 'h-12 w-12'}`}
        src={imageUrl}
        title={title ?? iconName}
      />
    )
  }
)
