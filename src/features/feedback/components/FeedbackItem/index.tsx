import type { Feedback } from '@features/feedback/types/feedback'

import { SkillBadge } from '@features/feedback/components/skills/badge/SkillBadge'
import { formatDate } from '@features/feedback/utils/format/formatDate'
import { motion } from 'motion/react'

interface FeedbackItemProps {
  feedback: Feedback
}

export const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className='feedback-item'
      initial={{ opacity: 0, y: 20 }}
    >
      <div className='mb-4 flex items-start justify-between'>
        <div className='flex items-center space-x-3'>
          <div
            className='flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold'
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
              <p className='mt-1 text-sm'>{feedback.company}</p>
            )}
          </div>
        </div>
        <time className='rounded-full px-3 py-1 text-lg'>
          {formatDate(feedback.created_at)}
        </time>
      </div>

      <div className='mb-6'>
        <div className='relative'>
          <svg
            className='absolute -top-2 -left-2 h-6 w-6'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z' />
          </svg>
          <p className='pl-6 text-lg leading-relaxed italic'>
            "{feedback.text}"
          </p>
        </div>
      </div>

      {feedback.skills && feedback.skills.length > 0 && (
        <div>
          <h4 className='mb-3 text-sm font-medium'>Related Skills:</h4>
          <div className='flex flex-wrap gap-2'>
            {feedback.skills.map((skill) => (
              <SkillBadge key={skill.id} skill={skill} variant='default' />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
