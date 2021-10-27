import { usePageContext, usePageRouter } from '@graphcommerce/framer-next-pages'
import { makeStyles } from '@material-ui/core'
import { AnimatePresence } from 'framer-motion'
import React, { useRef } from 'react'
import RouterSlide from './Slide'
import { ScrollPositions } from './types'

const useStyles = makeStyles(
  {
    slider: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
  },
  { name: 'FramerNextPagesSlider' },
)

export type SliderRouteProps = { children?: React.ReactNode }

/** RouteSlider provides an iOS settings style navigation */
export default function Slider(props: SliderRouteProps) {
  const classes = useStyles()
  const { children } = props
  const { depth, direction } = usePageContext()
  const router = usePageRouter()

  const scrollPositions = useRef<ScrollPositions>({})

  return (
    <div className={classes.slider}>
      <AnimatePresence initial={false} custom={{ depth, direction, exiting: true }}>
        <RouterSlide key={router.asPath} scrollPositions={scrollPositions}>
          {children}
        </RouterSlide>
      </AnimatePresence>
    </div>
  )
}
