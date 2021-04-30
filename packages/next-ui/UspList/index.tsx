import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      display: 'grid',
      gap: theme.spacings.xs,
      alignContent: 'start',
    },
  }),
  { name: 'UspList' },
)

export type UspListProps = UseStyles<typeof useStyles> & {
  children: React.ReactNode
}

export default function UspList(props: UspListProps) {
  const { children } = props
  const classes = useStyles()

  return <ul className={classes.root}>{children}</ul>
}
