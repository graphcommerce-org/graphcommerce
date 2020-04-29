import React from 'react'
import { makeStyles, Theme, Grid } from '@material-ui/core'
import RichText from '../RichText'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
}))

const RowColumnTwo: React.FC<GQLRowColumnTwoFragment> = ({ colOne, colTwo }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <RichText {...colOne} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <RichText {...colTwo} />
        </Grid>
      </Grid>
    </div>
  )
}

export default RowColumnTwo
