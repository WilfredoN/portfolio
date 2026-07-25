import type { SkillItem } from '@features/about/data/languages'
import type { JSX } from 'react'

import { useTheme } from '@app/hooks/useTheme'
import { List } from '@features/about/components/List'
import clsx from 'clsx'

interface SectionProps {
  items: SkillItem[]
  title: string | JSX.Element
}

export const Section = ({ title, items }: SectionProps) => {
  const { isDarkTheme } = useTheme()

  return (
    <section
      className={clsx(
        'flex w-full flex-col rounded-lg border transition-colors duration-200',
        isDarkTheme
          ? 'border-zinc-700/50 bg-zinc-900/40 text-white'
          : 'border-blue-200/80 bg-white/70 text-zinc-900 shadow-sm'
      )}
    >
      <h2
        className={clsx(
          'border-b p-4 text-center text-2xl font-semibold sm:text-3xl',
          isDarkTheme
            ? 'border-zinc-700/50 text-white'
            : 'border-blue-200/80 text-zinc-900'
        )}
      >
        {title}
      </h2>
      <div className='w-full'>
        <List items={items} />
      </div>
    </section>
  )
}
