import { ContainerProps } from '@mui/material'
import React from 'react'
import { Row } from '..'
import { UseStyles } from '../../Styles'
import { makeStyles, typography, useMergedClasses } from '../../Styles/tssReact'

const useStyles = makeStyles({ name: 'ColumnTwo' })((theme) => ({
  root: {
    gridColumnGap: theme.spacings.md,
    gridRowGap: theme.spacings.lg,
    display: `grid`,
    gridTemplateColumns: `1fr`,
    gridTemplateAreas: `"one" "two"`,
    '& h2, & h3': {
      ...typography(theme, 'h4'),
    },
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: `1fr 1fr`,
      gridTemplateAreas: `"one two"`,
    },
  },
  colOne: { gridArea: 'one' },
  colTwo: { gridArea: 'two' },
}))

export type ColumnTwoProps = UseStyles<typeof useStyles> &
  Omit<ContainerProps, 'children'> & {
    colOneContent: React.ReactNode
    colTwoContent: React.ReactNode
  }

export function ColumnTwo(props: ColumnTwoProps) {
  const { colOneContent, colTwoContent, ...containerProps } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return (
    <Row maxWidth='lg' {...containerProps} className={classes.root}>
      <div className={classes.colOne}>{colOneContent}</div>
      <div className={classes.colTwo}>{colTwoContent}</div>
    </Row>
  )
}
