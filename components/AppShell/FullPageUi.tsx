import { makeStyles, Theme } from '@material-ui/core'
import usePageTransition from 'components/PageTransition/usePageTransition'
import { m as motion, MotionProps } from 'framer-motion'
import { PropsWithChildren } from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    content: {
      marginTop: `calc(${theme.page.headerInnerHeight.xs} + ${theme.page.vertical})`,
      [theme.breakpoints.up('md')]: {
        marginTop: `calc(${theme.page.headerInnerHeight.sm} + ${theme.page.vertical} * 2)`,
      },
    },
  }),
  { name: 'LayoutHeader' },
)

export type FullPageUiProps = { title: string }

const FullPageUi = (props: PropsWithChildren<FullPageUiProps>) => {
  const { children, title } = props
  const classes = useStyles(props)
  const { offsetDiv, inFront, isShallow } = usePageTransition({ title })

  const contentAnimation: MotionProps = isShallow
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { type: 'tween', ease: 'anticipate' } },
        exit: { opacity: 0, transition: { type: 'tween', ease: 'anticipate' } },
      }
    : {
        initial: { opacity: 1 },
        animate: { opacity: 1, transition: { duration: 0 } },
        exit: { opacity: 1, transition: { duration: 0 } },
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

export default FullPageUi
