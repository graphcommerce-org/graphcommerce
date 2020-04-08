import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import start, { FluidConfigProps } from './script'

const useStyles = makeStyles({
  canvas: {
    width: '100%',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
})

const FluidAnimation: React.FC<FluidConfigProps> = (config) => {
  const classes = useStyles()
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return undefined
    return start(ref.current, config)
  }, [ref, config])

  return <canvas ref={ref} className={classes.canvas} />
}

export default FluidAnimation
