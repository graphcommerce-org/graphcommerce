import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import FullPageShellBase, { FullPageShellBaseProps } from './FullPageShellBase'

const useStyles = makeStyles(
  (theme: Theme) => ({
    header: {
      [theme.breakpoints.up('md')]: {
        minHeight: 60,
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
