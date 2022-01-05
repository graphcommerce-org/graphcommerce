import { ContainerProps } from '@mui/material'
import React from 'react'
import Row from '..'
import { makeStyles, useMergedClasses } from '../../Styles/tssReact'

const useStyles = makeStyles({ name: 'ColumnOneBoxed' })((theme) => ({
  boxed: {
    padding: theme.spacings.lg,
    boxShadow: theme.shadows[24],
    '& h1, & h2, & h3': {
      marginTop: 0,
    },
  },
}))

export default function ColumnOneBoxed(props: ContainerProps) {
  const { children } = props
  const { classes } = useStyles()

  return (
    <Row {...props}>
      <div className={classes.boxed}>{children}</div>
    </Row>
  )
}
