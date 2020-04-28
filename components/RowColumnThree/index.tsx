import React from 'react'
import { createStyles, makeStyles, Theme, Grid } from '@material-ui/core'
import RichText from '../RichText'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
)

const RowColumnThree: React.FC<GQLRowColumnThreeFragment> = ({ colOne, colTwo, colThree }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <RichText {...colOne} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RichText {...colTwo} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RichText {...colThree} />
        </Grid>
      </Grid>
    </div>
  )
}

export default RowColumnThree
