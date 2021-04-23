import { Container, ContainerProps, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      gridColumnGap: theme.spacings.md,
      gridRowGap: theme.spacings.lg,
      marginBottom: theme.spacings.lg,
      display: `grid`,
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `"one" "two"`,

      '& h2, & h3': {
        ...theme.typography.h4,
      },

      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: `1fr 1fr`,
        gridTemplateAreas: `"one two"`,
      },
    },
    colOne: { gridArea: 'one' },
    colTwo: { gridArea: 'two' },
  }),
  { name: 'ColumnTwo' },
)

export type ColumnTwoProps = UseStyles<typeof useStyles> &
  Omit<ContainerProps, 'children'> & {
    colOneContent: React.ReactNode
    colTwoContent: React.ReactNode
  }

export default function ColumnTwo(props: ColumnTwoProps) {
  const { colOneContent, colTwoContent, ...containerProps } = props
  const classes = useStyles(props)

  return (
    <Container maxWidth='lg' {...containerProps} className={classes.root}>
      <div className={classes.colOne}>{colOneContent}</div>
      <div className={classes.colTwo}>{colTwoContent}</div>
    </Container>
  )
}
