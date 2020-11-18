import { m as motion, MotionProps } from 'framer-motion'
import { UiFC } from '../PageTransition/types'
import usePageTransition from '../PageTransition/usePageTransition'

export type FullPageUiProps = unknown

const FullPageUi: UiFC<FullPageUiProps> = (props) => {
  const { children, title } = props
  const pageTransition = usePageTransition({ title })
  const { offsetDiv, inFront, hold } = pageTransition

  const contentAnimation: MotionProps = !hold
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0 } },
        exit: { opacity: 0, transition: { duration: 0 } },
      }
    : {
        initial: { opacity: 1 },
        animate: { opacity: 1, transition: { type: 'tween', ease: 'easeOut' } },
        exit: { opacity: 1, transition: { type: 'tween', ease: 'easeIn' } },
      }

  return (
    <>
      <motion.div {...offsetDiv}>
        <motion.div style={{ pointerEvents: inFront ? 'all' : 'none' }} {...contentAnimation}>
          {children}
        </motion.div>
      </motion.div>
    </>
  )
}
FullPageUi.holdBackground = false

export default FullPageUi
