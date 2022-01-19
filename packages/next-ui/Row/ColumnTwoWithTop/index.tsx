import React from 'react'
import { Row } from '..'
import { UseStyles } from '../../Styles'
import { makeStyles, useMergedClasses } from '../../Styles/tssReact'

const useStyles = makeStyles({ name: 'ColumnTwoWithTop' })((theme) => ({
  root: {
    display: 'grid',
    gap: `${theme.spacings.lg} 0`,
    gridTemplateAreas: `
      "top"
      "left"
      "right"
    `,
    [theme.breakpoints.up('md')]: {
      gridTemplateAreas: `
        "top  ."
        "left right"
      `,
      gridTemplateColumns: '1fr auto',
      gap: `${theme.spacings.sm} ${theme.spacings.xxl}`,
    },
  },
  top: {
    gridArea: 'top',
  },
  left: {
    gridArea: 'left',
  },
  right: {
    gridArea: 'right',
  },
}))

export type ColumnTwoWithTopProps = UseStyles<typeof useStyles> & {
  top: React.ReactNode
  left: React.ReactNode
  right: React.ReactNode
}

export function ColumnTwoWithTop(props: ColumnTwoWithTopProps) {
  const { top, left, right } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return (
    <Row className={classes.root}>
      <div className={classes.top}>{top}</div>
      <div className={classes.left}>{left}</div>
      <div className={classes.right}>{right}</div>
    </Row>
  )
}
