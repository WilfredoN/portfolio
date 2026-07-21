import { LoadingSpinner } from '@shared/components/Spinner/LoadingSpinner'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import type { ImageProps } from './CapybaraImage'

const CapybaraImageLazy = lazy(() => import('./CapybaraImage'))

export const Capybara = (props: ImageProps) => {
  const [visible, setVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '200px' }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        minWidth: props.width ?? 556,
        minHeight: props.height ?? 556,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {visible ? (
        <Suspense
          fallback={<LoadingSpinner size='lg' text='Loading capybara...' />}
        >
          <CapybaraImageLazy {...props} />
        </Suspense>
      ) : (
        <div
          style={{ width: props.width ?? 556, height: props.height ?? 556 }}
        />
      )}
    </div>
  )
}
