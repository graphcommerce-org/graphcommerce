import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridAutoFlow: 'column',
      justifyItems: 'start',
      maxWidth: 'max-content',
      alignItems: 'center',
      gap: theme.spacings.xs,
      ...theme.typography.body1,
    },
    icon: {
      width: 38,
      height: 38,
    },
  }),
  { name: 'UspListItem' },
)

export type UspListItemProps = UseStyles<typeof useStyles> & {
  title: React.ReactNode
  icon?: React.ReactNode
}

export default function UspListItem(props: UspListItemProps) {
  const { title, icon } = props
  const classes = useStyles()

  return (
    <li className={classes.root}>
      <div className={classes.icon}>{icon}</div>
      {title}
    </li>
  )
}
