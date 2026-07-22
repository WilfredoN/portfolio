import { Section } from '@features/about/components/Section'
import {
  backendAndRealtime,
  databasesAndTools,
  frontendAndDesktop,
  programmingLanguages
} from '@features/about/data/languages'

export const SkillSection = () => {
  return (
    <div className='mt-6 mb-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2'>
      <Section items={programmingLanguages} title='Programming Languages' />
      <Section items={frontendAndDesktop} title='Frontend & Desktop' />
      <Section items={backendAndRealtime} title='Backend & Real-Time' />
      <Section items={databasesAndTools} title='Databases & Tools' />
    </div>
  )
}
