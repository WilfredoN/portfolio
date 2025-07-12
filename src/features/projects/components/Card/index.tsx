import type { ProjectProps } from '@features/projects/data/projects'

import { ProjectImage } from '@features/projects/components/ProjectImage'
import { ProjectVideo } from '@features/projects/components/ProjectVideo'
import { Stack } from '@shared/components/Stack'
import { Text } from '@shared/components/Text'
import clsx from 'clsx'
import { motion } from 'motion/react'

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
  additionalDescription
}: ProjectProps) => {
  const isLarge = scale === 'large'

  const handleClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      className={clsx(
        'border-3 mb-12 flex w-full flex-col justify-between rounded-lg p-4 transition-transform duration-100',
        {
          'hover:scale-105': !videoUrl,
          'md:h-[30.625rem]': scale === 'medium',
          'h-max': scale !== 'medium',
          'max-w-full': isLarge,
          'max-w-[31.25rem]': !isLarge
        }
      )}
    >
      <motion.h1
        animate='final'
        className='flex flex-col items-center text-center text-4xl'
        initial='initial'
      >
        {imageUrl ? (
          <ProjectImage
            alt={title}
            className={imageStyle}
            src={imageUrl}
            title={imageTitle}
            onClick={link ? handleClick : undefined}
          />
        ) : videoUrl ? (
          <ProjectVideo src={videoUrl} />
        ) : (
          <span className="my-6 font-['Courgette'] text-[4rem] text-[#5287AD]">
            <a href={link}>{title}</a>
          </span>
        )}
        {isLarge && <Stack items={technologies} size={scale} />}

        <div className='mt-4 text-[1.7rem]'>
          <Text>{description}</Text>
          {additionalDescription && (
            <div className='mt-2'>{additionalDescription}</div>
          )}
        </div>
      </motion.h1>

      <div className='self-center justify-self-end'>
        {!isLarge && (
          <>
            <h3 className='mb-2 text-center text-3xl'>Technologies used:</h3>
            <Stack items={technologies} />
          </>
        )}
      </div>
    </motion.div>
  )
}
