import type { Variants } from 'motion'

export const PAGE_TRANSITION_SPEED = {
  ENTER_DURATION: 0.35,
  EXIT_DURATION: 0.25,
  INITIAL_DURATION: 0.2
} as const

export const variants: Variants = {
  initial: {
    filter: 'blur(8px) grayscale(60%)',
    opacity: 0,
    rotate: Math.random() * 10 - 8,
    scale: 0.96,
    transition: {
      duration: PAGE_TRANSITION_SPEED.INITIAL_DURATION,
      ease: 'easeInOut'
    }
  },
  final: {
    filter: 'blur(0px) grayscale(0%)',
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: PAGE_TRANSITION_SPEED.ENTER_DURATION,
      ease: 'easeInOut'
    }
  },
  exit: {
    filter: 'blur(12px) grayscale(80%)',
    opacity: 0,
    rotate: Math.random() * 10 - 8,
    scale: 1.04,
    transition: {
      duration: PAGE_TRANSITION_SPEED.EXIT_DURATION,
      ease: 'easeInOut'
    }
  }
}
