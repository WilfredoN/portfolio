import { motion } from 'motion/react'

interface ProjectImageProps {
  src: string
  alt: string
  title?: string
  className?: string
}

export const ProjectImage = ({
  src,
  alt,
  title,
  className
}: ProjectImageProps) => (
  <motion.img
    src={src}
    alt={alt}
    title={title}
    className={className || 'px-4 py-2 rounded-md my-2'}
  />
)
