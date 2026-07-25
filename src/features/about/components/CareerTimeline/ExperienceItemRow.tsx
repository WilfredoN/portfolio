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
  const [isCardHovered, setIsCardHovered] = useState(false)
  const [isNodeHovered, setIsNodeHovered] = useState(false)

  return (
    <motion.div
      className='relative flex w-full min-w-0 gap-4 sm:gap-8'
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <ExperienceNode
        experience={experience}
        isHovered={isCardHovered || isNodeHovered}
        onMouseEnter={() => setIsNodeHovered(true)}
        onMouseLeave={() => setIsNodeHovered(false)}
      />
      <ExperienceCard
        experience={experience}
        isHovered={isCardHovered}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      />
    </motion.div>
  )
}
