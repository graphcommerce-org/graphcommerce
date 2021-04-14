import { makeStyles, Theme } from '@material-ui/core'
import { usePageDepth, usePageRouter } from '@reachdigital/framer-next-pages'
import {
  Sheet,
  SheetBackdrop,
  SheetContainer,
  SheetDragIndicator,
  SheetPanel,
  SheetProps,
} from '@reachdigital/framer-sheet'
import { useRouter } from 'next/router'
import React from 'react'
import FocusLock from 'react-focus-lock'
import useSheetStyles from '../FramerSheet/useSheetStyles'
import { UseStyles } from '../Styles'
import BackButton, { BackButtonProps } from './BackButton'

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
  children?: React.ReactNode
  backFallbackHref?: string
  backFallbackTitle?: string
} & Pick<SheetProps, 'size' | 'variant'>

function OverlayUi(props: OverlayUiProps) {
  const classes = useStyles(props)
  const {
    children,
    backFallbackHref,
    backFallbackTitle,
    header,
    headerForward,
    variant,
    size,
  } = props

  const sheetClasses = useSheetStyles()
  const router = useRouter()
  const pageRouter = usePageRouter()
  const depth = usePageDepth()

  const isActive = depth < 0 || router.asPath === pageRouter.asPath

  return (
    <Sheet
      open={isActive}
      onSnap={(snapPoint) => snapPoint === 'closed' && router.back()}
      variant={variant}
    >
      <SheetBackdrop onTap={() => router.back()} classes={sheetClasses} />
      <SheetContainer classes={sheetClasses}>
        <SheetPanel
          dragHandle={<SheetDragIndicator classes={sheetClasses} />}
          classes={sheetClasses}
        >
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
        </SheetPanel>
      </SheetContainer>
    </Sheet>
  )
}

export default OverlayUi
