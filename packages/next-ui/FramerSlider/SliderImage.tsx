import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import * as React from 'react'
import { useSliderContext } from './SliderContext'

const useStyles = makeStyles(
  () => ({
    root: {
      '& picture': {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    landscape: {
      '& img, video': {
        display: 'block',
        width: '100%',
        height: 'auto',
        pointerEvents: 'none',
      },
    },
    portait: {
      '& img, video': {
        display: 'block',
        width: 'auto',
        height: '100%',
        pointerEvents: 'none',
      },
    },
  }),
  { name: 'SliderImage' },
)

type SliderImageProps = React.PropsWithChildren<{
  animating?: boolean
  width: number
  height: number
}>

export default function SliderImage(props: SliderImageProps) {
  const classes = useStyles()
  const [{ containerSize }] = useSliderContext()
  const { children, width, height } = props

  const containerRatio = (containerSize?.width ?? 1) / (containerSize?.height ?? 1)
  const ratio = width / height

  const portait = containerRatio > ratio

  return (
    <div className={clsx(classes.root, portait ? classes.portait : classes.landscape)}>
      {children}
    </div>
  )
}
