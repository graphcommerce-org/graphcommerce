import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { responsiveVal } from '..'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridAutoFlow: 'column',
      alignItems: 'center',
      gridTemplateColumns: `${responsiveVal(22, 32)} auto`,
      gap: theme.spacings.xs,
      '& > p': {
        ...theme.typography.body2,
      },
    },
    icon: {
      '& > * > img': {
        display: 'block',
      },
    },
    smallCopy: {
      '& > p': {
        ...theme.typography.caption,
      },
    },
    smallIcons: {
      gridTemplateColumns: `${responsiveVal(10, 14)} auto`,
      gap: theme.spacings.xxs,
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
    <li className={clsx(classes.root, size === 'small' && classes.smallIcons)}>
      <div className={classes.icon}>{icon}</div>
      <div className={clsx(size === 'small' && classes.smallCopy)}>{text}</div>
    </li>
  )
}
