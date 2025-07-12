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
    className={className || 'my-2 rounded-md px-4 py-2'}
    preload='metadata'
    src={src}
  />
)
