import {
  makeStyles,
  Theme,
  Typography,
  TypographyProps,
  NoSsr,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
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
      perspectiveOrigin: '75% center',
      [theme.breakpoints.up('md')]: {
        paddingTop: 0,
      },
    },
    drawer: {
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[10],
      width: '100%',
      minHeight: `calc(100vh - 50px)`,
      [theme.breakpoints.up('md')]: {
        width: '50vw',
        minHeight: '100vh',
      },
      '&:focus': { outline: 'none' },
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
      padding: `0 ${theme.spacings.sm}`,
      marginBottom: theme.spacings.sm,
      // margin: `0 ${theme.spacings.sm}`,
      alignItems: 'center',
      gridTemplate: `
        ". handle ." ${theme.spacings.sm}
        "back title forward" auto / 1fr auto 1fr
      `,
      // gridTemplateColumns: `1fr auto 1fr`,
      pointerEvents: 'none',
    },
    headerBack: {
      pointerEvents: 'all',
      gridArea: 'back',
    },
    headerTitle: {
      pointerEvents: 'all',
      gridArea: 'title',
      [theme.breakpoints.up('md')]: {
        padding: `0 ${theme.spacings.lg} ${theme.spacings.md} ${theme.spacings.lg}`,
      },
    },
    dragHandle: {
      width: 100,
      height: 6,
      borderRadius: 3,
      border: `1px solid ${theme.palette.grey[300]}`,
      gridArea: 'handle',
      justifySelf: 'center',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    headerForward: {
      pointerEvents: 'all',
      display: 'flex',
      justifyContent: 'flex-end',
      gridArea: 'forward',
    },
    wrapper: {
      [theme.breakpoints.up('md')]: {
        padding: `0 ${theme.spacings.lg}`,
      },
    },
  }),
  { name: 'SideDrawerUi' },
)

export type SideDrawerUiProps = UseStyles<typeof useStyles> & {
  titleProps?: TypographyProps<'h2'>
  titleComponent?: React.ElementType
  headerForward?: React.ReactNode
}

const SideDrawerUi: UiFC<SideDrawerUiProps> = (props) => {
  const classes = useStyles(props)
  const router = useRouter()
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  const {
    children,
    title,
    titleProps,
    titleComponent,
    backFallbackHref,
    backFallbackTitle,
    headerForward,
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

  let contentAnimation: MotionProps = !hold
    ? {
        initial: { y: '90%', z, opacity: 0, originY: 0 },
        animate: {
          y: '0',
          z,
          opacity: 1,
          display: 'block',
          transition: { type: 'tween', ease: 'easeOut' },
          ...(dismissed && {
            y: '90%',
            opacity: 0,
            transition: { type: 'tween', ease: 'easeIn' },
            transitionEnd: { display: 'none' },
          }),
        },
      }
    : {
        initial: { opacity: 1, z },
        animate: { opacity: 1, z, transition: { type: 'tween', ease: 'easeOut' } },
        exit: { opacity: 1, z, transition: { type: 'tween', ease: 'easeIn' } },
      }

  if (upMd) {
    contentAnimation = !hold
      ? {
          initial: { x: '-20%', z, opacity: 0, originY: 0 },
          animate: {
            x: '0',
            z,
            opacity: 1,
            display: 'block',
            transition: { type: 'tween', ease: 'easeOut' },
            ...(dismissed && {
              x: '-20%',
              opacity: 0,
              transition: { type: 'tween', ease: 'easeIn' },
              transitionEnd: { display: 'none' },
            }),
          },
        }
      : {
          initial: { opacity: 1, z },
          animate: { opacity: 1, z, transition: { type: 'tween', ease: 'easeOut' } },
          exit: { opacity: 1, z, transition: { type: 'tween', ease: 'easeIn' } },
        }
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
          className={clsx(classes.drawerContainer)}
          onKeyDown={onPressEscape}
          role='presentation'
          drag={drag && !upMd && inFront ? 'y' : false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={1}
          onDragEnd={(e, info) => {
            const isFlick = info.offset.y > 100 && info.velocity.y > 0
            const isClose = info.offset.y > window.innerHeight / 3 - 50
            if (isFlick || isClose) back()
          }}
        >
          <m.section
            className={clsx(classes.drawer)}
            {...contentAnimation}
            tabIndex={-1}
            style={{ pointerEvents: inFront ? 'all' : 'none' }}
          >
            <FocusLock
              returnFocus={{ preventScroll: true }}
              disabled={!inFront && phase === 'FINISHED'}
            >
              <div className={classes.header} role='presentation'>
                <m.div className={clsx(classes.dragHandle)} style={{ opacity }} />

                <div className={classes.headerBack}>
                  <NoSsr fallback={<BackButton className={classes.headerBack}>Home</BackButton>}>
                    {prevPage?.title ? (
                      <BackButton onClick={back} down={prevPage === upPage}>
                        {prevPage.title}
                      </BackButton>
                    ) : (
                      <PageLink href={backFallbackHref ?? '/'}>
                        <BackButton className={classes.headerBack}>
                          {backFallbackTitle ?? 'Home'}
                        </BackButton>
                      </PageLink>
                    )}
                  </NoSsr>
                </div>

                {upMd ? (
                  false
                ) : (
                  <div className={classes.headerTitle}>
                    <Typography
                      variant='h4'
                      component={titleComponent ?? 'h1'}
                      align='center'
                      {...titleProps}
                    >
                      {title}
                    </Typography>
                  </div>
                )}

                <div className={classes.headerForward}>{headerForward}</div>
              </div>

              {upMd ? (
                <div className={classes.headerTitle}>
                  <Typography
                    variant='h2'
                    component={titleComponent ?? 'h1'}
                    align='center'
                    {...titleProps}
                  >
                    {title}
                  </Typography>
                </div>
              ) : (
                false
              )}

              <div className={classes.wrapper}>{children}</div>
            </FocusLock>
          </m.section>
        </m.div>
      </m.div>
    </>
  )
}
SideDrawerUi.holdBackground = true

export default SideDrawerUi
