import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import { responsiveVal } from '../Styles/responsiveVal'
import { makeStyles, typography, useMergedClasses } from '../Styles/tssReact'

const useStyles = makeStyles({ name: 'UspListItem' })((theme) => ({
  root: {
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    gridTemplateColumns: `${responsiveVal(32, 38)} auto`,
    gap: theme.spacings.xs,
    '& > p': {
      ...typography(theme, 'body2'),
    },
  },
  icon: {
    display: 'flex',

    '& > * > img': {
      display: 'block',
    },
  },
  smallCopy: {
    '& > p': {
      ...typography(theme, 'body2'),
    },
  },
  smallIcons: {
    gridTemplateColumns: `${responsiveVal(10, 14)} auto`,
    gap: theme.spacings.xxs,
  },
}))

export type UspListItemProps = UseStyles<typeof useStyles> & {
  text: React.ReactNode
  icon?: React.ReactNode
  size?: string
}

export default function UspListItem(props: UspListItemProps) {
  const { text, icon, size = 'normal' } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return (
    <li className={clsx(classes.root, size === 'small' && classes.smallIcons)}>
      <div className={classes.icon}>{icon}</div>
      <div className={clsx(size === 'small' && classes.smallCopy)}>{text}</div>
    </li>
  )
}
