import { useEffect, useRef } from 'react'

export interface UniversalImageProps {
  alt: string
  avifSrc?: string
  className?: string
  height?: number
  loaded: boolean
  pngSrc?: string
  src: string
  width?: number
}

export const UniversalImage = ({
  alt,
  className = '',
  height = 556,
  loaded,
  src,
  width = 556,
  avifSrc,
  pngSrc
}: UniversalImageProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!loaded && imgRef.current) {
      imgRef.current.setAttribute('aria-busy', 'true')
    } else if (imgRef.current) {
      imgRef.current.removeAttribute('aria-busy')
    }
  }, [loaded])

  return (
    <picture className='block h-full w-full max-w-full'>
      {avifSrc && <source srcSet={avifSrc} type='image/avif' />}
      {pngSrc && <source srcSet={pngSrc} type='image/png' />}
      <img
        ref={imgRef}
        alt={alt}
        aria-busy={!loaded}
        aria-label={alt}
        className={`h-full w-full max-w-full rounded-full object-cover ${className}`}
        decoding='async'
        draggable={false}
        fetchPriority='high'
        height={height}
        loading='eager'
        src={src}
        style={{
          background: '#18181b',
          filter: loaded ? 'none' : 'blur(0px)',
          objectFit: 'cover',
          transition: 'none',
          width: '100%',
          height: '100%',
          display: 'block'
        }}
        width={width}
      />
    </picture>
  )
}
