import type { Variants } from 'motion'

export const variants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.96,
    filter: 'blur(8px) grayscale(60%)',
    rotate: Math.random() * 10 - 8,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  },
  final: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px) grayscale(0%)',
    rotate: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut'
    }
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    filter: 'blur(12px) grayscale(80%)',
    rotate: Math.random() * 10 - 8,
    transition: {
      duration: 0.4,
      ease: 'easeInOut'
    }
  }
}
