import { makeStyles, Theme, Unstable_TrapFocus as TrapFocus, Typography } from '@material-ui/core'
import Backdrop from 'components/AppShell/Backdrop'
import Link from 'components/Link'
import usePageTransition from 'components/PageTransition/usePageTransition'
import { UseStyles } from 'components/Styles'
import { m as motion, MotionProps } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { KeyboardEventHandler, PropsWithChildren, useEffect, useState } from 'react'
import BackButton from './BackButton'

const useStyles = makeStyles(
  (theme: Theme) => ({
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(6px)',
    },
    drawerContainer: {
      paddingTop: 70,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'stretch',
    },
    drawer: {
      zIndex: 2,
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderTopLeftRadius: theme.spacings.sm,
      borderTopRightRadius: theme.spacings.sm,
      boxShadow: theme.shadows[10],
      // zIndex: 3,
      width: '100%',
      position: 'relative',
      '&:focus': { outline: 'none' },
      padding: theme.spacings.sm,
      paddingBottom: 0,
      '&> *': {
        marginBottom: theme.spacings.sm,
      },
    },
    header: {
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      display: 'grid',
      // margin: `0 ${theme.spacings.sm}`,
      alignItems: 'center',
      gridTemplateColumns: `1fr auto 1fr`,
      pointerEvents: 'none',
    },
    headerBack: {
      pointerEvents: 'all',
      width: 'min-content',
    },
    headerForward: {
      width: 'min-content',
    },
    headerTitle: {
      pointerEvents: 'all',
      textAlign: 'center',
    },
  }),
  { name: 'LayoutDrawer' },
)

export type BottomDrawerUiProps = UseStyles<typeof useStyles> & { title: string }

const BottomDrawerUi = (props: PropsWithChildren<BottomDrawerUiProps>) => {
  const { children, title } = props
  const classes = useStyles()
  const router = useRouter()
  const {
    offsetDiv,
    inFront,
    inBack,
    prevPage,
    upPage,
    isFromPage,
    isShallow,
  } = usePageTransition({ holdBackground: true, title })

  const [focus, setFocus] = useState(false)
  useEffect(() => {
    if (inFront) setTimeout(() => setFocus(true), 400)
    else setFocus(false)
  }, [inFront])

  const contentAnimation: MotionProps = {
    initial: { y: 300, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'tween', ease: 'anticipate' } },
    exit: { y: 300, opacity: 0, transition: { type: 'tween', ease: 'anticipate' } },
  }

  const navigateBack = () => {
    if (inFront) router.back()
  }

  const onPressEscape: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (inBack || event.key !== 'Escape') return
    event.preventDefault()
    router.back()
  }

  return (
    <>
      <Backdrop
        inFront={inFront}
        classes={{ backdrop: classes.backdrop }}
        onClick={navigateBack}
        role='none'
        instant={isShallow}
        zOffset={1}
      />
      <motion.div {...offsetDiv}>
        <div className={classes.drawerContainer} onKeyDown={onPressEscape} role='presentation'>
          {/* <TrapFocus open={focus} getDoc={() => document} isEnabled={() => inFront}> */}
          <motion.section
            className={classes.drawer}
            {...contentAnimation}
            tabIndex={-1}
            style={{ pointerEvents: inFront ? 'all' : 'none' }}
          >
            <div className={classes.header}>
              {prevPage?.title ? (
                <BackButton
                  onClick={navigateBack}
                  disabled={isFromPage}
                  down={prevPage === upPage}
                  className={classes.headerBack}
                >
                  {prevPage.title}
                </BackButton>
              ) : (
                <Link href='/' replace>
                  <BackButton className={classes.headerBack}>Home</BackButton>
                </Link>
              )}
              <Typography variant='h4' component='h2' className={classes.headerTitle}>
                {title}
              </Typography>
              <div className={classes.headerForward} />
            </div>
            {children}
          </motion.section>
          {/* </TrapFocus> */}
        </div>
      </motion.div>
    </>
  )
}

export default BottomDrawerUi
