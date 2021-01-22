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
import useLeftOverlayUiAnimations from './useLeftOverlayUiAnimations'

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
    drawerContainerCenter: {
      alignItems: 'flex-start',
      paddingTop: theme.spacings.xl,
    },
    drawerContainerLeft: {
      [theme.breakpoints.up('md')]: {
        perspectiveOrigin: '75% center',
        paddingTop: 0,
      },
    },
    drawerLeft: {
      minHeight: `calc(100vh - 50px)`,
      [theme.breakpoints.up('md')]: {
        width: '70vw',
        minHeight: '100vh',
      },
      [theme.breakpoints.up('lg')]: {
        width: '50vw',
      },
    },
    drawerCenter: {
      margin: '0 auto',
      maxWidth: '75%',
      borderRadius: theme.spacings.xxs,
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
  { name: 'OverlayUiProps' },
)

type OverlayVariants = 'top' | 'right' | 'bottom' | 'left' | 'center'

export type OverlayUiProps = UseStyles<typeof useStyles> & {
  fullHeight?: boolean
  titleProps?: TypographyProps<'h2'>
  titleComponent?: React.ElementType
  headerForward?: React.ReactNode

  variant: OverlayVariants
  // variantDesktop?: OverlayVariants

  /**
   * desktop:bottom + size:small: the bottom drawer is as small as the content can be.
   * desktop:bottom + size:normal: the bottom drawer covers the whole screen
   * mobile: bottom + size: no difference
   *
   */
  size?: 'small' | 'normal'
}

const OverlayUi: UiFC<OverlayUiProps> = (props) => {
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
    variant,
    // variantDesktop = variant,
    size = 'normal',
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

  // const { scrollY } = useViewportScroll()
  // const [drag, setDrag] = useState<boolean>(scrollY.get() < 50)

  // disable drag functionality when scrolled down
  // useEffect(() => scrollY.onChange((s) => setDrag(s < 50)), [scrollY])

  const [dismissed, dismiss] = useState<boolean>(false)
  // Reset the dismiss value when navigating back
  useEffect(() => {
    if (inFront) dismiss(false)
  }, [inFront])

  // const opacity = useTransform(scrollY, [25, 50], [1, 0])

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

  const overlayUiAnimationProps = {
    dismissed,
    z,
    hold,
  }

  const contentAnimation: MotionProps = useLeftOverlayUiAnimations({ ...overlayUiAnimationProps })

  const [zIndex, setZIndex] = useState(0)
  useEffect(() => setZIndex(thisIdx * 2), [thisIdx])

  return (
    <>
      <Backdrop
        inFront={inFront}
        classes={{ backdrop: classes.backdrop }}
        onClick={() => dismiss(true)}
        role='none'
        zOffset={zIndex - 1}
        hold={hold}
      />
      <m.div {...offsetProps} style={{ zIndex }}>
        <m.div
          className={clsx(classes.drawerContainer, {
            [classes.drawerContainerCenter]: variant === 'center',
            [classes.drawerContainerLeft]: variant === 'left',
          })}
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
            className={clsx(classes.drawer, {
              [classes.drawerFullHeight]: fullHeight,
              [classes.drawerCenter]: variant === 'center',
              [classes.drawerLeft]: variant === 'left',
            })}
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
OverlayUi.holdBackground = true

export default OverlayUi
