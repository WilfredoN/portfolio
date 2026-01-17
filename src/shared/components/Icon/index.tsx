import { getIconUrl } from '@features/helpers/url/icon'
import { memo, useEffect, useMemo, useRef, useState } from 'react'

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
    const [src, setSrc] = useState<string | null>(null)
    const [attemptedFallback, setAttemptedFallback] = useState(false)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)
    useEffect(() => {
      setAttemptedFallback(false)
      setSrc(null)
      if (imgRef.current) {
        if (observerRef.current) {
          observerRef.current.disconnect()
        }
        observerRef.current = new window.IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setSrc(getIconUrl(iconName, type))
                observerRef.current?.disconnect()
              }
            })
          },
          { rootMargin: '200px' }
        )
        observerRef.current.observe(imgRef.current)
      }
      return () => {
        observerRef.current?.disconnect()
      }
    }, [iconName, type])

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
        ref={imgRef}
        alt={alt ?? iconName}
        className={`ml-2 ${size === 'medium' ? 'h-8 w-8' : 'h-12 w-12'}`}
        loading='lazy'
        src={src ?? undefined}
        style={{ borderRadius: 8 }}
        title={title ?? iconName}
        onError={handleError}
      />
    )
  }
)
