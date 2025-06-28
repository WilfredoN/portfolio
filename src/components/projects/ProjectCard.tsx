import { motion } from 'motion/react'

import type { ProjectInfo } from '../../data/projects'

import { TechnologyStack } from './TechnologyStack'

export const ProjectCard = ({
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
}: ProjectInfo) => {
  const isLarge = scale === 'large'

  return (
    <motion.div
      className={`flex flex-col justify-between mb-12 w-full ${
        scale == 'medium'
          ? 'md:h-[30.625rem] hover:scale-105 transition-transform duration-100 '
          : 'h-[34rem]'
      }${isLarge ? 'max-w-full' : 'max-w-[31.25rem]'} border-3 rounded-lg p-4`}
    >
      <motion.h1
        className="text-4xl text-center flex items-center flex-col"
        initial="initial"
        animate="final"
      >
        {imageUrl
          ? (
              <motion.img
                src={imageUrl}
                alt={title}
                title={imageTitle}
                className={imageStyle || 'px-4 py-2 rounded-md my-2'}
              />
            )
          : videoUrl
            ? (
                <motion.video
                  src={videoUrl}
                  controls
                  loop
                  autoPlay={false}
                  muted
                  className="px-4 py-2 rounded-md my-2"
                />
              )
            : (
                <span className="my-6 font-['Courgette'] text-[4rem] text-[#5287AD]">
                  <a href={link}>{title}</a>
                </span>
              )}
        {isLarge && (
          <TechnologyStack
            technologies={technologies}
            size={scale}
          />
        )}

        <div className="text-[1.7rem] mt-4">
          <p>{description}</p>
          {additionalDescription && (
            <div className="mt-2">{additionalDescription}</div>
          )}
        </div>
      </motion.h1>

      <div className="self-center justify-self-end ">
        {!isLarge && (
          <>
            <h3 className="text-3xl text-center mb-2">Technologies used:</h3>
            <TechnologyStack technologies={technologies} />
          </>
        )}
      </div>
    </motion.div>
  )
}
