import type { Category } from '@features/projects/data/projects'

import { FilterPanel } from '@features/projects/components/FilterPanel'
import { ProjectList } from '@features/projects/components/ProjectList'
import { projects } from '@features/projects/data/projects'
import { Text } from '@shared/components/Text'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'

export const Projects = () => {
  const [activeCategories, setActiveCategories] = useState<Category[]>([
    'web-app',
    'game'
  ])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredByCategory = useMemo(() => {
    return projects.filter((project) =>
      activeCategories.includes(project.category)
    )
  }, [activeCategories])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    filteredByCategory.forEach((p) => {
      p.technologies.forEach((tech) => tags.add(tech))
    })
    return Array.from(tags).sort()
  }, [filteredByCategory])

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleResetFilters = () => {
    setActiveCategories(['web-app', 'game'])
    setSelectedTags([])
  }

  const handleCategoryChange = (category: Category) => {
    const nextCategories = activeCategories.includes(category)
      ? activeCategories.filter((c) => c !== category)
      : [...activeCategories, category]

    setActiveCategories(nextCategories)

    const nextFilteredProjects = projects.filter((project) =>
      nextCategories.includes(project.category)
    )
    const validTags = new Set<string>()
    nextFilteredProjects.forEach((p) => {
      p.technologies.forEach((tech) => validTags.add(tech))
    })

    setSelectedTags((prev) => prev.filter((tag) => validTags.has(tag)))
  }

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) {
      return filteredByCategory
    }
    return filteredByCategory.filter((project) =>
      project.technologies.some((tech) => selectedTags.includes(tech))
    )
  }, [filteredByCategory, selectedTags])

  return (
    <motion.article
      animate='final'
      className='mt-8 flex w-full max-w-5xl flex-col items-center justify-start gap-8 p-4 text-left'
      initial='initial'
    >
      <FilterPanel
        activeCategories={activeCategories}
        allTags={allTags}
        projectCount={filteredProjects.length}
        selectedTags={selectedTags}
        onCategoryChange={handleCategoryChange}
        onResetFilters={handleResetFilters}
        onToggleTag={handleToggleTag}
      />
      <ProjectList projects={filteredProjects} selectedTags={selectedTags} />
      {filteredProjects.length > 0 && (
        <Text className='mt-8 text-center text-4xl font-bold'>
          More projects coming soon...
        </Text>
      )}
    </motion.article>
  )
}
