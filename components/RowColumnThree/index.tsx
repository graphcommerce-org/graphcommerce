import React from 'react'
import { makeStyles, Theme, Grid } from '@material-ui/core'
import RichText from '../RichText'
import { vpCalc } from '../Theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: 'red',
    display: 'flex',
    justifyContent: 'space-between',
    '& > div': {
      background: 'pink',
      padding: vpCalc(16, 50),
    },
  },
}))

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
}))

const RowColumnThree: React.FC<GQLRowColumnThreeFragment> = ({ colOne, colTwo, colThree }) => {
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
