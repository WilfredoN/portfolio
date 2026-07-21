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

  const handleClearFilters = () => {
    setSelectedTags([])
  }

  const handleCategoryChange = (category: Category) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
    setSelectedTags([])
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
      className='mt-8 flex w-full max-w-screen-2xl flex-col items-center justify-center gap-8 p-4 text-left'
      initial='initial'
    >
      <FilterPanel
        activeCategories={activeCategories}
        allTags={allTags}
        projectCount={filteredProjects.length}
        selectedTags={selectedTags}
        onCategoryChange={handleCategoryChange}
        onClearFilters={handleClearFilters}
        onToggleTag={handleToggleTag}
      />
      <ProjectList projects={filteredProjects} selectedTags={selectedTags} />
      <Text className='mt-8 text-center text-4xl font-bold'>
        More projects coming soon...
      </Text>
    </motion.article>
  )
}
