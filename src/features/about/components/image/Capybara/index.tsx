// TODO: move
export interface ImageProps {
  alt?: string
  url?: string
}

export const Capybara = ({
  url = '/assets/capybara_binary.webp',
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
      draggable='false'
      fetchPriority='high'
      height={556}
      src={url}
      width={556}
    />
  )
}
