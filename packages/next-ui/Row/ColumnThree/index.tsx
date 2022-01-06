import { ContainerProps } from '@mui/material'
import React from 'react'
import Row from '..'
import { UseStyles } from '../../Styles'
import { makeStyles, typography, useMergedClasses } from '../../Styles/tssReact'

const useStyles = makeStyles({ name: 'ColumnThree' })((theme) => ({
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
      ...typography(theme, 'h4'),
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
}))

export type ColumnThreeProps = UseStyles<typeof useStyles> &
  Omit<ContainerProps, 'children'> & {
    colOneContent: React.ReactNode
    colTwoContent: React.ReactNode
    colThreeContent: React.ReactNode
  }

export default function ColumnThree(props: ColumnThreeProps) {
  const { colOneContent, colTwoContent, colThreeContent, ...containerProps } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return (
    <Row className={classes.root} {...containerProps}>
      <div className={classes.colOne}>{colOneContent}</div>
      <div className={classes.colTwo}>{colTwoContent}</div>
      <div className={classes.colThree}>{colThreeContent}</div>
    </Row>
  )
}
