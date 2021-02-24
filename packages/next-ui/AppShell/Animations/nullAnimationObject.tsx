import { MotionProps } from 'framer-motion'

const nullAnimationObject = (z: number): MotionProps => ({
  initial: {
    opacity: 1,
    z,
    y: 0,
    x: 0,
  },
  animate: {
    //
  },
  exit: {
    //
  },
})

export default nullAnimationObject
