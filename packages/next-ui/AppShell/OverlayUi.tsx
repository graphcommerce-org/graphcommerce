import { makeStyles, NoSsr, Theme, useMediaQuery, useTheme } from '@material-ui/core'
import { usePageRouter } from '@reachdigital/framer-next-pages'
import { SheetVariant } from '@reachdigital/framer-sheet'
import clsx from 'clsx'
import { m, MotionProps } from 'framer-motion'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React, { KeyboardEventHandler, useEffect, useState } from 'react'
import FocusLock from 'react-focus-lock'
import SheetPageUi from '../FramerSheet/SheetPage'
import { UseStyles } from '../Styles'
import bottomOverlayUiAnimations, {
  OverlayUiAnimationProps,
} from './Animations/bottomOverlayUiAnimations'
import centerOverlayUiAnimations from './Animations/centerOverlayUiAnimations'
import leftOverlayUiAnimations from './Animations/leftOverlayUiAnimations'
import rightOverlayUiAnimations from './Animations/rightOverlayUiAnimations'
import topOverlayUiAnimations from './Animations/topOverlayUiAnimations'
import BackButton, { BackButtonProps } from './BackButton'
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
        minWidth: theme.breakpoints.values.md,
        minHeight: '100vh',
        width: '50vw',
      },
    },
    drawerCenter: {
      minHeight: `calc(100vh - 50px)`,
      [theme.breakpoints.up('md')]: {
        margin: '0 auto',
        maxWidth: theme.breakpoints.values.md,
        borderRadius: theme.spacings.xxs,
        minHeight: 'unset',
        marginBottom: theme.spacings.xl,
      },
    },
    drawerRight: {
      minHeight: `calc(100vh - 50px)`,
      [theme.breakpoints.up('md')]: {
        minWidth: theme.breakpoints.values.md,
        minHeight: '100vh',
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

export type OverlayUiProps = UseStyles<typeof useStyles> & {
  fullHeight?: boolean
  header?: React.ReactNode
  headerForward?: React.ReactNode
  variant: SheetVariant
  children?: React.ReactNode
  backFallbackHref?: string
  backFallbackTitle?: string
}

function OverlayUi(props: OverlayUiProps) {
  const classes = useStyles(props)
  const { children, backFallbackHref, backFallbackTitle, header, headerForward, variant } = props

  return (
    <SheetPageUi variant={variant}>
      {/* <FocusLock returnFocus={{ preventScroll: true }} disabled={!isActive}> */}
      <div className={classes.header} role='presentation'>
        <div className={classes.headerTitleContainer}>{header}</div>
        <div className={classes.headerBack}>
          <BackButton href={backFallbackHref}>{backFallbackTitle}</BackButton>
        </div>
        <div className={classes.headerForward}>{headerForward}</div>
      </div>
      {children}
      {/* </FocusLock> */}
    </SheetPageUi>
  )
}
OverlayUi.holdBackground = true

export default OverlayUi
