export const prevPageVariant = {
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
export const nextPageVariant = {
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
