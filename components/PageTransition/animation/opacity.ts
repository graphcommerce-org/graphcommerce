import { MotionProps } from 'framer-motion'

const opacityAnimation: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { type: 'tween', ease: 'circOut' } },
  exit: { opacity: 0, transition: { type: 'tween', ease: 'circOut' } },
}

export default opacityAnimation
