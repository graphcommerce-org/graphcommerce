import { makeStyles, Paper, Theme, useTheme } from '@material-ui/core'
import PageLayout from 'components/Page/PageLayout'
import { PageLayoutFC, GetProps } from 'components/Page/types'
import keepAnimation from 'components/PageTransition/animation/keep'
import { untillPhase } from 'components/PageTransition/historyHelpers'
import usePageTransition from 'components/PageTransition/usePageTransition'
import { m as motion, MotionProps } from 'framer-motion'
import { HistoryStateDocument } from 'generated/documents'
import React, { CSSProperties } from 'react'

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
  const { offsetDiv, state } = usePageTransition('overlay')

  const backdropAnimation = keepAnimation
  // const backdropAnimation: MotionProps = {
  //   initial: { opacity: 0 },
  //   animate: { opacity: 1, transition: { type: 'tween', ease: 'circOut' } },
  //   exit: { opacity: 0, transition: { type: 'tween', ease: 'circIn' } },
  // }
  const contentAnimation = keepAnimation
  // const contentAnimation: MotionProps = {
  //   initial: { opacity: 0, y: '50%' },
  //   animate: { opacity: 1, y: 0, transition: { type: 'tween', ease: 'circOut' } },
  //   exit: { opacity: 0, y: '50%', transition: { type: 'tween', ease: 'circIn' } },
  // }
  // switch (phaseMode) {
  //   case 'hold-deep':
  //   case 'hold-shallow':
  //     backdropAnimation = instantAnimation
  //     contentAnimation = instantAnimation
  //     break
  //   case 'enter-deep':
  //   case 'exit-deep':
  //     backdropAnimation =
  //     contentAnimation =
  //     break
  //   case 'enter-shallow':
  //   case 'exit-shallow':
  //     backdropAnimation = instantAnimation
  //     contentAnimation = instantAnimation
  // }

  return (
    <PageLayout urlResolver={urlResolver} themeColor={theme.palette.primary.main}>
      <motion.div {...offsetDiv}>
        <motion.div className={classes.backdrop} {...backdropAnimation}>
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
