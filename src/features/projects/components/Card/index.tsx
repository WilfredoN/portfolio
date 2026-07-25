import type { ProjectProps } from '@features/projects/data/projects'

import { ProjectImage } from '@features/projects/components/ProjectImage'
import { Text } from '@shared/components/Text'
import { SKILL_DEFINITIONS } from '@shared/constants/skills'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { lazy } from 'react'

const Video = lazy(() =>
  import('@features/projects/components/ProjectVideo').then((module) => ({
    default: module.ProjectVideo
  }))
)

interface CardProps extends ProjectProps {
  onOpenDetails?: (project: ProjectProps) => void
  selectedTags?: string[]
}

export const Card = (props: CardProps) => {
  const {
    title,
    description,
    technologies,
    link,
    imageUrl,
    videoUrl,
    imageTitle,
    imageStyle,
    scale = 'medium',
    additionalDescription,
    selectedTags = [],
    onOpenDetails
  } = props

  const isLarge = scale === 'large'
  const handleCardClick = () => {
    if (onOpenDetails) {
      onOpenDetails(props)
    } else if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      className={clsx(
        'group relative mb-12 flex w-full cursor-pointer flex-col justify-between rounded-2xl border border-(--color-border,rgba(255,255,255,0.15)) bg-(--color-bg-alt,rgba(255,255,255,0.02)) p-6 shadow-md transition-all duration-200 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10',
        {
          'md:h-122.5': scale === 'medium',
          'h-max': scale !== 'medium',
          'max-w-full': isLarge,
          'max-w-125 md:max-w-full': !isLarge
        }
      )}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={handleCardClick}
    >
      <motion.div className='flex flex-col items-center text-center'>
        {imageUrl ? (
          <ProjectImage
            alt={title}
            className={imageStyle}
            src={imageUrl}
            title={imageTitle}
          />
        ) : videoUrl ? (
          <Video src={videoUrl} />
        ) : (
          <span className='font-courgette my-6 text-[4rem] text-[#5287AD]'>
            {title}
          </span>
        )}
        <div className='mt-4 text-[1.7rem] text-(--color-text)'>
          <Text>{description}</Text>
          {additionalDescription && (
            <div className='mt-2 text-sky-400'>{additionalDescription}</div>
          )}
        </div>
      </motion.div>

      <div className='mt-6 flex flex-wrap justify-center gap-2'>
        {technologies.map((tech) => {
          const isActive = selectedTags.includes(tech)
          const name = SKILL_DEFINITIONS[tech]?.name ?? tech
          return (
            <span
              key={tech}
              className={clsx(
                'rounded-full border px-3 py-1.5 text-[1.3rem] transition-all duration-200 select-none',
                isActive
                  ? 'border-blue-500/80 bg-blue-600 text-white shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                  : 'border-current/20 bg-current/5 text-(--color-text-muted,rgba(255,255,255,0.8))'
              )}
            >
              #{name}
            </span>
          )
        })}
      </div>

      <div className='mt-4 flex items-center justify-end text-xs font-semibold text-sky-400 opacity-0 transition-opacity group-hover:opacity-100'>
        <span>View Details & Links →</span>
      </div>
    </motion.div>
  )
}

