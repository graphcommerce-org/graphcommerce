import { motionValue, MotionValue } from 'framer-motion'
import { PlaybackControls } from 'popmotion'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import { getSnapPosition } from '../context/api'
import { scrollerContext } from '../context/scrollerContext'
import { ItemState, ScrollSnapAlign, ScrollSnapStop, ScrollSnapType } from '../types'

export type ScrollerProviderProps = {
  children?: React.ReactNode | undefined
  scrollSnapType?: ScrollSnapType
  scrollSnapAlign?: ScrollSnapAlign
  scrollSnapStop?: ScrollSnapStop
}

function useObserveItems(
  scrollerRef: React.RefObject<HTMLElement>,
  setItems: React.Dispatch<React.SetStateAction<ItemState[]>>,
) {
  useEffect(() => {
    if (!scrollerRef.current) return () => {}

    let itemsArr: ItemState[]
    const find = ({ target }: { target: Element }) => itemsArr.find((i) => i.el === target)

    const htmlEls = [...scrollerRef.current.children].filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    )

    // const ro = new ResizeObserver((entries) =>
    //   entries.forEach((entry) => {
    //     find(entry)
    //   }),
    // )
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => find(entry)?.visibility.set(entry.intersectionRatio)),
      { root: scrollerRef.current, threshold: [0, 0.5, 1] },
    )

    itemsArr = htmlEls.map((el) => {
      const item: ItemState = { el, visibility: motionValue(0) }
      // ro.observe(el)
      io.observe(el)
      return item
    })
    setItems(itemsArr)

    return () => {
      // ro.disconnect()
      io.disconnect()
    }
  }, [scrollerRef, setItems])
}

export default function ScrollableProvider(props: ScrollerProviderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const cancels = useRef<PlaybackControls[]>([])

  const {
    scrollSnapAlign = 'center center',
    scrollSnapStop = 'normal',
    scrollSnapType = 'both proximity',
    ...providerProps
  } = props
  const scrollSnap = useMemo(
    () => ({ scrollSnapType, scrollSnapStop, scrollSnapAlign }),
    [scrollSnapAlign, scrollSnapStop, scrollSnapType],
  )

  const [snap, setSnap] = useState(true)

  // Monitor the visbility of all elements and store them for later use.
  const [items, setItems] = useState<ItemState[]>([])
  useObserveItems(scrollerRef, setItems)

  // Cancel any running animations to prevent onComplete to be ran
  const stop = () => {
    cancels.current.forEach((c) => c?.stop())
    cancels.current = []
  }
  // Register any runnin ganimations so they become cancelable
  const register = (controls: PlaybackControls) => {
    cancels.current.push(controls)
  }

  const next = () => {
    const el = scrollerRef.current
    if (!el) return

    const pos = getSnapPosition(el, 'right', scrollSnap.scrollSnapAlign)

    const visible = items.filter((item) => item.visibility.get() < 0.9)

    stop()
    setSnap(false)
    register(
      animate({
        from: el.scrollLeft,
        to: pos.x,
        velocity: scroll.x.getVelocity(),
        onUpdate: (v) => {
          el.scrollLeft = v
        },
        onComplete: enableSnap,
      }),
    )
  }
  const prev = () => {}

  return (
    <scrollerContext.Provider
      value={{ scrollerRef, scrollSnap, stop, register, items }}
      {...providerProps}
    />
  )
}
