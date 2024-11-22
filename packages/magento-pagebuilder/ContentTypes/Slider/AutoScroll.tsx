import { useScrollTo, useScrollerContext } from '@graphcommerce/framer-scroller'
import { useEffect } from 'react'

type AutoScrollProps = {
  timePerSlide?: number
  pause?: boolean
}

export function AutoScroll(props: AutoScrollProps) {
  const { getScrollSnapPositions, getSnapPosition, scrollerRef, scroll } = useScrollerContext()
  const scrollTo = useScrollTo()
  const { pause = false, timePerSlide = 7500 } = props
  const { xProgress } = scroll

  useEffect(() => {
    const slide = () => {
      if (pause) return
      const scrollPositions = getScrollSnapPositions().x
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      scrollTo(xProgress.get() === 1 ? { x: scrollPositions[0], y: 0 } : getSnapPosition('right'))
    }
    const id = setInterval(slide, timePerSlide)
    return () => clearInterval(id)
  }, [getScrollSnapPositions, getSnapPosition, pause, scrollTo, timePerSlide, xProgress])

  return null
}
