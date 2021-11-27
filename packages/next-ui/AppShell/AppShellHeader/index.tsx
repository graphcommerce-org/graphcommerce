import { usePageContext, usePageRouter, usePrevUp, useUp } from '@graphcommerce/framer-next-pages'
import { Fab, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { m, MotionValue, useMotionValue, useTransform } from 'framer-motion'
import PageLink from 'next/link'
import React, { useCallback, useEffect } from 'react'
import Button from '../../Button'
import { UseStyles } from '../../Styles'
import SvgImageSimple from '../../SvgImage/SvgImageSimple'
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
  fill?: 'both' | 'mobile-only'
  sheet?: boolean
} & UseStyles<typeof useStyles>

// minHeight: x
// to reserve space for back & primary buttons,
// even when there is no app shell header on scroll (e.g. on full page shell)
const minHeight = 40
const useStyles = makeStyles(
  (theme: Theme) => ({
    divider: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    dividerSpacer: {
      minHeight: 1,
    },
    dividerSheetShell: {
      marginTop: `calc((${theme.page.headerInnerHeight.md} * 0.15))`,
    },
    sheetHeaderContainer: {
      position: 'sticky',
      top: 0,
      zIndex: 98,
      // reserve space in the container even without any buttons added
      minHeight: 58,
    },
    sheetHeaderContainerSheetShell: {
      marginBottom: `calc((${theme.page.headerInnerHeight.md} * 0.15) * -1)`,
    },
    sheetHeader: {
      background: theme.palette.background.default,
      paddingTop: 8,
      paddingBottom: 8,
      minHeight,
      [theme.breakpoints.up('md')]: {
        minHeight: `calc(${minHeight}px + ${theme.spacings.xxs} * 2)`,
        paddingTop: theme.spacings.xxs,
        paddingBottom: theme.spacings.xxs,
      },
    },
    sheetHeaderSheetShell: {
      // The bottom sheets offset top is x% short compared to the page headers height,
      // so we add x% of the header height to padding top of bottomsheet actions bar
      // to keep consistency between app shell buttons.
      paddingTop: `calc(${theme.spacings.xxs} + (${theme.page.headerInnerHeight.md} * 0.15))`,
      paddingBottom: `calc(${theme.spacings.xxs} + (${theme.page.headerInnerHeight.md} * 0.15))`,
      [theme.breakpoints.down('sm')]: {
        paddingTop: 8,
        paddingBottom: 8,
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
      padding: `0 calc(${theme.page.horizontal} + 2px) 0`,
      width: '100%',
      minHeight,
      [theme.breakpoints.up('md')]: {
        '& * > a, & * > button': {
          height: minHeight,
        },
      },
      [theme.breakpoints.down('sm')]: {
        '& div > .MuiFab-sizeSmall': {
          marginLeft: -8,
          marginRight: -8,
        },
        '& div > .MuiButtonBase-root': {
          minWidth: 'unset',
          marginRight: -8,
          marginLeft: -8,
        },
      },
    },
    sheetHeaderActionRight: {
      justifySelf: 'flex-end',
      '& > .Mui-disabled': {
        // color: `${theme.palette.primary.contrastText} !important`,
        [theme.breakpoints.up('sm')]: {
          opacity: 0.25,
          color: `${theme.palette.secondary.contrastText} !important`,
          '& svg': {
            stroke: `${theme.palette.secondary.contrastText} !important`,
          },
        },
      },
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
    sheetHeaderFillMobileOnly: {
      [theme.breakpoints.up('md')]: {
        pointerEvents: 'none',
        position: 'fixed',
      },
    },
    innerContainer: {
      display: 'grid',
      textAlign: 'center',
      pointerEvents: 'all',
    },
    fab: {
      maxWidth: 38,
      maxHeight: 38,
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
    dividerFillMobileOnly: {
      [theme.breakpoints.up('md')]: {
        visibility: 'hidden',
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
      minHeight,
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    backButton: {
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      '&:hover': {
        background: theme.palette.background.paper,
      },
    },
    sheetShellActionsFullPage: {
      '& * > a, & * > button': {
        pointerEvents: 'all',
      },
      '& * > button': {
        boxShadow: theme.shadows[6],
      },
      [theme.breakpoints.up('md')]: {
        position: 'fixed',
        top: `calc(${theme.page.headerInnerHeight.md} + ${theme.spacings.xxs})`,
      },
    },
    sheetShellActionsNoButtonShadow: {
      [theme.breakpoints.down('sm')]: {
        '& * > button': {
          boxShadow: 'none',
        },
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
    fill = 'both',
    sheet,
  } = props

  const router = usePageRouter()
  const { closeSteps, backSteps } = usePageContext()
  const classes = useStyles(props)
  const up = useUp()
  const prevUp = usePrevUp()
  const { titleRef, contentHeaderRef } = useAppShellHeaderContext()

  const noChildren = typeof children === 'undefined' || !children

  const fillMobileOnly = fill === 'mobile-only'

  const sheetHeaderHeight = useMotionValue<number>(0)
  const titleOffset = useMotionValue<number>(100)
  const titleHeight = useMotionValue<number>(100)

  const setOffset = useCallback(
    (offsetTop: number, offsetParent: Element | null, clientHeight: number) => {
      titleHeight.set(clientHeight)
      titleOffset.set(offsetTop)
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
    [scrollY, sheetHeaderHeight, titleOffset, titleHeight] as MotionValue<number | string>[],
    ([scrollYV, sheetHeaderHeightV, titleOffsetV, titleHeigthV]: number[]) =>
      Math.min(
        Math.max(
          0,
          scrolled
            ? 1
            : (scrollYV - Math.max(titleOffsetV, 80) + sheetHeaderHeightV) / titleHeigthV,
        ),
        1,
      ),
  )

  const pointerEvents = useTransform(opacityTitle, (o) => (o < 0.2 ? 'none' : 'all'))
  const opacityLogo = useTransform(opacityTitle, [0, 1], [1, fillMobileOnly && primary ? 1 : 0])
  const pointerEventsLogo = useTransform(opacityLogo, (o) => (o < 0.2 ? 'none' : 'all'))

  const close =
    !hideClose &&
    (closeSteps > 0 ? (
      <Fab
        size='small'
        type='button'
        classes={{ root: classes.fab }}
        onClick={() => router.go(closeSteps * -1)}
        aria-label='Close'
      >
        <SvgImageSimple src={iconClose} />
      </Fab>
    ) : (
      <PageLink href='/' passHref>
        <Fab size='small' classes={{ root: classes.fab }} aria-label='Close'>
          <SvgImageSimple src={iconClose} />
        </Fab>
      </PageLink>
    ))

  const backIcon = <SvgImageSimple src={iconChevronLeft} />

  const canClickBack = backSteps > 0 && router.asPath !== prevUp?.href
  let back = canClickBack && (
    <Button
      onClick={() => router.back()}
      variant='pill-link'
      size='small'
      className={classes.backButton}
      startIcon={backIcon}
      aria-label='Back'
    >
      {up?.href === router.asPath ? up?.title : 'Back'}
    </Button>
  )

  if (!canClickBack && up?.href) {
    back = (
      <PageLink href={up?.href} passHref>
        <Button
          variant='pill-link'
          className={classes.backButton}
          startIcon={backIcon}
          aria-label='Back'
        >
          {up?.title ?? 'Back'}
        </Button>
      </PageLink>
    )
  }

  let leftAction: React.ReactNode = secondary ?? back
  const rightAction: React.ReactNode = primary ?? close
  if (rightAction !== close && !leftAction) leftAction = close
  if (!leftAction) leftAction = <div />

  const showDivider = children || (fillMobileOnly && primary)

  return (
    <div
      className={clsx(
        classes.sheetHeaderContainer,
        noChildren && !primary && classes.sheetHeaderNoTitle,
        fillMobileOnly && classes.sheetHeaderFillMobileOnly,
        sheet && classes.sheetHeaderContainerSheetShell,
      )}
    >
      <div
        className={clsx(
          classes?.sheetHeader,
          sheet && classes.sheetHeaderSheetShell,
          scrolled && classes?.sheetHeaderScrolled,
          noChildren && !primary && classes.sheetHeaderNoTitle,
          fillMobileOnly && noChildren && classes.sheetHeaderNoTitleFillMobileOnly,
          fillMobileOnly && classes.sheetHeaderFillMobileOnly,
        )}
        ref={contentHeaderRef}
      >
        <div className={classes.logoContainer}>
          {logo && (
            <m.div
              style={{
                opacity: opacityLogo,
                pointerEvents: pointerEventsLogo,
              }}
              className={classes.logoInnerContainer}
            >
              {logo}
            </m.div>
          )}
        </div>

        {dragIndicator}

        <div
          className={clsx(
            classes.sheetHeaderActions,
            (noChildren || fillMobileOnly) && classes.sheetShellActionsFullPage,
            fillMobileOnly && showDivider && classes.sheetShellActionsNoButtonShadow,
          )}
        >
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
      {showDivider &&
        (divider ?? (
          <m.div
            className={clsx(
              classes.dividerSpacer,
              classes.divider,
              fillMobileOnly && classes.dividerFillMobileOnly,
            )}
            style={{ opacity: opacityTitle }}
          />
        ))}
      {!showDivider && <div className={classes.dividerSpacer} />}
    </div>
  )
}
