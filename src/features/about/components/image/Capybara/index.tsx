import type { ImageProps } from './CapybaraImage'

import CapybaraImage from './CapybaraImage'

export const Capybara = (props: ImageProps) => {
  return (
    <div className='flex aspect-square h-full w-full max-w-full items-center justify-center'>
      <CapybaraImage {...props} />
    </div>
  )
}
