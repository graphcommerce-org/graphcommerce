import { Typography } from '@mui/material'
import React from 'react'
import { Row } from '../Row'
import { UseStyles } from '../Styles'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'

const useStyles = makeStyles({ name: 'ContainerWithHeader' })((theme) => ({
  head: {
    display: 'grid',
    justifyContent: 'space-between',
    gridTemplateColumns: 'auto auto',
    alignItems: 'end',
    marginBottom: theme.spacings.md,
  },
  title: {
    lineHeight: 1,
    textTransform: 'uppercase',
  },
  right: {
    lineHeight: 1,
  },
}))

export type ContainerWithHeaderProps = {
  title: string
  rightArea: React.ReactNode
  children: React.ReactNode
} & UseStyles<typeof useStyles>

export function ContainerWithHeader(props: ContainerWithHeaderProps) {
  const { title, rightArea, children } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

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
