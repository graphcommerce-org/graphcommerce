import { makeStyles, Theme } from '@material-ui/core'
import { m } from 'framer-motion'
import React from 'react'
import { UseStyles } from '../Styles'
import AppShellProvider from './AppShellProvider'
import ShellBase, { PageLayoutBaseProps } from './ShellBase'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      background: '#fff',
      minHeight: '100vh',
      display: 'grid',
      gridTemplateRows: `auto 1fr auto`,
      gridTemplateColumns: '100%',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        padding: `${theme.spacings.xxs} ${theme.page.horizontal} 0`,
        top: 0,
        display: 'flex',
        pointerEvents: 'none',
        justifyContent: 'left',
        width: '100%',
        height: theme.page.headerInnerHeight.md,
      },
    },
  }),
  { name: 'FullPageShellBase' },
)

export type FullPageShellBaseProps = {
  header: React.ReactNode
  footer: React.ReactNode
  children?: React.ReactNode
  backFallbackHref?: string | null
  backFallbackTitle?: string | null
} & UseStyles<typeof useStyles> &
  PageLayoutBaseProps

export default function FullPageShellBase(props: FullPageShellBaseProps) {
  const { children, header, footer, name } = props
  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <AppShellProvider>
        <ShellBase name={name}>
          <m.header
            className={classes.header}
            layoutId='header'
            transition={{ type: 'tween' }}
            layout='position'
          >
            {header}
          </m.header>
          <div>{children}</div>
          <div>{footer}</div>
        </ShellBase>
      </AppShellProvider>
    </div>
  )
}
