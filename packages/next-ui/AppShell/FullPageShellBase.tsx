import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import AppShellProvider from './AppShellProvider'
import ShellBase, { PageLayoutBaseProps } from './ShellBase'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      // background: theme.palette.background.default,
      minHeight: '100vh',
      display: 'grid',
      gridTemplateRows: `auto 1fr auto`,
      gridTemplateColumns: '100%',
    },
    hideFabsOnVirtualKeyboardOpen: {
      [theme.breakpoints.down('sm')]: {
        '@media (max-height: 530px)': {
          display: 'none',
        },
      },
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        padding: `${theme.spacings.xxs} ${theme.page.horizontal} 0`,
        marginBottom: theme.spacings.xxs,
        top: 0,
        display: 'flex',
        pointerEvents: 'none',
        justifyContent: 'left',
        width: '100%',
        height: theme.page.headerInnerHeight.md,
      },
    },
    headerAlwaysShow: {
      [theme.breakpoints.down('sm')]: {
        marginTop: 20,
        marginBottom: 22,
      },
    },
  }),
  { name: 'FullPageShellBase' },
)

export type FullPageShellBaseProps = {
  header: React.ReactNode
  footer: React.ReactNode
  menuFab?: React.ReactNode
  cartFab?: React.ReactNode
  children?: React.ReactNode
  alwaysShowHeader?: boolean
} & UseStyles<typeof useStyles> &
  PageLayoutBaseProps

export default function FullPageShellBase(props: FullPageShellBaseProps) {
  const { children, header, footer, menuFab, cartFab, name, alwaysShowHeader } = props
  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <AppShellProvider>
        <ShellBase name={name}>
          <header className={clsx(classes.header, alwaysShowHeader && classes.headerAlwaysShow)}>
            {header}
          </header>
          <div>
            <div className={classes.hideFabsOnVirtualKeyboardOpen}>
              {menuFab}
              {cartFab}
            </div>
            {children}
          </div>
          <div>{footer}</div>
        </ShellBase>
      </AppShellProvider>
    </div>
  )
}
