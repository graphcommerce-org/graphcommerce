import { useConstant } from '@graphcommerce/framer-utils'
import { PanInfo, Point } from 'framer-motion'
import { useScrollerContext } from './useScrollerContext'
import { useVelocitySnapTo } from './useVelocitySnapTo'

export type ScrollerControl = {
  controlling: boolean
  x: number
  y: number
  take: () => void
  update(point: Partial<Point>): void
  updateProgress(point: Partial<Point>): void
  release: (info?: PanInfo) => Promise<void>
}

export function useScrollerControl(): ScrollerControl {
  const { scrollerRef, disableSnap, scroll } = useScrollerContext()
  const snapToVelocity = useVelocitySnapTo(scrollerRef)

  const control = useConstant<ScrollerControl>(() => ({
    controlling: false,
    x: 0,
    y: 0,
    take: () => {
      control.controlling = true
      control.x = scroll.x.get()
      control.y = scroll.y.get()
      disableSnap()
    },
    update: ({ x, y }: Point) => {
      if (!control.controlling) throw Error('not controlling')
      if (!scrollerRef.current) return

      if (x) scroll.x.set(x)
      if (y) scroll.y.set(x)
      scrollerRef.current.scrollLeft = x
      scrollerRef.current.scrollTop = y
    },
    /** X, y are values from 0, to 1 */
    updateProgress: ({ x, y }: Point) => {
      const scrollRef = scrollerRef.current
      if (!scrollRef) return

      const xValue = (x ?? scroll.x.get()) * (scrollRef.scrollWidth - scrollRef.clientWidth)
      const yValue = (y ?? scroll.y.get()) * (scrollRef.scrollHeight - scrollRef.clientHeight)

      control.update({ x: xValue, y: yValue })
    },
    release: async (info?: PanInfo) => {
      if (!control.controlling) throw Error('not controlling')

      await snapToVelocity(info ?? { velocity: { x: 0, y: 0 }, offset: { x: 0, y: 0 } })
      control.x = 0
      control.y = 0
      control.controlling = false
    },
  }))

  return control
}
