import { makeStyles } from '@material-ui/core'
import * as React from 'react'

const useStyles = makeStyles(
  () => ({
    root: {
      position: 'relative',
      // height: 0,
      paddingTop: '100%',
      '& > *': {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
      },
    },
  }),
  { name: 'SliderImage' },
)

export default function SliderImage(props: React.PropsWithChildren<{ animating: boolean }>) {
  const classes = useStyles()
  const { children } = props
  return <div className={classes.root}>{children}</div>
}
