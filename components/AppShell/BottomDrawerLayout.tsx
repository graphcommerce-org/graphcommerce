import { makeStyles, Theme, useTheme, Unstable_TrapFocus as TrapFocus } from '@material-ui/core'
import Link from 'components/Link'
import PageLayout from 'components/Page/PageLayout'
import { PageLayoutFC, GetProps } from 'components/Page/types'
import Backdrop from 'components/PageTransition/Backdrop'
import usePageTransition from 'components/PageTransition/usePageTransition'
import { UseStyles } from 'components/Styles'
import { m as motion, MotionProps } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { KeyboardEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import BackButton from './BackButton'

const useStyles = makeStyles(
  (theme: Theme) => ({
    backdrop: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: `blur(3px)`,
    },
    drawerContainer: {
      paddingTop: 70,
      minHeight: '100vh',
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
      position: 'relative',
      '&:focus': { outline: 'none' },
    },
    drawerHeader: {
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
    },
  }),
  { name: 'LayoutDrawer' },
)

const BottomDrawerLayout: PageLayoutFC<UseStyles<typeof useStyles>> = (props) => {
  const { children, urlResolver, title } = props
  const classes = useStyles()
  const router = useRouter()
  const theme = useTheme()
  const { offsetDiv, inFront, inBack, prevPage, upPage } = usePageTransition({
    holdBackground: true,
    title,
  })
  const [focus, setFocus] = useState(false)
  useEffect(() => {
    if (inFront) setTimeout(() => setFocus(true), 10)
    else setFocus(false)
  }, [inFront])

  const contentAnimation: MotionProps = {
    initial: { y: '100%' },
    animate: { y: 0, transition: { type: 'tween', ease: 'circOut' } },
    exit: { y: '100%', transition: { type: 'tween', ease: 'circIn' } },
  }

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target !== event.currentTarget) return
    router.back()
  }

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (inBack || event.key !== 'Escape') return
    router.back()
  }

  return (
    <PageLayout urlResolver={urlResolver} themeColor={theme.palette.primary.main} title={title}>
      <Backdrop inFront={inFront} classes={{ backdrop: classes.backdrop }} />
      <motion.div {...offsetDiv}>
        <div
          className={classes.drawerContainer}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role='none'
        >
          <TrapFocus open={focus} getDoc={() => document} isEnabled={() => focus}>
            <motion.div className={classes.drawer} {...contentAnimation} tabIndex={-1}>
              <div className={classes.drawerHeader}>
                {prevPage?.title ? (
                  <BackButton>{prevPage.title}</BackButton>
                ) : (
                  <Link href='/' replace>
                    <BackButton>Home</BackButton>
                  </Link>
                )}
                title: {title}
                <br />
                upPage: {upPage?.title}
                <br />
              </div>
              {children}
            </motion.div>
          </TrapFocus>
        </div>
      </motion.div>
    </PageLayout>
  )
}

export type BottomDrawerLayoutProps = GetProps<typeof BottomDrawerLayout>

export default BottomDrawerLayout
