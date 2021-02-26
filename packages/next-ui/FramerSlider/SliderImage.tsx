import { makeStyles } from '@material-ui/core'
import { Portrait } from '@material-ui/icons'
import clsx from 'clsx'
import { m } from 'framer-motion'
import * as React from 'react'
import { useSliderContext } from './SliderContext'

const useStyles = makeStyles(
  () => ({
    aspectWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    aspect: {
      overflow: 'hidden',
      position: 'relative',
      '& > *': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      '& img, video': {
        display: 'block',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      },
    },
    landscape: {
      height: '0',
      width: '100%',
    },
    portrait: {
      height: '100%',
      width: '0',
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
  const { children, width, height, animating } = props

  const containerRatio = (containerSize?.width ?? 1) / (containerSize?.height ?? 1)
  const ratio = width / height
  const portrait = containerRatio > ratio

  return (
    <div className={classes.aspectWrapper}>
      <m.div
        layout={animating}
        className={clsx(classes.aspect, portrait ? classes.portrait : classes.landscape)}
        style={{
          ...(portrait && { paddingLeft: `${Math.round((width / height) * 100)}%` }),
          ...(!portrait && { paddingTop: `${Math.round((height / width) * 100)}%` }),
        }}
      >
        {children}
      </m.div>
    </div>
  )
}
