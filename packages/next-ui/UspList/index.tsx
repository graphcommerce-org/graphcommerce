import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
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
    },
    gap: {
      gap: theme.spacings.xs,
    },
  }),
  { name: 'UspList' },
)

export type UspListProps = UseStyles<typeof useStyles> & {
  children: React.ReactNode
  size?: string
}

export default function UspList(props: UspListProps) {
  const { children, size } = props
  const classes = useStyles()

  return <ul className={clsx(classes.root, size !== 'small' && classes.gap)}>{children}</ul>
}
