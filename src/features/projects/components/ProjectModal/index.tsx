import type { ProjectProps } from '@features/projects/data/projects'

import { ProjectImage } from '@features/projects/components/ProjectImage'
import { ProjectVideo } from '@features/projects/components/ProjectVideo'
import { SKILL_DEFINITIONS } from '@shared/constants/skills'
import { AnimatePresence, motion } from 'motion/react'

interface ProjectModalProps {
  onClose: () => void
  project: ProjectProps | null
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) {return null}

  return (
    <AnimatePresence>
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6'>
        {/* Backdrop */}
        <motion.div
          animate={{ opacity: 1 }}
          className='fixed inset-0 bg-black/70 backdrop-blur-md'
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className='relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-(--color-border) bg-(--color-bg-card) p-6 md:p-8 shadow-2xl backdrop-blur-xl scrollbar-thin text-(--color-text)'
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          {/* Close Button */}
          <button
            aria-label='Close project modal'
            className='absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-current/10 text-lg opacity-70 transition-opacity hover:opacity-100'
            onClick={onClose}
          >
            ✕
          </button>

          {/* Header & Category */}
          <div className='mb-4 flex items-center gap-3'>
            <span className='rounded-full bg-(--color-nav) border border-(--color-border) px-3 py-1 text-xs font-semibold tracking-wide text-(--color-text) uppercase'>
              {project.category}
            </span>
          </div>

          <h2 className='mb-4 text-3xl font-bold md:text-4xl'>
            {project.title}
          </h2>

          {/* Media Section */}
          <div className='mb-6 overflow-hidden rounded-2xl border border-(--color-border) bg-black/10 max-h-96 flex items-center justify-center'>
            {project.videoUrl ? (
              <ProjectVideo src={project.videoUrl} />
            ) : project.imageUrl ? (
              <ProjectImage
                alt={project.title}
                className={project.imageStyle}
                src={project.imageUrl}
              />
            ) : null}
          </div>

          {/* Detailed Description */}
          <div className='mb-6 text-lg leading-relaxed opacity-90'>
            <p>{project.description}</p>
            {project.additionalDescription && (
              <div className='mt-3 text-base text-(--color-accent)'>
                {project.additionalDescription}
              </div>
            )}
          </div>

          {/* Tech Stack */}
          <div className='mb-8'>
            <h3 className='mb-3 text-sm font-semibold text-(--color-text-muted) uppercase tracking-wider'>
              Technologies & Tools
            </h3>
            <div className='flex flex-wrap gap-2'>
              {project.technologies.map((tech) => {
                const name = SKILL_DEFINITIONS[tech]?.name ?? tech
                return (
                  <span
                    key={tech}
                    className='rounded-xl border border-(--color-border) bg-(--color-bg-elevated) px-3.5 py-1.5 font-mono text-sm text-(--color-text)'
                  >
                    #{name}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          {project.link && (
            <div className='flex items-center gap-4 border-t border-(--color-border) pt-6'>
              <a
                className='inline-flex items-center gap-2 rounded-xl bg-(--color-accent) px-6 py-3 font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-98'
                href={project.link}
                rel='noopener noreferrer'
                target='_blank'
              >
                <span>Launch / View Project</span>
                <span>↗</span>
              </a>
            </div>
          )}
        </motion.div>

      </div>
    </AnimatePresence>
  )
}
