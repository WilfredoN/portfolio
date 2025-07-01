import { motion } from 'motion/react'

interface ProjectVideoProps {
  src: string
  className?: string
}

export const ProjectVideo = ({ src, className }: ProjectVideoProps) => (
  <motion.video
    src={src}
    controls
    loop
    autoPlay={false}
    muted
    className={className || 'px-4 py-2 rounded-md my-2'}
  />
)
