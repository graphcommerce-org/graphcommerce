import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import { classesPicker } from '../../Styles/classesPicker'
import LayoutHeaderBack, { useShowBack } from './LayoutHeaderBack'
import LayoutHeaderClose, { useShowClose } from './LayoutHeaderClose'
import LayoutHeaderContent, { ContentProps } from './LayoutHeaderContent'
import { FloatingProps } from './LayoutHeadertypes'

export type LayoutHeaderProps = FloatingProps &
  Omit<ContentProps, 'left' | 'right'> & {
    /**
     * Button to display on the left side of the title
     *
     * - Assumes it can float on desktop
     * - Assumes it can not float on mobile
     */
    primary?: React.ReactNode
    /**
     * Button to display on the right side of the title
     *
     * - Assumes it can float on desktop
     * - Assumes it can not float on mobile
     */
    secondary?: React.ReactNode

    noAlign?: boolean
  }

const useStyles = makeStyles(
  (theme: Theme) => ({
    sticky: {
      zIndex: theme.zIndex.appBar,
      position: 'sticky',
      pointerEvents: 'none',

      [theme.breakpoints.up('md')]: {
        top: 0,
        height: theme.appShell.appBarHeightMd,
        marginTop: `calc((${theme.appShell.appBarHeightMd} - ${theme.appShell.appBarInnerHeightMd}) * -0.5)`,
        marginBottom: `calc(${theme.appShell.appBarHeightMd} * -1 - calc((${theme.appShell.appBarHeightMd} - ${theme.appShell.appBarInnerHeightMd}) * -0.5))`,
      },
    },
    stickyNoChildren: {
      zIndex: theme.zIndex.appBar - 2,
    },
    stickyVisibleSm: {
      [theme.breakpoints.down('lg')]: {
        top: 0,
        marginTop: `calc(${theme.appShell.headerHeightSm} * -1)`,
        height: theme.appShell.headerHeightSm,
      },
    },
    stickyFloatingSm: {
      [theme.breakpoints.down('lg')]: {
        top: 0,
        marginTop: `calc(${theme.appShell.headerHeightSm} * -1)`,
        height: theme.appShell.headerHeightSm,
      },
    },
    stickyFloatingMd: {
      [theme.breakpoints.up('md')]: {
        top: `calc(${theme.appShell.headerHeightMd} + calc((${theme.appShell.appBarHeightMd} - ${theme.appShell.appBarInnerHeightMd}) * -0.5))`,
      },
    },
    stickyNoAlign: {
      [theme.breakpoints.down('lg')]: {
        position: 'sticky',
        left: 0,
        right: 0,
        top: 0,
        marginTop: 0,
        height: theme.appShell.headerHeightSm,
        marginBottom: `calc(${theme.appShell.headerHeightSm} * -1)`,
      },
      [theme.breakpoints.up('md')]: {
        position: 'sticky',
        left: 0,
        right: 0,
        top: 0,
        marginTop: 0,
        height: theme.appShell.appBarHeightMd,
        marginBottom: `calc(${theme.appShell.appBarHeightMd} * -1)`,
      },
    },
    stickyDivider: {
      [theme.breakpoints.down('lg')]: {
        marginBottom: 0,
      },
      [theme.breakpoints.up('md')]: {
        marginBottom: 0,
      },
    },
  }),
  { name: 'LayoutHeader' },
)

export function LayoutHeader(props: LayoutHeaderProps) {
  const { children, divider, primary, secondary, noAlign, switchPoint } = props
  const classes = useStyles(props)
  const showBack = useShowBack()
  const showClose = useShowClose()

  const floatFallback = !children
  let { floatingSm = false, floatingMd = floatFallback } = props

  if (divider) floatingMd = false

  // When the primary or secondary is set, the header can't float on mobile even if the prop is passed.
  if (divider || primary || secondary) floatingSm = false

  const close = showClose && <LayoutHeaderClose />
  const back = showBack && <LayoutHeaderBack variant={floatingSm ? 'pill' : 'pill-link'} />

  let left = secondary
  let right = primary

  if (back) left = back

  if (!right) right = close
  else if (!left) left = close

  if (!left && !right && !children) return null

  const className = classesPicker(classes, {
    floatingSm,
    floatingMd,
    visibleSm: !floatingSm,
    visibleMd: !floatingMd,
    noChildren: !children,
    noAlign,
    divider: !!divider,
  })

  return (
    <div {...className('sticky')}>
      <LayoutHeaderContent
        left={left}
        right={right}
        divider={divider}
        floatingMd={floatingMd}
        floatingSm={floatingSm}
        switchPoint={switchPoint}
      >
        {children}
      </LayoutHeaderContent>
    </div>
  )
}
