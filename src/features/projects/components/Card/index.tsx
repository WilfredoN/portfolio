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
  selectedTags?: string[]
}

export const Card = ({
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
  selectedTags = []
}: CardProps) => {
  const isLarge = scale === 'large'
  const handleClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      className={clsx(
        'mb-12 flex w-full flex-col justify-between rounded-lg border-3 p-4 transition-transform duration-100',
        {
          'hover:scale-105': !videoUrl && !isLarge,
          'md:h-122.5': scale === 'medium',
          'h-max': scale !== 'medium',
          'max-w-full': isLarge,
          'max-w-125 md:max-w-full': !isLarge
        }
      )}
    >
      <motion.h1 className='flex flex-col items-center text-center text-4xl'>
        {imageUrl ? (
          <ProjectImage
            alt={title}
            className={imageStyle}
            src={imageUrl}
            title={imageTitle}
            onClick={link ? handleClick : undefined}
          />
        ) : videoUrl ? (
          <Video src={videoUrl} />
        ) : (
          <span className='font-courgette my-6 text-[4rem] text-[#5287AD]'>
            <a href={link} rel='noopener noreferrer' target='_blank'>
              {title}
            </a>
          </span>
        )}
        <div className='mt-4 text-[1.7rem]'>
          <Text>{description}</Text>
          {additionalDescription && (
            <div className='mt-2'>{additionalDescription}</div>
          )}
        </div>
      </motion.h1>

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
                  ? 'border-blue-500/60 bg-blue-500/25 text-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.2)]'
                  : 'border-zinc-700/40 bg-zinc-800/40 text-zinc-400'
              )}
            >
              #{name}
            </span>
          )
        })}
      </div>
    </motion.div>
  )
}
