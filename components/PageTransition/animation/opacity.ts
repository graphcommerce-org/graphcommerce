import { MotionProps } from 'framer-motion'

const opacityAnimation: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { type: 'tween' } },
  exit: { opacity: 0, transition: { type: 'tween' } },
}

export default opacityAnimation
