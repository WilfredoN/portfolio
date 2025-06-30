import { motion } from 'motion/react'

import type { Feedback } from '../../types/feedback'

import { formatFeedbackDate } from '../../utils/feedback'
import { SkillBadge } from '../input/skill/SkillBadge'

interface FeedbackItemProps {
  feedback: Feedback
}

export const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='feedback-item'
      whileHover={{ scale: 1.05 }}
    >
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center space-x-3'>
          <div
            className='w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg'
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #a21caf 100%)',
              color: '#fff'
            }}
          >
            {feedback.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className='text-lg font-semibold'>{feedback.author}</h3>
            {feedback.company && (
              <p className='text-sm mt-1'>{feedback.company}</p>
            )}
          </div>
        </div>
        <time className='text-lg px-3 py-1 rounded-full'>
          {formatFeedbackDate(feedback.created_at)}
        </time>
      </div>

      <div className='mb-6'>
        <div className='relative'>
          <svg
            className='absolute -top-2 -left-2 w-6 h-6'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z' />
          </svg>
          <p className='leading-relaxed text-lg pl-6 italic'>
            "
            {feedback.text}
            "
          </p>
        </div>
      </div>

      {feedback.skills && feedback.skills.length > 0 && (
        <div>
          <h4 className='text-sm font-medium mb-3'>Related Skills:</h4>
          <div className='flex flex-wrap gap-2'>
            {feedback.skills.map(skill => (
              <SkillBadge key={skill.id} skill={skill} variant='default' />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
