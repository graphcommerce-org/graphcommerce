import React from 'react'
import { makeStyles, Theme, Grid } from '@material-ui/core'
import RichText from '../RichText'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    padding: `${theme.gridSpacing.row} ${theme.gridSpacing.column}`,
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
  },
}))

const RowColumnOne: React.FC<GQLRowColumnOneFragment> = ({ colOne }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <RichText {...colOne} />
    </div>
  )
}

export default RowColumnOne
