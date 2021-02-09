import { makeStyles, NoSsr, Theme, Typography, TypographyProps } from '@material-ui/core'
import clsx from 'clsx'
import { m, MotionProps } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { KeyboardEventHandler, useEffect, useState } from 'react'
import FocusLock from 'react-focus-lock'
import PageLink from '../PageTransition/PageLink'
import { UiFC } from '../PageTransition/types'
import usePageTransition from '../PageTransition/usePageTransition'
import { UseStyles } from '../Styles'
import BackButton from './BackButton'
import Backdrop from './Backdrop'
import useBottomOverlayUiAnimations, {
  OverlayUiAnimationProps,
} from './useBottomOverlayUiAnimations'
import useCenterOverlayUiAnimations from './useCenterOverlayUiAnimations'
import useLeftOverlayUiAnimations from './useLeftOverlayUiAnimations'
import useRightOverlayUiAnimations from './useRightOverlayUiAnimations'
import useTopOverlayUiAnimations from './useTopOverlayUiAnimations'

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
    },
    drawerFullHeight: {
      minHeight: `calc(100vh - 50px)`,
    },
    drawerContainerCenter: {
      [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        paddingTop: theme.spacings.xl,
      },
    },
    drawerContainerLeft: {
      [theme.breakpoints.up('md')]: {
        perspectiveOrigin: '75% center',
        paddingTop: 0,
      },
    },
    drawerContainerRight: {
      [theme.breakpoints.up('md')]: {
        perspectiveOrigin: '75% center',
        paddingTop: 0,
      },
    },
    drawerContainerTop: {
      paddingTop: 0,
      minHeight: 'unset',
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
      minHeight: `calc(100vh - 50px)`,
      [theme.breakpoints.up('md')]: {
        margin: '0 auto',
        maxWidth: '60%',
        borderRadius: theme.spacings.xxs,
        minHeight: 'unset',
        marginBottom: theme.spacings.xl,
      },
    },
    drawerRight: {
      minHeight: `calc(100vh - 50px)`,
      [theme.breakpoints.up('md')]: {
        position: 'absolute',
        width: '70vw',
        minHeight: '100vh',
      },
      [theme.breakpoints.up('lg')]: {
        width: '50vw',
      },
    },
    drawerTop: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: theme.spacings.xxs,
      borderBottomRightRadius: theme.spacings.xxs,
    },
    header: {
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      display: 'grid',
      padding: `0 ${theme.spacings.sm}`,
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
  headerForward?: React.ReactNode
  variant?: OverlayVariants
}

const OverlayUi: UiFC<OverlayUiProps> = (props) => {
  const classes = useStyles(props)
  const router = useRouter()
  const {
    children,
    title,
    backFallbackHref,
    backFallbackTitle,
    headerForward,
    fullHeight,
    variant,
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

  const [dismissed, dismiss] = useState<boolean>(false)
  // Reset the dismiss value when navigating back
  useEffect(() => {
    if (inFront) dismiss(false)
  }, [inFront])

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

  const overlayUiAnimationProps: OverlayUiAnimationProps = {
    dismissed,
    z,
    hold,
  }

  const topAnimations = useTopOverlayUiAnimations({ ...overlayUiAnimationProps })
  const rightAnimations = useRightOverlayUiAnimations({ ...overlayUiAnimationProps })
  const bottomAnimations = useBottomOverlayUiAnimations({ ...overlayUiAnimationProps })
  const leftAnimations = useLeftOverlayUiAnimations({ ...overlayUiAnimationProps })
  const centerAnimations = useCenterOverlayUiAnimations({ ...overlayUiAnimationProps })

  let contentAnimation: MotionProps = {}
  if (variant === 'top') contentAnimation = topAnimations
  if (variant === 'right') contentAnimation = rightAnimations
  if (variant === 'bottom') contentAnimation = bottomAnimations
  if (variant === 'left') contentAnimation = leftAnimations
  if (variant === 'center') contentAnimation = centerAnimations

  const [zIndex, setZIndex] = useState(1)
  useEffect(() => setZIndex(thisIdx * 2 + 1), [thisIdx])

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
            [classes.drawerContainerRight]: variant === 'right',
            [classes.drawerContainerTop]: variant === 'top',
          })}
          onKeyDown={onPressEscape}
          role='presentation'
        >
          <m.section
            className={clsx(classes.drawer, {
              [classes.drawerFullHeight]: fullHeight,
              [classes.drawerCenter]: variant === 'center',
              [classes.drawerLeft]: variant === 'left',
              [classes.drawerRight]: variant === 'right',
              [classes.drawerTop]: variant === 'top',
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
