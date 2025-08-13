import type { IconProps } from './types'

import { toSize } from './utils'

export const GmailIcon = ({
  size = 32,
  className,
  title,
  ariaHidden = true
}: IconProps) => (
  <svg
    aria-hidden={ariaHidden}
    className={className}
    fill='currentColor'
    height={toSize(size)}
    viewBox='0 0 32 32'
    width={toSize(size)}
    xmlns='http://www.w3.org/2000/svg'
  >
    {title ? <title>{title}</title> : null}
    <path d='M30.996 7.824v17.381c0 0 0 0 0 0.001 0 1.129-0.915 2.044-2.044 2.044-0 0-0 0-0.001 0h-4.772v-11.587l-8.179 6.136-8.179-6.136v11.588h-4.772c0 0 0 0-0 0-1.129 0-2.044-0.915-2.044-2.044 0-0 0-0.001 0-0.001v0-17.381c0-0 0-0.001 0-0.001 0-1.694 1.373-3.067 3.067-3.067 0.694 0 1.334 0.231 1.848 0.619l-0.008-0.006 10.088 7.567 10.088-7.567c0.506-0.383 1.146-0.613 1.84-0.613 1.694 0 3.067 1.373 3.067 3.067v0z' />
  </svg>
)
