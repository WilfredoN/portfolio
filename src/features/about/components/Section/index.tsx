import type { SkillItem } from '@features/about/data/languages'
import type { JSX } from 'react'

import { List } from '@features/about/components/List'

interface SectionProps {
  items: SkillItem[]
  title: string | JSX.Element
}

export const Section = ({ title, items }: SectionProps) => {
  return (
    <section className='flex w-full flex-col rounded-lg border border-zinc-700/50 bg-zinc-900/20'>
      <h2 className='border-b border-zinc-700/50 p-4 text-center text-2xl font-semibold sm:text-3xl'>
        {title}
      </h2>
      <div className='w-full'>
        <List items={items} />
      </div>
    </section>
  )
}
