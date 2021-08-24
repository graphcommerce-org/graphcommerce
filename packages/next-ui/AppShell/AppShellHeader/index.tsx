import { Fab, makeStyles, Theme } from '@material-ui/core'
import { usePageContext, usePageRouter } from '@reachdigital/framer-next-pages'
import clsx from 'clsx'
import { m, MotionValue, useMotionValue, useTransform } from 'framer-motion'
import PageLink from 'next/link'
import React, { useCallback, useEffect } from 'react'
import Button from '../../Button'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'
import SvgImage from '../../SvgImage'
import { iconChevronLeft, iconClose } from '../../icons'
import useAppShellHeaderContext from './useAppShellHeaderContext'

export type AppShellHeaderProps = {
  children?: React.ReactNode
  primary?: React.ReactNode
  secondary?: React.ReactNode
  divider?: React.ReactNode
  /* When a logo is given, children should be given too */
  logo?: React.ReactNode
  scrollY: MotionValue<number>
  hideClose?: boolean
  scrolled?: boolean
  dragIndicator?: React.ReactNode
  additional?: React.ReactNode
  backFallbackHref?: string | null
  backFallbackTitle?: string | null
  fill?: 'both' | 'mobile-only'
  sheet?: boolean
} & UseStyles<typeof useStyles>

// minHeight: 38
// = reserve space for back & primary buttons,
//   even when there is no app shell header on scroll (e.g. on full page shell)

const useStyles = makeStyles(
  (theme: Theme) => ({
    divider: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      minHeight: 2,
    },
    dividerSpacer: {
      minHeight: 2,
    },
    sheetHeaderContainer: {
      position: 'sticky',
      top: 0,
      zIndex: 98,
    },
    sheetHeader: {
      background: theme.palette.background.default,
      minHeight: 38,
      paddingTop: 8,
      paddingBottom: 8,
      [theme.breakpoints.up('md')]: {
        paddingTop: responsiveVal(8, 24),
        paddingBottom: responsiveVal(8, 24),
      },
    },
    sheetHeaderSheetShell: {
      paddingTop: `calc((${theme.page.headerInnerHeight.md} * 0.15) + ${responsiveVal(8, 24)})`,
      paddingBottom: `calc((${theme.page.headerInnerHeight.md} * 0.15) + ${responsiveVal(8, 24)})`,
      [theme.breakpoints.down('sm')]: {
        paddingTop: `calc(${theme.page.headerInnerHeight.md} * 0.1)`,
        paddingBottom: `calc(${theme.page.headerInnerHeight.md} * 0.1)`,
      },
    },
    sheetHeaderScrolled: {
      [theme.breakpoints.up('md')]: {
        marginTop: -60,
      },
    },
    sheetHeaderActions: {
      display: 'grid',
      gridTemplateColumns: `1fr auto 1fr`,
      gridAutoFlow: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 'inherit',
      padding: `0 ${theme.page.horizontal} 0`,
      [theme.breakpoints.down('sm')]: {
        '& div > .MuiFab-sizeSmall': {
          marginLeft: -12,
          marginRight: -12,
        },
        '& div > .MuiButtonBase-root': {
          minWidth: 'unset',
          marginRight: -12,
          marginLeft: -12,
        },
      },
    },
    sheetHeaderActionRight: {
      justifySelf: 'flex-end',
    },
    sheetHeaderNoTitle: {
      pointerEvents: 'none',
      background: 'transparent',
    },
    sheetHeaderNoTitleFillMobileOnly: {
      [theme.breakpoints.up('md')]: {
        pointerEvents: 'none',
        background: 'transparent',
        top: 98,
      },
    },
    innerContainer: {
      display: 'grid',
      textAlign: 'center',
    },
    fab: {
      [theme.breakpoints.down('sm')]: {
        boxShadow: 'none',
      },
    },
    childs: {
      marginLeft: 12,
      marginRight: 12,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    fillMobileOnly: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    logoContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingTop: 8,
      paddingBottom: 8,
    },
    logoInnerContainer: {
      minHeight: 38,
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    backButton: {
      pointerEvents: 'all',
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      '&:hover': {
        background: theme.palette.background.highlight,
      },
    },
    backButtonFullPage: {
      [theme.breakpoints.up('md')]: {
        position: 'fixed',
        top: `calc(${theme.page.headerInnerHeight.md} + ${responsiveVal(8, 24)})`,
      },
    },
  }),
  { name: 'AppShellHeader' },
)

