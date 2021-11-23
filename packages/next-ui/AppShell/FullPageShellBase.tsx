import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import AppShellProvider from './AppShellProvider'
import ShellBase, { PageLayoutBaseProps } from './ShellBase'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      minHeight: '100vh',
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

export type FullPageShellBaseProps = {
  header: React.ReactNode
  footer: React.ReactNode
  menuFab?: React.ReactNode
  cartFab?: React.ReactNode
  children?: React.ReactNode
} & UseStyles<typeof useStyles>

export default function FullPageShellBase(props: FullPageShellBaseProps) {
  const { children, header, footer, menuFab, cartFab } = props
  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <AppShellProvider>
        <header className={classes.header}>{header}</header>
        <div>
          <div className={classes.hideFabsOnVirtualKeyboardOpen}>
            {menuFab}
            {cartFab}
          </div>
          {children}
        </div>
        <div>{footer}</div>
      </AppShellProvider>
    </div>
  )
}
