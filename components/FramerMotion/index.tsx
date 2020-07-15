import { TargetAndTransition, MotionProps, Transition } from 'framer-motion'

export const entryTime = 0.25
export const exitTime = 0.2

export type PageTransitionPair = {
  background: MotionProps
  foreground: MotionProps
}

// const transition: Transition = { type: 'tween', duration: 20 }
const transition: Transition = { type: 'spring', damping: 20, stiffness: 300 }

export const overlay: PageTransitionPair = {
  background: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition },
    exit: { scale: 0.95, opacity: 0, transition },
  },
  foreground: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1, transition },
    exit: { y: '100%', opacity: 0, transition },
  },
}

export const motionProps = (toPage: MotionProps | undefined): MotionProps => {
  return {
    ...(toPage || {}),
    exit: (fromPage: MotionProps | undefined): TargetAndTransition => {
      return (fromPage?.exit as TargetAndTransition) || {}
    },
  }
}
