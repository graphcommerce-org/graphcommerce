import { MotionProps } from 'framer-motion'

const instantAnimation: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0 } },
}

export default instantAnimation
