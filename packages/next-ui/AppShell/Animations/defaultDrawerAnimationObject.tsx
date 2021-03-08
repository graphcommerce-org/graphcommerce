import { MotionProps } from 'framer-motion'

const defaultDrawerAnimationObject = (z: number, dismissed: boolean): MotionProps => ({
  initial: {
    y: '90%',
    z,
    x: 0,
    opacity: 0,
    originY: 0,
  },
  animate: {
    y: '0',
    z,
    x: 0,
    opacity: 1,
    display: 'block',
    transition: { type: 'tween', ease: 'easeOut' },
    ...(dismissed && {
      y: '90%',
      opacity: 0,
      transition: { type: 'tween', ease: 'easeIn' },
      transitionEnd: { display: 'none' },
    }),
  },
})

export default defaultDrawerAnimationObject
