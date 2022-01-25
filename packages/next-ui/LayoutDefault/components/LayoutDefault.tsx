import { useScrollOffset } from '@graphcommerce/framer-next-pages'
import { makeStyles, Theme } from '@material-ui/core'
import zIndex from '@material-ui/core/styles/zIndex'
import clsx from 'clsx'
import { useTransform, useViewportScroll } from 'framer-motion'
import React from 'react'
import { callbackify } from 'util'
import LayoutProvider from '../../Layout/components/LayoutProvider'
import { responsiveVal, UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      minHeight: '100vh',
      '@supports (-webkit-touch-callout: none)': {
        minHeight: '-webkit-fill-available',
      },
      display: 'grid',
      gridTemplateRows: `auto 1fr auto`,
      gridTemplateColumns: '100%',
      background: theme.palette.background.default,
    },
    hideFabsOnVirtualKeyboardOpen: {
      width: '100%',
      height: 0,
      zIndex: 1,
      [theme.breakpoints.up('sm')]: {
        padding: `0 ${theme.page.horizontal}`,
        position: 'sticky',
        marginTop: `calc(${theme.appShell.headerHeightMd} * -1 + calc(${responsiveVal(
          42,
          56,
        )} / 2))`,
        top: `calc(${theme.appShell.headerHeightMd} / 2 - 28px)`,
      },
      [theme.breakpoints.down('sm')]: {
        position: 'fixed',
        top: 'unset',
        bottom: `calc(20px + ${responsiveVal(42, 56)})`,
        padding: `0 20px`,
        '@media (max-height: 530px)': {
          display: 'none',
        },
      },
    },
    header: {
      zIndex: theme.zIndex.appBar - 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.appShell.headerHeightSm,
      pointerEvents: 'none',
      '& > *': {
        pointerEvents: 'all',
      },
      [theme.breakpoints.up('md')]: {
        height: theme.appShell.headerHeightMd,
        padding: `0 ${theme.page.horizontal} 0`,
        top: 0,
        display: 'flex',
        justifyContent: 'left',
        width: '100%',
      },
    },
    headerSticky: {
      [theme.breakpoints.down('sm')]: {
        position: 'sticky',
        top: 0,
      },
    },
  }),
  { name: 'LayoutDefault' },
)

export type LayoutDefaultProps = {
  className?: string
  beforeHeader?: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
  menuFab?: React.ReactNode
  cartFab?: React.ReactNode
  children?: React.ReactNode
  noSticky?: boolean
} & UseStyles<typeof useStyles>

export function LayoutDefault(props: LayoutDefaultProps) {
  const { children, header, beforeHeader, footer, menuFab, cartFab, noSticky, className } = props
  const classes = useStyles(props)

  const offset = useScrollOffset().y
  const scrollWithOffset = useTransform(useViewportScroll().scrollY, (y) => y + offset)

  return (
    <div className={clsx(classes.root, className)}>
      <LayoutProvider scroll={scrollWithOffset}>
        {beforeHeader}
        <header className={clsx(classes.header, !noSticky && classes.headerSticky)}>
          {header}
        </header>
        <div className={classes.hideFabsOnVirtualKeyboardOpen}>
          {menuFab}
          {cartFab}
        </div>
        <div>{children}</div>
        <div>{footer}</div>
      </LayoutProvider>
    </div>
  )
}
