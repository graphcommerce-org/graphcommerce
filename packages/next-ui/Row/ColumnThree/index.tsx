import { ContainerProps, Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'
import Row from '..'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `
        "one"
        "two"
        "three"
      `,
      '& h2, & h3': {
        ...theme.typography.h4,
        [theme.breakpoints.up('md')]: {
          marginBottom: '-25px',
        },
      },
      '& p': {
        [theme.breakpoints.up('md')]: {
          marginTop: '65px',
        },
      },
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: `1fr 1fr`,
        gridTemplateAreas: `
        "one two"
        "three three"
      `,
      },
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: `1fr 1fr 1fr`,
        gridTemplateAreas: '"one two three"',
      },
    },
    colOne: { gridArea: 'one', zIndex: 2 },
    colTwo: { gridArea: 'two', zIndex: 2 },
    colThree: { gridArea: 'three', zIndex: 2 },
  }),
  { name: 'ColumnThree' },
)

export type ColumnThreeProps = UseStyles<typeof useStyles> &
  Omit<ContainerProps, 'children'> & {
    colOneContent: React.ReactNode
    colTwoContent: React.ReactNode
    colThreeContent: React.ReactNode
  }

export default function ColumnThree(props: ColumnThreeProps) {
  const { colOneContent, colTwoContent, colThreeContent, ...containerProps } = props
  const classes = useStyles(props)

  return (
    <Row className={classes.root} {...containerProps}>
      <div className={classes.colOne}>{colOneContent}</div>
      <div className={classes.colTwo}>{colTwoContent}</div>
      <div className={classes.colThree}>{colThreeContent}</div>
    </Row>
  )
}
