import { m, useTransform, useViewportScroll } from 'framer-motion'
import React, { useRef } from 'react'
import useResizeObserver from 'use-resize-observer'
import useIntersectionObserver from './useIntersectionObserver'

const options = { threshold: 1 }

export default function Sticky() {
  const ref = useRef(null)

  const res = useIntersectionObserver({ ref, options })
  const size = useResizeObserver({ ref })
  const sticky = (res?.intersectionRatio ?? 1) < 1

  // const { scrollY } = useViewportScroll()
  // const y = useTransform(scrollY, [50, 150], [0, -100])

  // useLayoutEffect(() => {
  //   const element = ref.current
  //   setElementTop(element.offsetTop)
  // }, [ref])

  return (
    <div ref={ref} style={{ height: sticky ? size.height : undefined }}>
      <m.div
        style={sticky ? { position: 'fixed', top: 0, width: '100%' } : { position: 'relative' }}
      >
        Hallo!!
      </m.div>
    </div>
  )
}
