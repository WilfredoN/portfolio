import { getIconUrl } from '@features/helpers/url/icon'
import { memo, useEffect, useMemo, useState } from 'react'

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
    const initialSrc = useMemo(
      () => getIconUrl(iconName, type),
      [iconName, type]
    )
    const [src, setSrc] = useState<string>(initialSrc)
    const [attemptedFallback, setAttemptedFallback] = useState(false)

    useEffect(() => {
      setAttemptedFallback(false)
      setSrc(getIconUrl(iconName, type))
    }, [iconName, type])

    if (!src) {
      return null
    }

    const handleError = () => {
      if (!attemptedFallback && type !== 'plain') {
        setAttemptedFallback(true)
        setSrc(getIconUrl(iconName, 'plain'))
      } else {
        setSrc('')
      }
    }

    return (
      <img
        alt={alt ?? iconName}
        className={`ml-2 ${size === 'medium' ? 'h-8 w-8' : 'h-12 w-12'}`}
        src={src}
        title={title ?? iconName}
        onError={handleError}
      />
    )
  }
)