export default function AppShellHeader(props: AppShellHeaderProps) {
  const {
    children,
    logo,
    divider,
    primary = null,
    secondary = null,
    hideClose,
    scrollY,
    additional,
    dragIndicator,
    scrolled,
    backFallbackHref,
    backFallbackTitle,
    fill = 'both',
    sheet,
  } = props
  const router = usePageRouter()
  const { closeSteps, backSteps } = usePageContext()
  const classes = useStyles(props)

  const { titleRef, contentHeaderRef } = useAppShellHeaderContext()

  const noChildren = typeof children === 'undefined' || !children
  const fillMobileOnly = fill === 'mobile-only'

  const sheetHeaderHeight = useMotionValue<number>(0)
  const titleOffset = useMotionValue<number>(100)
  const titleHeight = useMotionValue<number>(100)

  const setOffset = useCallback(
    (offsetTop: number, offsetParent: Element | null, clientHeight: number) => {
      titleHeight.set(clientHeight)

      let offsetParentTop = 0
      if (offsetParent && offsetParent instanceof HTMLElement) {
        offsetParentTop = offsetParent.offsetTop
      }

      titleOffset.set(offsetTop + offsetParentTop)
    },
    [titleHeight, titleOffset],
  )

  if (titleRef.current) {
    setOffset(
      titleRef.current.offsetTop,
      titleRef.current.offsetParent,
      titleRef.current.clientHeight,
    )
  }

  // Measure the title sizes so we can animate the opacity
  useEffect(() => {
    if (!titleRef.current) return () => {}

    const ro = new ResizeObserver(([entry]) => {
      const { offsetTop, offsetParent, clientHeight } = entry.target as HTMLDivElement
      setOffset(offsetTop, offsetParent, clientHeight)
    })

    ro.observe(titleRef.current)
    return () => ro.disconnect()
  }, [setOffset, titleHeight, titleOffset, titleRef])

  // Measure the sheetHeight sizes so we can animate the opacity
  useEffect(() => {
    if (!contentHeaderRef.current) return () => {}

    const ro = new ResizeObserver(([entry]) =>
      sheetHeaderHeight.set((entry.target as HTMLDivElement).clientHeight),
    )

    ro.observe(contentHeaderRef.current)
    return () => ro.disconnect()
  }, [contentHeaderRef, sheetHeaderHeight])

  const opacityTitle = useTransform(
    [scrollY, sheetHeaderHeight, titleOffset, titleHeight] as MotionValue[],
    ([scrollYV, sheetHeaderHeightV, titleOffsetV, titleHeigthV]: number[]) =>
      Math.min(
        Math.max(0, scrolled ? 1 : (scrollYV - titleOffsetV + sheetHeaderHeightV) / titleHeigthV),
        1,
      ),
  )
  const pointerEvents = useTransform(opacityTitle, (o) => (o < 0.2 ? 'none' : 'all'))
  const opacityLogo = useTransform(opacityTitle, [0, 1], [1, 0])

  // why janky?
  const backButtonTop = useTransform(scrollY, [0, 88], [0, 88])

  const close =
    !hideClose &&
    (closeSteps > 0 ? (
      <Fab
        size='small'
        type='button'
        classes={{ root: classes.fab }}
        onClick={() => router.go(closeSteps * -1)}
      >
        <SvgImage src={iconClose} mobileSize={20} size={20} alt='Close overlay' loading='eager' />
      </Fab>
    ) : (
      <PageLink href='/' passHref>
        <Fab size='small' classes={{ root: classes.fab }}>
          <SvgImage src={iconClose} alt='Close overlay' size={20} mobileSize={20} loading='eager' />
        </Fab>
      </PageLink>
    ))

  const backIcon = (
    <SvgImage src={iconChevronLeft} alt='chevron back' loading='eager' size={26} mobileSize={30} />
  )
  let back = backSteps > 0 && (
    <Button
      onClick={() => router.back()}
      variant='pill-link'
      className={clsx(classes.backButton, {
        [classes.backButtonFullPage]: noChildren,
      })}
      startIcon={backIcon}
    >
      Back
    </Button>
  )
  if (!back && backFallbackHref) {
    back = (
      <PageLink href={backFallbackHref} passHref>
        <Button
          variant='pill-link'
          className={clsx(classes.backButton, {
            [classes.backButtonFullPage]: noChildren,
          })}
          startIcon={backIcon}
        >
          {backFallbackTitle ?? 'Back'}
        </Button>
      </PageLink>
    )
  }

  let leftAction: React.ReactNode = secondary ?? back
  const rightAction: React.ReactNode = primary ?? close
  if (rightAction !== close && !leftAction) leftAction = close
  if (!leftAction) leftAction = <div />

  return (
    <div className={classes.sheetHeaderContainer}>
      <div
        className={clsx(
          classes?.sheetHeader,
          sheet && classes.sheetHeaderSheetShell,
          scrolled && classes?.sheetHeaderScrolled,
          noChildren && classes.sheetHeaderNoTitle,
          fillMobileOnly && classes.sheetHeaderNoTitleFillMobileOnly,
        )}
        ref={contentHeaderRef}
      >
        <div className={classes.logoContainer}>
          {logo && (
            <m.div style={{ opacity: opacityLogo }} className={classes.logoInnerContainer}>
              {logo}
            </m.div>
          )}
        </div>

        {dragIndicator}

        <div className={classes.sheetHeaderActions}>
          {leftAction && <div>{leftAction}</div>}
          <div className={classes.innerContainer}>
            {children && (
              <m.div
                style={{ opacity: opacityTitle, pointerEvents }}
                className={clsx(classes.childs, fillMobileOnly && classes.fillMobileOnly)}
              >
                {children}
              </m.div>
            )}
          </div>
          <div className={classes?.sheetHeaderActionRight}>{rightAction}</div>
        </div>
        {additional && (
          <div className={clsx(fillMobileOnly && classes.fillMobileOnly)}>
            <>{additional}</>
          </div>
        )}
      </div>
      {children &&
        (divider ?? (
          <m.div
            className={clsx(classes.divider, fillMobileOnly && classes.fillMobileOnly)}
            style={{ opacity: opacityTitle }}
          />
        ))}
      {!children && <div className={classes.dividerSpacer} />}
    </div>
  )
}
