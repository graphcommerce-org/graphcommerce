import { Container, ContainerProps, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      maxWidth: 820,
      marginBottom: theme.spacings.lg,
    },
  }),
  { name: 'ColumnOne' },
)

export type ColumnOneStyles = UseStyles<typeof useStyles>

export type ColumnOneProps = ColumnOneStyles &
  Omit<ContainerProps, 'children'> & {
    children: React.ReactNode
  }

export default function ColumnOne(props: ColumnOneProps) {
  const { children } = props
  const classes = useStyles(props)

  return (
    <Container maxWidth='md' {...props} className={classes.root}>
      <div>{children}</div>
    </Container>
  )
}
