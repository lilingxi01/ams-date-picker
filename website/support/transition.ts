export const DefinedTransition = {
  cubic: (part: string = 'all', duration: number = 0.6) => {
    return `${part} ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`;
  },
  quickCubic: (part: string = 'all') => {
    return DefinedTransition.cubic(part, 0.38);
  },
  damp: (part: string = 'all', duration: number = 0.5) => {
    return `${part} ${duration}s cubic-bezier(0.7, 0, 0, 1)`;
  },
};
