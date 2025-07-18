import { Section } from '@features/about/components/Section'
import {
  programmingLanguages,
  technologiesAndLibraries
} from '@features/about/data/languages'

export const SkillSection = () => {
  return (
    <div className='mb-8 mt-4 flex w-full flex-col justify-center sm:flex-row'>
      <Section items={programmingLanguages} title='Programming Languages' />
      <Section
        items={technologiesAndLibraries}
        title='Technologies and Libraries'
      />
    </div>
  )
}
