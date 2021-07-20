import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import responsiveVal from '../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridAutoFlow: 'column',
      justifyItems: 'start',
      maxWidth: 'max-content',
      alignItems: 'center',
    },
    gap: {
      gap: theme.spacings.xs,
    },
    smallText: {
      '& > p': {
        ...theme.typography.body2,
        marginLeft: 5,
      },
    },
    normalText: {
      ...theme.typography.body1,
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
    <li className={clsx(classes.root, size === 'normal' && classes.gap)}>
      <div>{icon}</div>
      <span className={clsx(size === 'small' ? classes.smallText : classes.normalText)}>
        {text}
      </span>
    </li>
  )
}
