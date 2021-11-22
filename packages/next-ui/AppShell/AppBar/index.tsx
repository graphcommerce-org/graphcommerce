import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import Close from './Close'
import Back from './Back'
import Content, { ContentProps } from './Content'
import { FloatingProps } from './types'
import { classesPicker } from '../../Styles/classesPicker'
import { useViewportScroll } from 'framer-motion'
import { useSheetContext } from '@graphcommerce/framer-sheet'
import { useElementScroll } from '@graphcommerce/framer-utils'

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
}

type AppBarBaseProps = FloatingProps & WrappedContent

const useStyles = makeStyles(
  (theme: Theme) => ({
    sticky: {
      zIndex: theme.zIndex.appBar,
      position: 'sticky',
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
    stickyVisibleMd: {
      [theme.breakpoints.up('md')]: {
        top: 0,
        height: theme.appShell.appBarHeightMd,
        marginTop: `calc(${theme.appShell.appBarInnerHeightMd} * -1)`,

        // Offset height and marginTop
        marginBottom: `calc((${theme.appShell.appBarHeightMd} - ${theme.appShell.appBarInnerHeightMd}) * -1)`,
      },
    },
    stickyFloatingSm: {
      [theme.breakpoints.down('sm')]: {},
    },
    stickyFloatingMd: {
      [theme.breakpoints.up('md')]: {
        top: `calc(${theme.appShell.headerHeightMd} + calc((${theme.appShell.appBarHeightMd} - ${theme.appShell.appBarInnerHeightMd}) * -0.5))`,
        height: theme.appShell.appBarHeightMd,
        marginTop: `calc((${theme.appShell.appBarHeightMd} - ${theme.appShell.appBarInnerHeightMd}) * -0.5)`,

        // Offset height and marginTop
        marginBottom: `calc(${theme.appShell.appBarHeightMd} * -1 - calc((${theme.appShell.appBarHeightMd} - ${theme.appShell.appBarInnerHeightMd}) * -0.5))`,
      },
    },
  }),
  { name: 'AppBar' },
)

export default function AppBarBase(props: AppBarBaseProps) {
  const { children, divider, primary, secondary, scrollY } = props
  const classes = useStyles(props)

  const floatFallback = !children
  let { floatingSm = false, floatingMd = floatFallback } = props

  if (divider) floatingMd = false

  // When the primary or secondary is set, the header can't float on mobile even if the prop is passed.
  if (divider || primary || secondary) floatingSm = false

  const close = <Close />
  const back = <Back variant={floatingSm ? 'pill' : 'pill-link'} />
  let left: React.ReactNode = secondary ?? back
  const right: React.ReactNode = primary ?? close
  if (right !== close && !left) left = close

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
      </Content>
    </div>
  )
}

export type AppBarProps = Omit<AppBarBaseProps, 'scrollY'>

export function AppBar(props: AppBarProps) {
  return <AppBarBase {...props} scrollY={useViewportScroll().scrollY} />
}

export function SheetAppbar(props: AppBarProps) {
  return <AppBarBase {...props} scrollY={useElementScroll(useSheetContext().contentRef).y} />
}
