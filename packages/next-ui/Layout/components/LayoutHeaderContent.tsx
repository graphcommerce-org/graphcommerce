import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { Divider, Theme } from '@mui/material'
import { makeStyles } from '../../Styles/tssReact'
import React, { useRef } from 'react'
import { UseStyles } from '../../Styles'
import { classesPicker } from '../../Styles/classesPicker'
import { useScrollY } from '../hooks/useScrollY'
import { FloatingProps } from './LayoutHeadertypes'

type Classes = 'bg' | 'content' | 'left' | 'center' | 'right' | 'divider'

const time = '150ms'

const useStyles = makeStyles()(
  (theme: Theme) => ({
    bg: {
      position: 'absolute',
      left: 0,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
      opacity: 0,
      transition: `opacity ${time}`,

      height: theme.appShell.headerHeightSm,
      [theme.breakpoints.up('md')]: {
        height: theme.appShell.appBarHeightMd,
      },
      borderTopLeftRadius: theme.shape.borderRadius * 3,
      borderTopRightRadius: theme.shape.borderRadius * 3,
    },
    bgDivider: {
      boxShadow: 'unset',
    },
    bgFloatingSm: {
      [theme.breakpoints.down('lg')]: {
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
      // columnGap: theme.spacings.xs,

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
      [theme.breakpoints.down('lg')]: {
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
      '& > *': { pointerEvents: 'all' },
    },
    centerFloatingSm: {
      [theme.breakpoints.down('lg')]: {
        display: 'none',
      },
    },
    centerFloatingMd: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    right: {
      '& > *': {
        pointerEvents: 'all',
        width: 'min-content',
      },
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
    },
    dividerFloatingSm: {
      [theme.breakpoints.down('lg')]: {
        display: 'none',
      },
    },
    dividerFloatingMd: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
  { name: 'LayoutHeaderContent' },
)

export type ContentProps = FloatingProps &
  UseStyles<typeof useStyles> & {
    children?: React.ReactNode
    left?: React.ReactNode
    right?: React.ReactNode
    divider?: React.ReactNode
    switchPoint?: number
  }

export default function LayoutHeaderContent(props: ContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = useScrollY()

  const {
    left,
    children,
    right,
    divider,
    floatingMd = false,
    floatingSm = false,
    switchPoint = 50,
  } = props
  const { classes } = useStyles(props)

  const scrolled = useMotionValueValue(scroll, (y) => y >= switchPoint)

  const className = classesPicker<Classes>(classes, {
    floatingSm,
    floatingMd,
    scrolled,
    divider: !!divider,
  })

  return (
    <>
      <div {...className('bg')} />
      <div {...className('content')} ref={ref}>
        {left && <div {...className('left')}>{left}</div>}
        <div {...className('center')}>{children}</div>
        <div {...className('right')}>{right}</div>
        {divider && <div {...className('divider')}>{divider}</div>}
      </div>
    </>
  )
}
