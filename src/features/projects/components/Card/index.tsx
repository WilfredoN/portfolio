import type { ProjectProps } from '@features/projects/data/projects'

import { ProjectImage } from '@features/projects/components/ProjectImage'
import { ProjectPreviewModal } from '@features/projects/components/ProjectPreviewModal'
import { sendGAEvent } from '@features/shared/analytics/ga'
import { useAppConfig } from '@features/shared/config/useAppConfig'
import { Text } from '@shared/components/Text'
import { SKILL_DEFINITIONS } from '@shared/constants/skills'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { lazy, useState } from 'react'

const Video = lazy(() =>
  import('@features/projects/components/ProjectVideo').then((module) => ({
    default: module.ProjectVideo
  }))
)

interface CardProps extends ProjectProps {
  onSelectPreview?: (title: string, link: string) => void
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
  selectedTags = [],
  onSelectPreview
}: CardProps) => {
  const { config } = useAppConfig()
  const [showPreview, setShowPreview] = useState(false)
  const isLarge = scale === 'large'
  const handleClick = () => {
    if (link) {
      sendGAEvent({
        action: 'project_click',
        category: 'Engagement',
        label: title,
        params: { link_url: link }
      })
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  const isPreviewable = Boolean(link && link.startsWith('/projects/'))

  return (
    <motion.div
      className={clsx(
        'mb-12 flex w-full transform-gpu flex-col justify-between rounded-xl border border-black/10 bg-white/80 p-4 shadow-xl backdrop-blur-sm transition-all duration-200 [content-visibility:auto] sm:backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/85',
        {
          'hover:scale-105': !videoUrl && !isLarge,
          'h-auto min-h-122.5': scale === 'medium',
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
            <a
              href={link}
              rel='noopener noreferrer'
              target='_blank'
              onClick={handleClick}
            >
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

        {isPreviewable && config.enableLivePreview && (
          <div className='mt-4 flex justify-center gap-3'>
            <button
              className='flex cursor-pointer items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400 transition-colors hover:bg-emerald-500 hover:text-zinc-950'
              onClick={() => {
                sendGAEvent({
                  action: 'live_preview_click',
                  category: 'Engagement',
                  label: title
                })
                if (onSelectPreview && link) {
                  onSelectPreview(title, link)
                } else {
                  setShowPreview(true)
                }
              }}
            >
              <span>👁️</span> Live Preview
            </button>
          </div>
        )}
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
                  ? 'border-blue-500/80 bg-blue-600 text-white shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                  : 'border-zinc-700 bg-zinc-800 text-white'
              )}
            >
              #{name}
            </span>
          )
        })}
      </div>

      {showPreview && link && (
        <ProjectPreviewModal
          link={link}
          title={title}
          onClose={() => setShowPreview(false)}
        />
      )}
    </motion.div>
  )
}
