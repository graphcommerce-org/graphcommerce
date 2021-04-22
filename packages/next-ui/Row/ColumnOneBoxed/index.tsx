import { Container, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { ColumnOneProps } from '../ColumnOne'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginBottom: theme.spacings.lg,
    },
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

export type ColumnOneBoxedProps = ColumnOneProps

export default function ColumnOneBoxed(props: ColumnOneBoxedProps) {
  const { children } = props
  const classes = useStyles(props)

  return (
    <Container {...props} className={classes.root}>
      <div className={classes.boxed}>{children}</div>
    </Container>
  )
}
