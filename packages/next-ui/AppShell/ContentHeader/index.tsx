import { Fab, makeStyles, Theme } from '@material-ui/core'
import { usePageContext, usePageRouter } from '@reachdigital/framer-next-pages'
import clsx from 'clsx'
import { m, MotionValue, useMotionValue, useTransform } from 'framer-motion'
import PageLink from 'next/link'
import React, { useEffect } from 'react'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'
import SvgImage from '../../SvgImage'
import { iconClose } from '../../icons'
import BackButton from '../BackButton'
import useContentHeaderContext from './useContentHeaderContext'

export type ContentHeaderProps = {
  title?: React.ReactNode
  primary?: React.ReactNode
  secondary?: React.ReactNode
  divider?: React.ReactNode
  /* When a logo is given, title prop should be given too */
  logo?: React.ReactNode
  scrollY: MotionValue<number>
  noClose?: boolean
  scrolled?: boolean
  subHeader?: React.ReactNode
  titleRef?: React.RefObject<HTMLDivElement>
} & UseStyles<typeof useStyles>

const useStyles = makeStyles(
  (theme: Theme) => ({
    divider: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    sheetHeader: {
      position: 'sticky',
      top: 0,
      background: theme.palette.background.default,
      marginBottom: 32,
      paddingBottom: 2,
    },
    sheetHeaderActions: {
      display: 'grid',
      gridTemplateColumns: `1fr auto 1fr`,
      gridAutoFlow: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${responsiveVal(4, 16)} ${responsiveVal(18, 28)} ${responsiveVal(4, 16)}`,
      [theme.breakpoints.up('md')]: {
        minHeight: 72,
      },
    },
    sheetHeaderActionsLongTitle: {
      gridTemplateColumns: 'max-content 3fr 1fr',
      columnGap: 4,
    },
    sheetHeaderActionRight: {
      justifySelf: 'flex-end',
    },
    innerContainer: {
      display: 'grid',
      textAlign: 'center',
    },
    innerContainerItem: {
      gridColumn: 1,
      gridRow: 1,
      alignSelf: 'center',
      ...theme.typography.h5,
    },
    fab: {
      marginRight: -12,
      marginLeft: -12,
      [theme.breakpoints.down('sm')]: {
        boxShadow: 'none',
      },
    },
    title: {
      marginLeft: 12,
      marginRight: 12,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    logoContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      paddingTop: 20,
    },
    subLogo: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
  { name: 'ContentHeader' },
)

export default function ContentHeader(props: ContentHeaderProps) {
  const {
    title,
    logo,
    divider,
    primary = null,
    secondary = null,
    noClose,
    scrollY,
    subHeader,
    scrolled,
  } = props
  const router = usePageRouter()
  const { closeSteps, backSteps } = usePageContext()
  const classes = useStyles(props)

  const { titleRef, contentHeaderRef } = useContentHeaderContext()

  const sheetHeaderHeight = useMotionValue<number>(0)
  const titleOffset = useMotionValue<number>(100)
  const titleHeight = useMotionValue<number>(100)

  // Measure the title sizes so we can aimate the opacity
  useEffect(() => {
    if (!titleRef.current) return () => {}

    const ro = new ResizeObserver(([entry]) => {
      const { offsetTop, clientHeight } = entry.target as HTMLDivElement
      titleHeight.set(clientHeight)
      titleOffset.set(offsetTop)
    })

    ro.observe(titleRef.current)
    return () => ro.disconnect()
  }, [titleHeight, titleOffset, titleRef])

  // Measure the sheetHeight sizes so we can aimate the opacity
  useEffect(() => {
    if (!contentHeaderRef.current) return () => {}

    const ro = new ResizeObserver(([entry]) =>
      sheetHeaderHeight.set((entry.target as HTMLDivElement).clientHeight),
    )

    ro.observe(contentHeaderRef.current)
    return () => ro.disconnect()
  }, [contentHeaderRef, sheetHeaderHeight])

  const opacityFadeIn = useTransform(
    [scrollY, sheetHeaderHeight, titleOffset, titleHeight] as MotionValue[],
    ([scrollYV, sheetHeaderHeightV, titleOffsetV, titleHeigthV]: number[]) =>
      (scrollYV - titleOffsetV + sheetHeaderHeightV) / titleHeigthV,
  )
  const opacityFadeOut = useTransform(opacityFadeIn, [0, 1], [1, 0])

  const close =
    !noClose &&
    (closeSteps > 0 ? (
      <Fab
        size='small'
        type='button'
        onClick={() => router.go(closeSteps * -1)}
        classes={{ root: classes.fab }}
      >
        <SvgImage src={iconClose} alt='Close overlay' loading='eager' />
      </Fab>
    ) : (
      <PageLink href='/' passHref>
        <Fab size='small' classes={{ root: classes.fab }}>
          <SvgImage src={iconClose} alt='Close overlay' loading='eager' />
        </Fab>
      </PageLink>
    ))

  const back = (backSteps > 0 || noClose) && (
    <BackButton type='button' onClick={() => router.back()} className={classes.fab}>
      Back
    </BackButton>
  )

  let leftAction: React.ReactNode = secondary ?? back
  const rightAction: React.ReactNode = primary ?? close
  if (rightAction !== close && !leftAction) leftAction = close
  if (!leftAction) leftAction = <div />

  return (
    <div className={classes?.sheetHeader} ref={contentHeaderRef}>
      <div className={classes.logoContainer}>
        {logo && (
          <m.div
            style={{ opacity: !scrolled ? opacityFadeOut : 0 }}
            className={clsx(classes.subLogo, classes.innerContainerItem)}
          >
            {logo}
          </m.div>
        )}
      </div>

      <div className={classes?.sheetHeaderActions}>
        {leftAction && <div>{leftAction}</div>}
        <div className={classes.innerContainer}>
          {title && (
            <m.div style={{ opacity: scrolled ? 1 : opacityFadeIn }} className={classes.title}>
              {title}
            </m.div>
          )}
        </div>
        <div className={classes?.sheetHeaderActionRight}>{rightAction}</div>
      </div>
      {subHeader && <>{subHeader}</>}
      <div>
        {divider ?? (
          <m.div className={classes.divider} style={{ opacity: scrolled ? 1 : opacityFadeIn }} />
        )}
      </div>
    </div>
  )
}
