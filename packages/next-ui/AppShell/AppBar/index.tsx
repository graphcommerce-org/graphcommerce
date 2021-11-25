import { makeStyles, Theme } from '@material-ui/core'
import { useViewportScroll } from 'framer-motion'
import React from 'react'
import { classesPicker } from '../../Styles/classesPicker'
import Back, { useShowBack } from './Back'
import Close, { useShowClose } from './Close'
import Content, { ContentProps } from './Content'
import { FloatingProps } from './types'

type WrappedContent = Omit<ContentProps, 'leftAction' | 'rightAction'> & {
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
}

type AppBarBaseProps = FloatingProps & WrappedContent

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
  }),
  { name: 'AppBar' },
)

export default function AppBarBase(props: AppBarBaseProps) {
  const { children, additional, divider, primary, secondary, scrollY } = props
  const classes = useStyles(props)
  const showClose = useShowClose()
  const showBack = useShowBack()

  const floatFallback = !children
  let { floatingSm = false, floatingMd = floatFallback } = props

  if (divider) floatingMd = false

  // When the primary or secondary is set, the header can't float on mobile even if the prop is passed.
  if (divider || primary || secondary) floatingSm = false

  const close = <Close />
  const back = <Back variant={floatingSm ? 'pill' : 'pill-link'} />

  let left: React.ReactNode = secondary ?? (showBack && back)
  const right: React.ReactNode = primary ?? (showClose && close)
  if (right !== (showClose && close) && !left) left = close

  if (!left && !right && !children) return null

  const className = classesPicker(classes, {
    floatingSm,
    floatingMd,
    visibleSm: !floatingSm,
    visibleMd: !floatingMd,
    noChildren: !children,
  })

  return (
    <div {...className('sticky')}>
      <Content
        scrollY={scrollY}
        left={left}
        right={right}
        divider={divider}
        floatingMd={floatingMd}
        floatingSm={floatingSm}
      >
        {children}
        {additional}
      </Content>
    </div>
  )
}

export type AppBarProps = Omit<AppBarBaseProps, 'scrollY'>

export function AppBar(props: AppBarProps) {
  return <AppBarBase {...props} scrollY={useViewportScroll().scrollY} />
}
