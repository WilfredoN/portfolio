import type { Skill } from '@features/feedback/types/skill'

import { getSkillIconName } from '@features/feedback/utils/getIconName'
import { Icon } from '@shared/components/Icon'
import clsx from 'clsx'
import { motion } from 'motion/react'

interface SkillBadgeSelectableProps {
  isSelected?: boolean
  onClick?: () => void
  skill: Skill
}

export const SkillBadgeSelectable = ({
  skill,
  isSelected = false,
  onClick
}: SkillBadgeSelectableProps) => (
  <motion.button
    className={clsx(
      'skill-badge min-w-max',
      isSelected ? 'skill-badge-selectable-selected' : 'skill-badge-selectable'
    )}
    type='button'
    onClick={onClick}
  >
    <Icon iconName={getSkillIconName(skill.name)} size='medium' />
    <span className='text-sm font-medium'>{skill.name}</span>
    {isSelected && (
      <motion.svg
        className='ml-auto h-4 w-4'
        fill='currentColor'
        viewBox='0 0 20 20'
      >
        <path
          clipRule='evenodd'
          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
          fillRule='evenodd'
        />
      </motion.svg>
    )}
  </motion.button>
)
