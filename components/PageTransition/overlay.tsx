import { PageTransitionPair } from './index'

const overlay: PageTransitionPair = {
  background: {
    initial: { scale: 0.95, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: 'tween', ease: 'circOut', when: 'beforeChildren' },
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: { type: 'tween', ease: 'easeIn', when: 'beforeChildren' },
    },
  },
  foreground: {
    initial: { y: 150, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: 'tween', ease: 'circOut', when: 'beforeChildren' },
    },
    exit: {
      y: 150,
      opacity: 0,
      transition: { type: 'tween', ease: 'easeIn', when: 'beforeChildren' },
    },
  },
}

export default overlay
