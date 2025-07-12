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
      'my-2 max-h-80 w-full rounded-3xl object-cover px-4 py-2',
      onClick && 'cursor-pointer'
    )}
    loading='lazy'
    src={src}
    title={title}
    onClick={onClick}
  />
)
