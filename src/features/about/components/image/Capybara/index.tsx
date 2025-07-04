// TODO: move
export interface ImageProps {
  alt?: string
  url?: string
}

export const Capybara = ({
  url = 'assets/capybara_binary.png',
  alt = 'Capybara image in zeros and ones style'
}: ImageProps) => {
  if (!url) {
    throw new Error('Image URL is missing')
  }

  if (!alt) {
    throw new Error('Image alt text is missing')
  }

  return (
    <img
      alt={alt || 'Sorry, image not found'}
      className='scale-105 rounded-full'
      draggable='false'
      src={url}
    />
  )
}
