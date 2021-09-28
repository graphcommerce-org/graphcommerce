import { usePageContext, usePageRouter } from '@graphcommerce/framer-next-pages'
import { SPRING_ANIM } from '@graphcommerce/framer-sheet'
import { makeStyles } from '@material-ui/core'
import { m, motionValue, useElementScroll } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { ScrollPositions } from './types'

const useStyles = makeStyles(
  () => ({
    slide: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      height: '100%',
      overflowY: 'auto',
    },
  }),
  { name: 'FramerNextPagesSlider' },
)

type Custom = {
  depth: number
  direction: 1 | -1
  exiting: boolean
}

export type RouterSlideProps = {
  children?: React.ReactNode
  scrollPositions: React.MutableRefObject<ScrollPositions>
}

export default function RouterSlide({ children, scrollPositions }: RouterSlideProps) {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useElementScroll(ref)
  const { direction, depth } = usePageContext()
  const router = usePageRouter()

  useEffect(() => {
    scrollPositions.current[router.asPath] ??= motionValue(0)
    scrollY.onChange((v) => scrollPositions.current[router.asPath].set(v))
  }, [router.asPath, scrollPositions, scrollY])

  useEffect(() => {
    const scroll = scrollPositions.current[router.asPath].get()
    if (ref.current && scroll) ref.current.scrollTop = scroll
  }, [router.asPath, scrollPositions])

  return (
    <m.div
      className={classes.slide}
      ref={ref}
      custom={{ depth, direction, exiting: false }}
      initial='initial'
      animate={{ x: 0 }}
      exit='exit'
      variants={{
        initial: (c: Custom) => (c.direction === 1 ? { x: '100%' } : { x: '-100%' }),
        exit: (c: Custom) => {
          if (!c.depth && c.exiting && c.direction === 1) return { x: '-100%' }
          if (!c.depth && c.exiting && c.direction === -1) return { x: '100%' }
          return { x: 0 }
        },
      }}
      transition={{ ...SPRING_ANIM, restDelta: 0.01, damping: 20 }}
    >
      {children}
    </m.div>
  )
}
