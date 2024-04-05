export const aboutVariant = {
  initial: {
    x: '-100vw',
  },
  final: {
    x: '0vw',
    transition: {
      type: 'spring',
      mass: 0.2,
    },
  },
};
export const projectsVariant = {
  initial: {
    x: '100vw',
    y: '0vh',
  },
  final: {
    x: '0vw',
    y: '0vh',
    transition: {
      type: 'spring',
      mass: 0.2,
    },
  },
};
