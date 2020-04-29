import React from 'react'
import { makeStyles, Theme, Grid } from '@material-ui/core'
import RichText from '../RichText'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
}))

const RowColumnOne: React.FC<GQLRowColumnOneFragment> = ({ colOne }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RichText {...colOne} />
        </Grid>
      </Grid>
    </div>
  )
}

export default RowColumnOne
