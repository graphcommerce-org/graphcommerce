import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import FullPageShellBase, { FullPageShellBaseProps } from './FullPageShellBase'

const useStyles = makeStyles(
  (theme: Theme) => ({
    header: {
      [theme.breakpoints.up('md')]: {
        minHeight: 60,
      },
    },
    '@global': {
      body: {
        '& [class*="FullPageShellBase"] > div': {
          backgroundColor: theme.palette.background.default,
        },
      },
    },
  }),
  { name: 'MinimalPageShellBase' },
)

export type MinimalPageShellBaseProps = FullPageShellBaseProps

export default function MinimalPageShellBase(props: MinimalPageShellBaseProps) {
  const classes = useStyles(props)

  return <FullPageShellBase {...props} classes={classes} />
}
