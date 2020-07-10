import { Variant } from 'framer-motion'

// slideUpFade + scale background down + scale foreground up.

export type PageTransition = {
  initial: Variant
  enter: Variant
  exit: Variant
}

export const slideUpFade: PageTransition = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
}
