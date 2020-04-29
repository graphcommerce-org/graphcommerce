import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
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

const RowColumnThree: React.FC<GQLRowColumnThreeFragment> = ({ colOne, colTwo, colThree }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>
        <RichText {...colOne} />
      </div>
      <div>
        <RichText {...colTwo} />
      </div>
      <div>
        <RichText {...colThree} />
      </div>
    </div>
  )
}

export default RowColumnThree
