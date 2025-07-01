import { motion } from 'motion/react'

interface ProjectVideoProps {
  className?: string
  src: string
}

export const ProjectVideo = ({ src, className }: ProjectVideoProps) => (
  <motion.video
    controls
    loop
    muted
    autoPlay={false}
    className={className || 'px-4 py-2 rounded-md my-2'}
    src={src}
  />
)
