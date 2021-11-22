import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import Row from '../Row'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    head: {
      display: 'grid',
      justifyContent: 'space-between',
      gridTemplateColumns: 'auto auto',
      alignItems: 'end',
      marginBottom: theme.spacings.md,
    },
    title: {
      lineHeight: 1,
    },
    right: {
      lineHeight: 1,
    },
  }),
  { name: 'ContainerWithHeader' },
)

export type ContainerWithHeaderProps = {
  title: string
  rightArea: React.ReactNode
  children: React.ReactNode
} & UseStyles<typeof useStyles>

export default function ContainerWithHeader(props: ContainerWithHeaderProps) {
  const { title, rightArea, children } = props
  const classes = useStyles(props)

  return (
    <Row>
      <div className={classes.head}>
        <Typography variant='h5' component='h2' className={classes.title}>
          {title}
        </Typography>
        <Typography component='div' variant='subtitle1' className={classes.right}>
          {rightArea}
        </Typography>
      </div>
      {children}
    </Row>
  )
}
