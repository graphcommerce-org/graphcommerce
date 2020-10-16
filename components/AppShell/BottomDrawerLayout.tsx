import { makeStyles, Paper, Theme, useTheme } from '@material-ui/core'
import PageLayout from 'components/Page/PageLayout'
import { PageLayoutFC, GetProps } from 'components/Page/types'
import Backdrop from 'components/PageTransition/Backdrop'
import keepAnimation from 'components/PageTransition/animation/keep'
import usePageTransition from 'components/PageTransition/usePageTransition'
import { UseStyles } from 'components/Styles'
import { m as motion, MotionProps } from 'framer-motion'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    backdrop: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: `blur(3px)`,
    },
    drawerContainer: {
      marginTop: 70,
      minHeight: 'calc(100vh - 70px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'stretch',
    },
    drawer: {
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderTopLeftRadius: theme.spacings.xs,
      borderTopRightRadius: theme.spacings.xs,
      boxShadow: theme.shadows[10],
      // zIndex: 3,
      width: '100%',
    },
  }),
  { name: 'LayoutDrawer' },
)

const BottomDrawerLayout: PageLayoutFC<UseStyles<typeof useStyles>> = (props) => {
  const { children, urlResolver, title } = props
  const classes = useStyles()
  const theme = useTheme()
  const { offsetDiv, inFront, prevPage, upPage } = usePageTransition({
    holdBackground: true,
    title,
  })

  const contentAnimation: MotionProps = {
    initial: { y: '100%' },
    animate: { y: 0, transition: { type: 'tween', ease: 'circOut' } },
    exit: { y: '100%', transition: { type: 'tween', ease: 'circIn' } },
  }

  return (
    <PageLayout urlResolver={urlResolver} themeColor={theme.palette.primary.main} title={title}>
      <Backdrop inFront={inFront} classes={{ backdrop: classes.backdrop }} />
      <motion.div {...offsetDiv}>
        <div className={classes.drawerContainer}>
          <motion.div className={classes.drawer} {...contentAnimation}>
            title: {title}
            <br />
            prevPage: {prevPage?.title}
            <br />
            upPage: {upPage?.title}
            <br />
            {children}
          </motion.div>
        </div>
      </motion.div>
    </PageLayout>
  )
}

export type LayoutDrawerProps = GetProps<typeof BottomDrawerLayout>

export default BottomDrawerLayout
