import { makeStyles, Theme } from '@material-ui/core'
import { m as motion, MotionProps } from 'framer-motion'
import { UiFC } from '../PageTransition/types'
import usePageTransition from '../PageTransition/usePageTransition'

const useStyles = makeStyles(
  (theme: Theme) => ({
    content: {
      marginTop: `calc(${theme.page.headerInnerHeight.xs} + ${theme.page.vertical})`,
      [theme.breakpoints.up('md')]: {
        marginTop: `calc(${theme.page.headerInnerHeight.sm} + ${theme.page.vertical} * 2)`,
      },
    },
  }),
  { name: 'FullPageUi' },
)

export type FullPageUiProps = unknown

const FullPageUi: UiFC<FullPageUiProps> = (props) => {
  const { children, title } = props
  const classes = useStyles(props)
  const pageTransition = usePageTransition({ title })
  const { offsetDiv, inFront, hold, backLevel } = pageTransition

  const z = backLevel * -30
  const contentAnimation: MotionProps = !hold
    ? {
        initial: { opacity: 0, z },
        animate: { opacity: 1, z, transition: { duration: 0 } },
        exit: { opacity: 0, z, transition: { duration: 0 } },
      }
    : {
        initial: { opacity: 1, z },
        animate: { opacity: 1, z, transition: { type: 'tween', ease: 'easeOut' } },
        exit: { opacity: 1, z, transition: { type: 'tween', ease: 'easeIn' } },
      }

  return (
    <>
      <motion.div {...offsetDiv}>
        <motion.div
          className={classes.content}
          style={{ pointerEvents: inFront ? 'all' : 'none' }}
          {...contentAnimation}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  )
}
FullPageUi.holdBackground = false

export default FullPageUi
