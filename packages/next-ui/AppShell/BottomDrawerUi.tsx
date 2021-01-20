import { makeStyles, Theme, Typography, TypographyProps, NoSsr } from '@material-ui/core'
import clsx from 'clsx'
import { m, MotionProps, useTransform, useViewportScroll } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { KeyboardEventHandler, useEffect, useState } from 'react'
import FocusLock from 'react-focus-lock'
import PageLink from '../PageTransition/PageLink'
import { UiFC } from '../PageTransition/types'
import usePageTransition from '../PageTransition/usePageTransition'
import { UseStyles } from '../Styles'
import BackButton from './BackButton'
import Backdrop from './Backdrop'

const useStyles = makeStyles(
  (theme: Theme) => ({
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    drawerContainer: {
      paddingTop: 50,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'stretch',
      perspective: '500px',
      perspectiveOrigin: 'center -250px',
    },
    drawer: {
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderTopLeftRadius: theme.spacings.xxs,
      borderTopRightRadius: theme.spacings.xxs,
      boxShadow: theme.shadows[10],
      width: '100%',
      '&:focus': { outline: 'none' },
      paddingBottom: 0,
      '&> *': {
        marginBottom: theme.spacings.sm,
      },
    },
    drawerFullHeight: {
      minHeight: `calc(100vh - 50px)`,
    },
    header: {
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      display: 'grid',
      padding: `0 ${theme.spacings.sm}`,
      marginBottom: theme.spacings.sm,
      alignItems: 'center',
      gridTemplate: `
        ". handle ." ${theme.spacings.sm}
        "back title forward" auto / 1fr auto 1fr
      `,
      pointerEvents: 'none',
      zIndex: 3,
    },
    headerBack: {
      pointerEvents: 'all',
      gridArea: 'back',
    },
    headerTitleContainer: {
      pointerEvents: 'all',
      gridArea: 'title',
    },
    headerTitle: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: 700,
      fontSize: 20,
    },
    dragHandle: {
      width: 78,
      height: 6,
      borderRadius: 3,
      border: `1px solid ${theme.palette.grey[300]}`,
      gridArea: 'handle',
      justifySelf: 'center',
    },
    headerForward: {
      pointerEvents: 'all',
      display: 'flex',
      justifyContent: 'flex-end',
      gridArea: 'forward',
    },
  }),
  { name: 'BottomDrawerUi' },
)

export type BottomDrawerUiProps = UseStyles<typeof useStyles> & {
  fullHeight?: boolean
  titleProps?: TypographyProps<'h2'>
  titleComponent?: React.ElementType
  headerForward?: React.ReactNode
}

const BottomDrawerUi: UiFC<BottomDrawerUiProps> = (props) => {
  const classes = useStyles(props)
  const router = useRouter()
  const {
    children,
    title,
    titleProps,
    titleComponent,
    backFallbackHref,
    backFallbackTitle,
    headerForward,
    fullHeight,
  } = props

  const {
    offsetProps,
    inFront,
    inBack,
    prevPage,
    upPage,
    hold,
    thisIdx,
    backLevel,
    phase,
  } = usePageTransition({ title })

  const { scrollY } = useViewportScroll()
  const [drag, setDrag] = useState<boolean>(scrollY.get() < 50)

  // disable drag functionality when scrolled down
  useEffect(() => scrollY.onChange((s) => setDrag(s < 50)), [scrollY])

  const [dismissed, dismiss] = useState<boolean>(false)
  // Reset the dismiss value when navigating back
  useEffect(() => {
    if (inFront) dismiss(false)
  }, [inFront])

  const opacity = useTransform(scrollY, [25, 50], [1, 0])

  const z = backLevel * -30

  const back = () => {
    dismiss(true)
    router.back()
  }

  const onPressEscape: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (inBack || e.key !== 'Escape') return
    e.preventDefault()
    back()
  }

  const contentAnimation: MotionProps = !hold
    ? {
        initial: { y: '100%', z, opacity: 0, originY: 0 },
        animate: {
          y: 0,
          z,
          opacity: 1,
          display: 'block',
          transition: { type: 'tween', ease: 'easeOut' },
          ...(dismissed && {
            y: '100%',
            opacity: 0,
            transition: { type: 'tween', ease: 'easeIn' },
            transitionEnd: { display: 'none' },
          }),
        },
      }
    : {
        initial: { opacity: 1, z, y: 0 },
        animate: { opacity: 1, z, y: 0, transition: { type: 'tween', ease: 'easeOut' } },
        exit: { opacity: 1, y: 0, z, transition: { type: 'tween', ease: 'easeIn' } },
      }

  return (
    <>
      <Backdrop
        inFront={inFront}
        classes={{ backdrop: classes.backdrop }}
        onClick={() => dismiss(true)}
        role='none'
        zOffset={thisIdx * 2 - 1}
        hold={hold}
      />
      <m.div {...offsetProps} style={{ zIndex: thisIdx * 2 }}>
        <m.div
          className={classes.drawerContainer}
          onKeyDown={onPressEscape}
          role='presentation'
          // drag={drag && inFront ? 'y' : false}
          // dragConstraints={{ top: 0, bottom: 0 }}
          // dragElastic={1}
          // onDragEnd={(e, info) => {
          //   const isFlick = info.offset.y > 100 && info.velocity.y > 0
          //   const isClose = info.offset.y > window.innerHeight / 3 - 50
          //   if (isFlick || isClose) back()
          // }}
        >
          <m.section
            className={clsx(classes.drawer, fullHeight && classes.drawerFullHeight)}
            {...contentAnimation}
            tabIndex={-1}
            style={{ pointerEvents: inFront ? 'all' : 'none' }}
          >
            <FocusLock
              returnFocus={{ preventScroll: true }}
              disabled={!inFront && phase === 'FINISHED'}
            >
              <div className={classes.header} role='presentation'>
                {/* <m.div className={classes.dragHandle} style={{ opacity }} /> */}

                <div className={classes.headerBack}>
                  <NoSsr fallback={<BackButton>Home</BackButton>}>
                    {prevPage?.title ? (
                      <BackButton onClick={back} down={prevPage === upPage}>
                        {prevPage.title}
                      </BackButton>
                    ) : (
                      <PageLink href={backFallbackHref ?? '/'}>
                        <BackButton>{backFallbackTitle ?? 'Home'}</BackButton>
                      </PageLink>
                    )}
                  </NoSsr>
                </div>

                <div className={classes.headerTitleContainer}>
                  <Typography
                    variant='h4'
                    component={titleComponent ?? 'h1'}
                    align='center'
                    {...titleProps}
                    className={classes.headerTitle}
                  >
                    {title}
                  </Typography>
                </div>
                <div className={classes.headerForward}>{headerForward}</div>
              </div>
              {children}
            </FocusLock>
          </m.section>
        </m.div>
      </m.div>
    </>
  )
}
BottomDrawerUi.holdBackground = true

export default BottomDrawerUi
