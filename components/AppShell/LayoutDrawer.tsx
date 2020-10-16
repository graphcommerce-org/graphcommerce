import { makeStyles, Paper, Theme, useTheme } from '@material-ui/core'
import PageLayout from 'components/Page/PageLayout'
import { PageLayoutFC, GetProps } from 'components/Page/types'
import Backdrop from 'components/PageTransition/Backdrop'
import keepAnimation from 'components/PageTransition/animation/keep'
import usePageTransition from 'components/PageTransition/usePageTransition'
import { m as motion, MotionProps } from 'framer-motion'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    backdrop: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: `blur(3px)`,
    },
    drawer: {
      marginTop: 70,
      marginLeft: 70,
      marginRight: 70,
      background: theme.palette.background.paper,
      zIndex: 3,
    },
    drawerContent: {
      // minHeight: `calc(100vh - 70px)`,
    },
  }),
  { name: 'LayoutDrawer' },
)

const LayoutDrawer: PageLayoutFC = (props) => {
  const { children, urlResolver, title } = props
  const classes = useStyles()
  const theme = useTheme()
  const { offsetDiv, inFront } = usePageTransition({ holdBackground: true, title })

  const contentAnimation: MotionProps = {
    initial: { y: '100%' },
    animate: { y: 0, transition: { type: 'tween', ease: 'circOut' } },
    exit: { y: '100%', transition: { type: 'tween', ease: 'circIn' } },
  }

  return (
    <PageLayout urlResolver={urlResolver} themeColor={theme.palette.primary.main} title={title}>
      <Backdrop inFront={inFront} classes={{ backdrop: classes.backdrop }} />
      <motion.div {...offsetDiv}>
        <motion.div className={classes.drawer} {...contentAnimation}>
          <Paper elevation={12} className={classes.drawerContent}>
            {title}
            {children}
          </Paper>
        </motion.div>
      </motion.div>
    </PageLayout>
  )
}

export type LayoutDrawerProps = GetProps<typeof LayoutDrawer>

export default LayoutDrawer
