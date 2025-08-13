import type { IconProps } from './types'
import { toSize } from './utils'

export const LinkedInIcon = ({
  size = 32,
  className,
  title,
  ariaHidden = true
}: IconProps) => (
  <svg
    viewBox='0 0 24 24'
    width={toSize(size)}
    height={toSize(size)}
    fill='currentColor'
    aria-hidden={ariaHidden}
    className={className}
  >
    {title ? <title>{title}</title> : null}
    <path d='M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.2 2.3-2.46 4.73-2.46C21.6 7.74 24 10 24 14.3V24h-5v-8.4c0-2-0.04-4.6-2.8-4.6-2.8 0-3.2 2.2-3.2 4.5V24H8z' />
  </svg>
)
