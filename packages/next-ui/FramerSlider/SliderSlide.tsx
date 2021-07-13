import { makeStyles } from '@material-ui/core'
import * as React from 'react'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'

const useStyles = makeStyles(
  () => ({
    slide: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  { name: 'SliderSlide' },
)

export type SliderSlideImageProps = { children: React.ReactNode } & UseStyles<typeof useStyles>

/**
 * ## `<SliderSlide/>`
 *
 * Automatically sizes each slide to the width and height of the container and centers the content
 */
export default function SliderSlide(props: SliderSlideImageProps) {
  const classes = useStyles(props)
  const [{ containerSize }] = useSliderContext()
  const { children } = props

  return (
    <div className={classes.slide} style={containerSize}>
      {children}
    </div>
  )
}
