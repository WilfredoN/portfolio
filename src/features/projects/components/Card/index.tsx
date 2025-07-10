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
        'flex flex-col justify-between mb-12 w-full border-3 rounded-lg p-4 transition-transform duration-100',
        {
          'hover:scale-105': !videoUrl,
          'md:h-[30.625rem] ': scale === 'medium',
          'h-max': scale !== 'medium',
          'max-w-full': isLarge,
          'max-w-[31.25rem]': !isLarge
        }
      )}
    >
      <motion.h1
        animate='final'
        className='text-4xl text-center flex items-center flex-col'
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

        <div className='text-[1.7rem] mt-4'>
          <Text>{description}</Text>
          {additionalDescription && (
            <div className='mt-2'>{additionalDescription}</div>
          )}
        </div>
      </motion.h1>

      <div className='self-center justify-self-end '>
        {!isLarge && (
          <>
            <h3 className='text-3xl text-center mb-2'>Technologies used:</h3>
            <Stack items={technologies} />
          </>
        )}
      </div>
    </motion.div>
  )
}
