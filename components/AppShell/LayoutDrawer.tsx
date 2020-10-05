import { makeStyles, Theme, useTheme } from '@material-ui/core'
import PageLayout from 'components/Page/PageLayout'
import { PageLayoutFC, GetProps } from 'components/Page/types'
import instantAnimation from 'components/PageTransition/animation/instant'
import keepAnimation from 'components/PageTransition/animation/keep'
import useLayoutTransition from 'components/PageTransition/usePageTransition'
import { m as motion, MotionProps } from 'framer-motion'

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    WebkitTapHighlightColor: 'transparent',
  },
  drawer: {
    top: 70,
    left: 20,
    right: 20,
    bottom: 70,
    position: 'absolute',
    background: theme.palette.background.paper,
    borderRadius: 16,
  },
}))

const LayoutDrawer: PageLayoutFC<{ title: string }> = (props) => {
  const { children, urlResolver, title } = props
  const classes = useStyles()
  const theme = useTheme()
  const phaseMode = useLayoutTransition('overlay')

  let backdropAnimation: MotionProps
  let contentAnimation: MotionProps
  switch (phaseMode) {
    case 'hold-deep':
    case 'hold-shallow':
      backdropAnimation = instantAnimation
      contentAnimation = instantAnimation
      break
    case 'enter-deep':
    case 'exit-deep':
      backdropAnimation = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { type: 'tween', ease: 'easeOut' } },
        exit: { opacity: 0, transition: { type: 'tween', ease: 'easeIn' } },
      }
      contentAnimation = {
        initial: { opacity: 0, y: '100%' },
        animate: { opacity: 1, y: 0, transition: { type: 'tween', ease: 'easeOut' } },
        exit: { opacity: 0, y: '100%', transition: { type: 'tween', ease: 'easeIn' } },
      }
      break
    case 'enter-shallow':
    case 'exit-shallow':
      backdropAnimation = instantAnimation
      contentAnimation = instantAnimation
  }

  return (
    <PageLayout urlResolver={urlResolver} themeColor={theme.palette.primary.main}>
      <motion.div className={classes.backdrop} {...backdropAnimation} />
      <motion.div className={classes.drawer} {...contentAnimation}>
        {title}
        {children}
      </motion.div>
    </PageLayout>
  )
}

export type LayoutDrawerProps = GetProps<typeof LayoutDrawer>

export default LayoutDrawer
