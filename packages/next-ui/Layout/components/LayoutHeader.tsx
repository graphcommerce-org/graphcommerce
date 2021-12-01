import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { classesPicker } from '../../Styles/classesPicker'
import LayoutHeaderBack, { useShowBack } from './LayoutHeaderBack'
import LayoutHeaderClose from './LayoutHeaderClose'
import LayoutHeaderContent, { ContentProps } from './LayoutHeaderContent'
import { FloatingProps } from './LayoutHeadertypes'

export type LayoutHeaderProps = FloatingProps &
  Omit<ContentProps, 'leftAction' | 'rightAction'> & {
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

    additional?: React.ReactNode

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
      [theme.breakpoints.down('sm')]: {
        top: 0,
        marginTop: `calc(${theme.appShell.headerHeightSm} * -1)`,
        height: theme.appShell.headerHeightSm,
      },
    },
    stickyFloatingSm: {
      [theme.breakpoints.down('sm')]: {},
    },
    stickyFloatingMd: {
      [theme.breakpoints.up('md')]: {
        top: `calc(${theme.appShell.headerHeightMd} + calc((${theme.appShell.appBarHeightMd} - ${theme.appShell.appBarInnerHeightMd}) * -0.5))`,
      },
    },
    stickyNoAlign: {
      [theme.breakpoints.down('sm')]: {
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
  }),
  { name: 'LayoutHeader' },
)

export function LayoutHeader(props: LayoutHeaderProps) {
  const { children, additional, divider, primary, secondary, noAlign } = props
  const classes = useStyles(props)
  const showBack = useShowBack()

  const floatFallback = !children
  let { floatingSm = false, floatingMd = floatFallback } = props

  if (divider) floatingMd = false

  // When the primary or secondary is set, the header can't float on mobile even if the prop is passed.
  if (divider || primary || secondary) floatingSm = false

  const close = <LayoutHeaderClose />
  const back = showBack && <LayoutHeaderBack variant={floatingSm ? 'pill' : 'pill-link'} />

  let left = secondary
  let right = primary

  if (back) left = back

  if (!left) left = close
  else if (!right) right = close

  if (!left && !right && !children) return null

  const className = classesPicker(classes, {
    floatingSm,
    floatingMd,
    visibleSm: !floatingSm,
    visibleMd: !floatingMd,
    noChildren: !children,
    noAlign,
  })

  return (
    <div {...className('sticky')}>
      <LayoutHeaderContent
        left={left}
        right={right}
        divider={divider}
        floatingMd={floatingMd}
        floatingSm={floatingSm}
      >
        {children}
        {additional}
      </LayoutHeaderContent>
    </div>
  )
}
