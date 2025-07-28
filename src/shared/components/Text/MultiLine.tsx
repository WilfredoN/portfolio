import clsx from 'clsx'

import { Heading } from './Heading'

interface MultiLineProps {
  className?: string
  lines: string[]
  textStyles?: string
}
export const MultiLine = ({ lines, className, textStyles }: MultiLineProps) => {
  return (
    <div className={clsx('flex flex-col', className)}>
      {lines.map((line, index) => (
        <Heading key={index} as='h1' className={textStyles}>
          {line}
        </Heading>
      ))}
    </div>
  )
}
