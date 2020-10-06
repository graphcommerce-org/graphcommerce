import { makeStyles, Paper, Theme, useTheme } from '@material-ui/core'
import PageLayout from 'components/Page/PageLayout'
import { PageLayoutFC, GetProps } from 'components/Page/types'
import instantAnimation from 'components/PageTransition/animation/instant'
import useLayoutTransition from 'components/PageTransition/usePageTransition'
import { m as motion, MotionProps } from 'framer-motion'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    backdrop: {
      top: 0,
      left: 0,
      right: 0,
      position: 'absolute',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      WebkitTapHighlightColor: 'transparent',
      minHeight: '100vh',
      backdropFilter: `blur(3px)`,
    },
    drawer: {
      marginTop: 70,
      marginLeft: 70,
      marginRight: 70,
      background: theme.palette.background.paper,
    },
    drawerContent: {
      // minHeight: `calc(100vh - 70px)`,
    },
  }),
  { name: 'LayoutDrawer' },
)

const LayoutDrawer: PageLayoutFC<{ title: string }> = (props) => {
  const { children, urlResolver, title } = props
  const classes = useStyles()
  const theme = useTheme()
  const { phaseMode, offset } = useLayoutTransition('overlay')

  let backdropAnimation: MotionProps
  let contentAnimation: MotionProps
  switch (phaseMode) {
    case 'hold-deep':
      backdropAnimation = instantAnimation
      contentAnimation = instantAnimation
      break
    case 'enter-deep':
    case 'exit-deep':
      backdropAnimation = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { type: 'tween', ease: 'circOut' } },
        exit: { opacity: 0, transition: { type: 'tween', ease: 'circIn' } },
      }
      contentAnimation = {
        initial: { opacity: 0, y: '50%' },
        animate: { opacity: 1, y: 0, transition: { type: 'tween', ease: 'circOut' } },
        exit: { opacity: 0, y: '50%', transition: { type: 'tween', ease: 'circIn' } },
      }
      break
    case 'enter-shallow':
    case 'exit-shallow':
      backdropAnimation = instantAnimation
      contentAnimation = instantAnimation
  }

  return (
    <PageLayout urlResolver={urlResolver} themeColor={theme.palette.primary.main}>
      <motion.div data-phase={phaseMode} className={classes.backdrop} {...backdropAnimation}>
        <motion.div
          {...{
            initial: { y: offset },
            animate: { y: offset, transition: { duration: 0 } },
            exit: { y: offset, transition: { duration: 0 } },
          }}
        >
          <motion.div className={classes.drawer} {...contentAnimation}>
            <Paper elevation={12} className={classes.drawerContent}>
              {title}
              {children}
            </Paper>
          </motion.div>
        </motion.div>
      </motion.div>
    </PageLayout>
  )
}

export type LayoutDrawerProps = GetProps<typeof LayoutDrawer>

export default LayoutDrawer
