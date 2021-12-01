import { usePageContext, useScrollOffset } from '@graphcommerce/framer-next-pages'
import { scrollPos } from '@graphcommerce/framer-next-pages/components/Page'
import { makeStyles, Theme } from '@material-ui/core'
import { useTransform, useViewportScroll } from 'framer-motion'
import React from 'react'
import LayoutProvider from '../../Layout/components/LayoutProvider'
import { UseStyles } from '../../Styles'

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
      [theme.breakpoints.down('sm')]: {
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
      [theme.breakpoints.down('sm')]: {
        position: 'sticky',
        top: 0,
      },
      [theme.breakpoints.up('md')]: {
        height: theme.appShell.headerHeightMd,
        padding: `0 ${theme.page.horizontal} 0`,
        top: 0,
        display: 'flex',
        pointerEvents: 'none',
        justifyContent: 'left',
        width: '100%',
      },
    },
  }),
  { name: 'FullPageShellBase' },
)

export type LayoutDefaultProps = {
  header: React.ReactNode
  footer: React.ReactNode
  menuFab?: React.ReactNode
  cartFab?: React.ReactNode
  children?: React.ReactNode
} & UseStyles<typeof useStyles>

export function LayoutDefault(props: LayoutDefaultProps) {
  const { children, header, footer, menuFab, cartFab } = props
  const classes = useStyles(props)

  const offset = useScrollOffset().y
  const scrollWithOffset = useTransform(useViewportScroll().scrollY, (y) => y + offset)

  return (
    <div className={classes.root}>
      <LayoutProvider scroll={scrollWithOffset}>
        <header className={classes.header}>{header}</header>
        <div>
          <div className={classes.hideFabsOnVirtualKeyboardOpen}>
            {menuFab}
            {cartFab}
          </div>
          {children}
        </div>
        <div>{footer}</div>
      </LayoutProvider>
    </div>
  )
}
