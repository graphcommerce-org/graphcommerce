import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    width: `100%`,
    height: `2px`,
    backgroundColor: `#f2f2f2`,
  },
})
const RowLineHorizontal: React.FC = () => {
  const classes = useStyles()

  return <div className={classes.root} />
}

export default RowLineHorizontal
