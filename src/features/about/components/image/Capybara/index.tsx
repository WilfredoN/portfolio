import { LoadingSpinner } from '@shared/components/Spinner/LoadingSpinner'
import { Activity, lazy, Suspense, useState } from 'react'

import { UniversalImage } from './UniversalImage'
import { useProgressiveImage } from './useProgressiveImage'

export interface ImageProps {
  alt?: string
  className?: string
  height?: number
  highQualityUrl?: string
  url?: string
  width?: number
}

const CapybaraImage = ({
  url = '/capybara_binary_compressed_v2.avif',
  highQualityUrl = '/capybara_binary.png',
  alt = 'Capybara image in zeros and ones style',
  width = 556,
  height = 556,
  className = ''
}: ImageProps) => {
  const { src, loaded } = useProgressiveImage(url, highQualityUrl)
  return (
    <UniversalImage
      alt={alt}
      avifSrc={url}
      className={className}
      height={height}
      loaded={loaded}
      pngSrc={highQualityUrl}
      src={src}
      width={width}
    />
  )
}

const CapybaraImageLazy = lazy(() =>
  Promise.resolve({ default: CapybaraImage })
)

export const Capybara = (props: ImageProps) => {
  const [visible] = useState(true)
  return (
    <Activity mode={visible ? 'visible' : 'hidden'}>
      <Suspense
        fallback={<LoadingSpinner size='lg' text='Loading capybara...' />}
      >
        <CapybaraImageLazy {...props} />
      </Suspense>
    </Activity>
  )
}
