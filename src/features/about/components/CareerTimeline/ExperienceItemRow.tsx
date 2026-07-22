import type { ExperienceItem } from '@features/about/data/experience'

import { motion } from 'motion/react'
import { useState } from 'react'

import { ExperienceCard } from './ExperienceCard'
import { ExperienceNode } from './ExperienceNode'

interface ExperienceItemRowProps {
  experience: ExperienceItem
  index: number
}

export const ExperienceItemRow = ({
  experience,
  index
}: ExperienceItemRowProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className='relative flex w-full gap-6 sm:gap-8'
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ExperienceNode experience={experience} isHovered={isHovered} />
      <ExperienceCard experience={experience} isHovered={isHovered} />
    </motion.div>
  )
}
