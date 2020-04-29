import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import RichText from '../RichText'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    padding: `${theme.gridSpacing.row} ${theme.gridSpacing.column}`,
    gridColumnGap: theme.gridSpacing.column,
    gridRowGap: theme.gridSpacing.row,
    gridTemplateColumns: `1fr`,
    gridTemplateAreas: `
      "one"
      "two"
      "three"
    `,
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
  colOne: { gridArea: 'one' },
  colTwo: { gridArea: 'two' },
  colThree: { gridArea: 'three' },
}))

const RowColumnThree: React.FC<GQLRowColumnThreeFragment> = ({ colOne, colTwo, colThree }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.colOne}>
        <RichText {...colOne} />
      </div>
      <div className={classes.colTwo}>
        <RichText {...colTwo} />
      </div>
      <div className={classes.colThree}>
        <RichText {...colThree} />
      </div>
    </div>
  )
}

export default RowColumnThree
