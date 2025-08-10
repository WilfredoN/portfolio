import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react'

type HeadingProps<T extends ElementType> = {
  as?: T
  children: ReactNode
} & ComponentPropsWithRef<T>

export const Heading = <T extends ElementType = 'h1'>({
  as,
  children,
  ...props
}: HeadingProps<T>) => {
  const Component = as || 'h1'

  return <Component {...props}>{children}</Component>
}
