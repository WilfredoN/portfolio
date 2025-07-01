import { Section } from '@features/about/components/Section'
import {
  programmingLanguages,
  technologiesAndLibraries
} from '@features/about/data/languages'

export const SkillSection = () => {
  return (
    <div className='flex flex-col justify-center sm:flex-row mt-4 mb-8 w-full'>
      <Section items={programmingLanguages} title='Programming Languages' />
      <Section
        items={technologiesAndLibraries}
        title='Technologies and Libraries'
      />
    </div>
  )
}
