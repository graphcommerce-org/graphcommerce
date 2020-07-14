import { Variant } from 'framer-motion'

export const entryTime = 0.25
export const exitTime = 0.2

// slideUpFade + scale background down + scale foreground up.

/**
 * Page transitions need to handle scroll position:
 * - Transition at the same scroll position
 * - Reset scroll position after navigation
 */

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
      duration: entryTime,
      delay: entryTime,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: exitTime,
    },
  },
}
