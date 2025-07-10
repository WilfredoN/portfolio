import clsx from 'clsx'
import { motion } from 'motion/react'

interface ProjectImageProps {
  alt: string
  className?: string
  onClick?: () => void
  src: string
  title?: string
}

export const ProjectImage = ({
  src,
  alt,
  title,
  onClick,
  className
}: ProjectImageProps) => (
  <motion.img
    alt={alt}
    className={clsx(
      className,
      'px-4 py-2 rounded-3xl my-2 w-full max-h-80 object-cover',
      onClick && 'cursor-pointer'
    )}
    loading='lazy'
    src={src}
    title={title}
    onClick={onClick}
  />
)
