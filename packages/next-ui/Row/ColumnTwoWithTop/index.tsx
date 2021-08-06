import { Container, makeStyles, Theme } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'
import Row from '..'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gap: `${theme.spacings.lg} 0`,
      gridTemplateAreas: `"top"
    "left"
    "right"`,
      [theme.breakpoints.up('md')]: {
        gridTemplateAreas: `"top ."
      "left right"`,
        gridTemplateColumns: '1fr auto',
        gap: `${theme.spacings.sm} ${theme.spacings.xl}`,
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
  }),
  { name: 'ColumnTwoWithTop' },
)

export type ProductDescriptionProps = PropsWithChildren<
  UseStyles<typeof useStyles> & {
    top: React.ReactNode
    left: React.ReactNode
    right: React.ReactNode
  }
>

export default function ColumnTwoWithTop(props: ProductDescriptionProps) {
  const { top, left, right } = props
  const classes = useStyles(props)

  return (
    <Row className={classes.root}>
      <div className={classes.top}>{top}</div>
      <div className={classes.left}>{left}</div>
      <div className={classes.right}>{right}</div>
    </Row>
  )
}
