import { motion } from 'motion/react'

interface ProjectImageProps {
  alt: string
  className?: string
  src: string
  title?: string
}

export const ProjectImage = ({
  src,
  alt,
  title,
  className
}: ProjectImageProps) => (
  <motion.img
    alt={alt}
    className={className || 'px-4 py-2 rounded-md my-2'}
    src={src}
    title={title}
  />
)
