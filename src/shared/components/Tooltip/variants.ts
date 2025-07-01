import type { Variants } from 'framer-motion'

export const tooltipVariant: Variants = {
  initial: { opacity: 0, x: -10, scale: 0.9 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 25 }
  },
  exit: {
    opacity: 0,
    x: -10,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
}
