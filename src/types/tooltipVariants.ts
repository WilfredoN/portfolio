export const tooltipVariants = {
  right: {
    initial: { opacity: 0, x: -10, scale: 0.9 },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: {
      opacity: 0,
      x: -10,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  },
  left: {
    initial: { opacity: 0, x: 10, scale: 0.9 },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: {
      opacity: 0,
      x: 10,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  }
}
