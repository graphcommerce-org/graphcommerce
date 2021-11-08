import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      display: 'grid',
      alignContent: 'start',
      rowGap: theme.spacings.xs,
    },
    small: {
      rowGap: 3,
    },
  }),
  { name: 'UspList' },
)

export type UspListProps = UseStyles<typeof useStyles> & {
  children: React.ReactNode
  size?: 'normal' | 'small'
}

export default function UspList(props: UspListProps) {
  const { children, size } = props
  const classes = useStyles()

  return <ul className={clsx(classes.root, size === 'small' && classes.small)}>{children}</ul>
}
