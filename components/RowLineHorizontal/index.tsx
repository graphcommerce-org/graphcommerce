import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: `100%`,
    height: `2px`,
    backgroundColor: `#f2f2f2`,
    marginBottom: `${theme.spacings.xl}`,
  },
}))

const RowLineHorizontal: React.FC = () => {
  const classes = useStyles()

  return <div className={classes.root} />
}

export default RowLineHorizontal
