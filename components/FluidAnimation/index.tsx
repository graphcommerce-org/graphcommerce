import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import start from './script'
import { vpCalc } from '../Theme'

const useStyles = makeStyles({
  canvas: {
    width: '100%',
    height: '100vh',
    marginTop: '-115px',
  },
})

const FluidAnimation: React.FC = () => {
  const classes = useStyles()
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return
    start(ref.current, {
      SIM_RESOLUTION: 256,
      DYE_RESOLUTION: 1024,
      COLORFUL: false,
      // BACK_COLOR: { r: 255, g: 255, b: 0 },
      // BLOOM: false,
    })
  }, [ref])

  return <canvas ref={ref} className={classes.canvas} />
}

export default FluidAnimation
