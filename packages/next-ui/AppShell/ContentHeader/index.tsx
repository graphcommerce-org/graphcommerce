import { Container, Fab, makeStyles, Theme } from '@material-ui/core'
import { usePageContext, usePageRouter } from '@reachdigital/framer-next-pages'
import clsx from 'clsx'
import { m, MotionValue, useTransform } from 'framer-motion'
import PageLink from 'next/link'
import React from 'react'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'
import SvgImage from '../../SvgImage'
import { iconClose } from '../../icons'
import BackButton from '../BackButton'

export type ContentHeaderProps = {
  title?: React.ReactNode
  primary?: React.ReactNode
  secondary?: React.ReactNode
  divider?: React.ReactNode
  /* When a logo is given, title prop should be given too */
  logo?: React.ReactNode
  animateStart?: number
  yPos: MotionValue<number>
  noClose?: boolean
  scrolled?: boolean
  subHeader?: React.ReactNode
  billBoard?: React.ReactNode
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
      gridTemplateColumns: `1fr 4fr 1fr`, // o.b.v. resizeobserver dit aan/uit zetten (dirty)
      gridAutoFlow: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `
        ${responsiveVal(2, 6)}
        ${responsiveVal(14, 28)}
        ${responsiveVal(4, 12)} 
        ${responsiveVal(14, 28)}
      `,
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
      [theme.breakpoints.down('sm')]: {
        boxShadow: 'none',
      },
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
  { name: 'ContentHeader' },
)

/**
 * Render a Sheet compatible header that: *
 *
 * - Close the overlay if there is a previous page present
 *
 *   - Fallback to `{ backFallbackHref: string}`
 * - Render a Back button if there is a page to go back to
 *
 *   - Fallback to `{ backFallbackHref: string}`
 * - Render the primary action as a pill on desktop
 * - Render the primary action as text on mobile
 * - Render the back action as FAB on desktop
 * - Render the back action as Arrow on mobile
 * - Render the secondary action as Pill on desktop
 * - Render the secondary action as Text on desktop?
 *
 * Questions:
 *
 * - How does the secondary corespond to the back action, do we have secondary actions or can those be removed?
 *
 * @param props
 * @returns
 */
export default function ContentHeader(props: ContentHeaderProps) {
  const {
    title,
    logo,
    divider,
    primary = null,
    secondary = null,
    noClose,
    animateStart = 20,
    yPos,
    subHeader,
    scrolled,
    billBoard,
  } = props
  const router = usePageRouter()
  const { closeSteps, backSteps } = usePageContext()
  const classes = useStyles(props)

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

  const opacityFadeOut = useTransform(yPos, [animateStart, animateStart + 20], [1, 0])
  const opacityFadeIn = useTransform(yPos, [animateStart, animateStart + 20], [0, 1])

  const divide = divider ?? (
    <m.div className={classes.divider} style={{ opacity: scrolled ? 1 : opacityFadeIn }} />
  )

  return (
    <div className={classes?.sheetHeader}>
      <div className={classes?.sheetHeaderActions}>
        {leftAction && <div>{leftAction}</div>}
        <div className={classes.innerContainer}>
          {logo && (
            <m.div
              style={{ opacity: !scrolled ? opacityFadeOut : 0 }}
              className={classes.innerContainerItem}
            >
              {logo}
            </m.div>
          )}
          {title && (
            <m.div
              style={{ opacity: scrolled ? 1 : opacityFadeIn }}
              className={clsx(classes.innerContainerItem, classes.title)}
            >
              {title}
            </m.div>
          )}
        </div>
        <div className={classes?.sheetHeaderActionRight}>{rightAction}</div>
      </div>
      {subHeader && <Container maxWidth={false}>{subHeader}</Container>}
      <div>{divide}</div>
      {billBoard && <div>{billBoard}</div>}
    </div>
  )
}
