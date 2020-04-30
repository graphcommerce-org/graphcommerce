import React from 'react'
import { makeStyles, Theme, Container, ContainerProps } from '@material-ui/core'
import RichText from '../RichText'
import { UseStyles } from '../Theme'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      padding: `${theme.gridSpacing.row} ${theme.gridSpacing.column}`,
      gridColumnGap: theme.gridSpacing.column,
      gridRowGap: theme.gridSpacing.row,
      display: `grid`,
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `
        "one"
        "two"
      `,
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: `1fr 1fr`,
        gridTemplateAreas: `
          "one two"
        `,
      },
    },
    colOne: { gridArea: 'one' },
    colTwo: { gridArea: 'two' },
  }),
  { name: 'RowColumnTwo' },
)

export type RowColumnTwoProps = GQLRowColumnTwoFragment &
  UseStyles<typeof useStyles> &
  ContainerProps

const RowColumnTwo: React.FC<RowColumnTwoProps> = (props) => {
  const { colOne, colTwo, ...containerProps } = props
  const classes = useStyles(props)

  return (
    <Container className={classes.root} {...containerProps}>
      <div className={classes.colOne}>
        <RichText {...colOne} />
      </div>
      <div className={classes.colTwo}>
        <RichText {...colTwo} />
      </div>
    </Container>
  )
}

export default RowColumnTwo
