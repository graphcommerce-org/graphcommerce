import { m } from 'framer-motion'
import { forwardRef } from 'react'
import { ScrollableProps, useScroller } from '../hooks/useScroller'

const Scroller = forwardRef<HTMLDivElement, ScrollableProps>((props, forwardedRef) => {
  const scroller = useScroller<'div'>(props, forwardedRef)
  return <m.div {...scroller} />
})
Scroller.displayName = 'Scroller'

export default Scroller
