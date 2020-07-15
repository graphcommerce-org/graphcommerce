import { TargetAndTransition } from 'framer-motion'

export const entryTime = 0.25
export const exitTime = 0.2

export type PageTransition = {
  initial: TargetAndTransition
  enter: TargetAndTransition
  exit: TargetAndTransition
}

export type PageTransitionPair = {
  background: PageTransition
  foreground: PageTransition
}

const spring = { type: 'spring', damping: 20, stiffness: 300 }

export const overlay: PageTransitionPair = {
  background: {
    initial: { scale: 0.95, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition: { duration: exitTime, ...spring } },
    exit: { scale: 0.95, opacity: 0, transition: { duration: entryTime } },
  },
  foreground: {
    initial: { y: '100%', opacity: 0 },
    enter: { y: 0, opacity: 1, transition: { duration: entryTime, ...spring } },
    exit: { y: '100%', opacity: 0, transition: { duration: exitTime } },
  },
}

export const addExitHandler = (toPage: PageTransition | undefined) => {
  return {
    ...(toPage || {}),
    exit: (fromPage: PageTransition | undefined): TargetAndTransition => {
      return fromPage?.exit || {}
    },
  }
}
