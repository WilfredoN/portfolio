import clsx from 'clsx'
import { motion } from 'motion/react'

import type { Skill } from '../../../types/feedback'

import { getSkillIconName } from '../../../utils/feedback'
import { Icon } from '../../Icon/Icon'

interface SkillBadgeSelectableProps {
  skill: Skill
  isSelected?: boolean
  onClick?: () => void
}

export const SkillBadgeSelectable = ({
  skill,
  isSelected = false,
  onClick
}: SkillBadgeSelectableProps) => (
  <motion.button
    type='button'
    onClick={onClick}
    className={clsx(
      'skill-badge',
      isSelected ? 'skill-badge-selectable-selected' : 'skill-badge-selectable'
    )}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
  >
    <Icon iconName={getSkillIconName(skill.name)} size='medium' />
    <span className='text-sm font-medium'>{skill.name}</span>
    {isSelected && (
      <motion.svg
        className='w-4 h-4 ml-auto'
        fill='currentColor'
        viewBox='0 0 20 20'
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <path
          fillRule='evenodd'
          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
          clipRule='evenodd'
        />
      </motion.svg>
    )}
  </motion.button>
)
