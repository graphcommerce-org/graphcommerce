import { ContainerProps, Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'
import Row from '..'

const useStyles = makeStyles(
  (theme: Theme) => ({
    boxed: {
      padding: theme.spacings.lg,
      boxShadow: theme.shadows[24],
      '& h1, & h2, & h3': {
        marginTop: 0,
      },
    },
  }),
  { name: 'ColumnOneBoxed' },
)

export default function ColumnOneBoxed(props: ContainerProps) {
  const { children } = props
  const classes = useStyles(props)

  return (
    <Row {...props}>
      <div className={classes.boxed}>{children}</div>
    </Row>
  )
}
