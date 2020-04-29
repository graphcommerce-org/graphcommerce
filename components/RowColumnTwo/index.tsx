import React from 'react'
import { makeStyles, Theme, Grid } from '@material-ui/core'
import RichText from '../RichText'

const useStyles = makeStyles((theme: Theme) => ({
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
  colOne: {
    gridArea: 'one',
  },
  colTwo: {
    gridArea: 'two',
  },
}))

const RowColumnTwo: React.FC<GQLRowColumnTwoFragment> = ({ colOne, colTwo }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.colOne}>
        <RichText {...colOne} />
      </div>
      <div className={classes.colTwo}>
        <RichText {...colTwo} />
      </div>
    </div>
  )
}

export default RowColumnTwo
