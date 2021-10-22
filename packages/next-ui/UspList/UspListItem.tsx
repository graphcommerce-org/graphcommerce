import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridAutoFlow: 'column',
      alignItems: 'center',
      gridTemplateColumns: `max-content auto`,
      gap: theme.spacings.xs,
      '& > p': {
        ...theme.typography.body2,
      },
    },
    icon: {
      width: '100%',
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      '& > * > img': {
        display: 'block',
      },
    },
    small: {
      '& > p': {
        ...theme.typography.caption,
      },
    },
  }),
  { name: 'UspListItem' },
)

export type UspListItemProps = UseStyles<typeof useStyles> & {
  text: React.ReactNode
  icon?: React.ReactNode
  size?: string
}

export default function UspListItem(props: UspListItemProps) {
  const { text, icon, size = 'normal' } = props
  const classes = useStyles()

  return (
    <li className={clsx(classes.root)}>
      <div className={classes.icon}>{icon}</div>
      <div className={clsx(size === 'small' && classes.small)}>{text}</div>
    </li>
  )
}
