import { MotionProps } from 'framer-motion'

const keepAnimation: MotionProps = {
  initial: { opacity: 1 },
  animate: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 1, transition: { duration: 0 } },
}

export default keepAnimation
