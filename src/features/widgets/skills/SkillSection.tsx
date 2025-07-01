import { Section } from '@features/about/components/Section'
import {
  programmingLanguages,
  technologiesAndLibraries
} from '@features/about/data/languages'

export const SkillSection = () => {
  return (
    <div className='flex flex-col justify-center sm:flex-row mt-4 mb-8 w-full'>
      <Section title='Programming Languages' items={programmingLanguages} />
      <Section
        title='Technologies and Libraries'
        items={technologiesAndLibraries}
      />
    </div>
  )
}
