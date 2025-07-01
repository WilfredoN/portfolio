import { Text } from '@shared/components/Text/Text'
import clsx from 'clsx'

interface MultiLineProps {
  lines: string[]
  textStyles?: string
  className?: string
}
export const MultiLine = ({ lines, className, textStyles }: MultiLineProps) => {
  return (
    <div className={clsx('flex flex-col', className)}>
      {lines.map((line, index) => (
        <Text key={index} className={textStyles}>
          {line}
        </Text>
      ))}
    </div>
  )
}
