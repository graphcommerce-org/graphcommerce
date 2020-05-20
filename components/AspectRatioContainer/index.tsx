import React from 'react'
import { makeStyles } from '@material-ui/styles'

const AspectRatioContainer: React.FC = (props) => {
  const { width, height, children } = props

  const useStyles = makeStyles({
    root: {
      position: `relative`,
      paddingTop: `calc(100% / ${width} * ${height})`,
      '& img, & video': {
        position: 'absolute',
        left: 0,
        top: 0,
        width: `100%`,
        height: `auto`,
      },
    },
  })
  const classes = useStyles()

  return <div className={classes.root}>{children}</div>
}

export default AspectRatioContainer
