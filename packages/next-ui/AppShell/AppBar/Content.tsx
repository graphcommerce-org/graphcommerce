import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { Divider, makeStyles, Theme } from '@material-ui/core'
import { MotionValue, useViewportScroll } from 'framer-motion'
import React, { useRef } from 'react'
import { UseStyles } from '../..'
import { classesPicker } from '../../Styles/classesPicker'
import { FloatingProps } from './types'
import useAppShellHeaderContext from './useAppShellHeaderContext'

type Classes = 'bg' | 'content' | 'left' | 'center' | 'right' | 'divider'

const time = '150ms'

const useStyles = makeStyles(
  (theme: Theme) => ({
    bg: {
      position: 'absolute',
      left: 0,
      width: '100%',
      backgroundColor: theme.palette.background.default,
      opacity: 0,
      transition: `opacity ${time}`,

      height: theme.appShell.headerHeightSm,
      [theme.breakpoints.up('md')]: {
        height: theme.appShell.appBarHeightMd,
      },
    },
    bgFloatingSm: {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    bgFloatingMd: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    bgScrolled: {
      opacity: 1,
    },
    content: {
      position: 'absolute',
      left: 0,
      width: '100%',
      display: 'grid',
      gridTemplateAreas: `"left center right"`,
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',

      height: theme.appShell.headerHeightSm,
      [theme.breakpoints.up('md')]: {
        padding: `0 ${theme.page.horizontal}`,
        height: theme.appShell.appBarHeightMd,
      },
    },
    contentFloatingMd: {
      [theme.breakpoints.up('md')]: {
        padding: `0 ${theme.page.horizontal}`,
        background: 'none',
        pointerEvents: 'none',
      },
    },
    contentFloatingSm: {
      [theme.breakpoints.down('sm')]: {
        padding: `0 ${theme.page.horizontal}`,
        background: 'none',
        pointerEvents: 'none',
      },
    },
    left: {
      '& > *': { pointerEvents: 'all' },
      display: 'grid',
      gridAutoFlow: 'column',
      gap: theme.spacings.sm,
      gridArea: 'left',
      justifyContent: 'start',
    },
    center: {
      '& > *': { pointerEvents: 'all' },
      display: 'grid',
      gridAutoFlow: 'column',
      gap: theme.spacings.sm,
      gridArea: 'center',
      justifyContent: 'start',
      overflow: 'hidden',
      transition: `opacity ${time}`,
      opacity: 0,
    },
    centerScrolled: {
      opacity: 1,
    },
    centerFloatingSm: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    centerFloatingMd: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    right: {
      '& > *': { pointerEvents: 'all' },
      display: 'grid',
      gridAutoFlow: 'column',
      gap: theme.spacings.sm,
      gridArea: 'right',
      justifyContent: 'end',
    },
    divider: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      transition: `opacity ${time}`,
      opacity: 0,
    },
    dividerCustomDivider: {
      opacity: 1,
    },
    dividerScrolled: {
      opacity: 1,
    },
    dividerFloatingSm: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    dividerFloatingMd: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
  { name: 'Content' },
)

export type ContentProps = FloatingProps &
  UseStyles<typeof useStyles> & {
    children?: React.ReactNode
    left?: React.ReactNode
    right?: React.ReactNode
    divider?: React.ReactNode
  }

export default function Content(props: ContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scroll } = useAppShellHeaderContext()

  const { left, children, right, divider, floatingMd = false, floatingSm = false } = props
  const classes = useStyles(props)

  const scrolled = useMotionValueValue(scroll, (y) => y > 50)

  const className = classesPicker<Classes>(classes, {
    floatingSm,
    floatingMd,
    scrolled,
    customDivider: !!divider,
  })

  return (
    <>
      <div {...className('bg')} />
      <div {...className('content')} ref={ref}>
        <div {...className('left')}>{left}</div>
        <div {...className('center')}>{children}</div>
        <div {...className('right')}>{right}</div>
        <div {...className('divider')}>{divider ?? <Divider />}</div>
      </div>
    </>
  )
}
