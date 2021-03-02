import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { m } from 'framer-motion'
import * as React from 'react'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'
import SliderSlide from './SliderSlide'

const useStyles = makeStyles(
  () => ({
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

export type SliderImageProps = React.PropsWithChildren<{
  layout?: boolean
  width: number
  height: number
}> &
  UseStyles<typeof useStyles>

export default function SliderImage(props: SliderImageProps) {
  const classes = useStyles(props)
  const [{ containerSize }] = useSliderContext()
  const { children, width, height, layout } = props

  const containerRatio = (containerSize?.width ?? 1) / (containerSize?.height ?? 1)
  const ratio = width / height
  const portrait = containerRatio > ratio

  const paddingLeft = Math.round((width / height / containerRatio) * 100)
  const paddingTop = Math.round((height / width) * 100)

  return (
    <SliderSlide>
      <m.div
        layout={layout}
        className={clsx(classes.aspect, portrait ? classes.portrait : classes.landscape)}
        style={{
          ...(portrait && { paddingLeft: `${paddingLeft}%` }),
          ...(!portrait && { paddingTop: `${paddingTop}%` }),
        }}
      >
        {children}
      </m.div>
    </SliderSlide>
  )
}
