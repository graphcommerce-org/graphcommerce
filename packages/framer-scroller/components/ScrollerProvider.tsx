import { useConstant, useElementScroll } from '@graphcommerce/framer-utils'
import { MotionValue, motionValue, Point, useMotionValue } from 'framer-motion'
import { PlaybackControls } from 'popmotion'
import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import { scrollerContext } from '../context/scrollerContext'
import {
  Axis,
  ItemState,
  ReactHtmlRefObject,
  ScrollerContext,
  ScrollSnapAlign,
  ScrollSnapAlignAxis,
  ScrollSnapStop,
  ScrollSnapType,
  SnapPositionList,
} from '../types'

export type ScrollerProviderProps = {
  children?: React.ReactNode | undefined
  scrollSnapTypeSm?: ScrollSnapType
  scrollSnapTypeMd?: ScrollSnapType
  scrollSnapAlign?: ScrollSnapAlign
  scrollSnapStop?: ScrollSnapStop

  /** @private */
  _inititalSnap?: boolean
}

function useObserveItems(scrollerRef: ReactHtmlRefObject, items: MotionValue<ItemState[]>) {
  const observe = useCallback(
    (itemsArr: ItemState[]) => {
      if (!scrollerRef.current) return () => {}

      const find = ({ target }: { target: Element }) => itemsArr.find((i) => i.el === target)

      const intersectionCallback = (entry: IntersectionObserverEntry) => {
        const item = find(entry)
        item?.visibility.set(entry.intersectionRatio)

        // Scale between 0.2 and 1
        const scaled = (1 - 0.2) * entry.intersectionRatio + 0.2
        item?.opacity.set(scaled)
      }
      const io = new IntersectionObserver((entries) => entries.forEach(intersectionCallback), {
        root: scrollerRef.current,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      })

      const htmlEls = [...scrollerRef.current.children].filter(
        (el): el is HTMLElement => el instanceof HTMLElement,
      )
      itemsArr.forEach((value, idx) => {
        if (!value.el) value.el = htmlEls?.[idx]
        if (value.el) io.observe(value.el)
      })

      return () => io.disconnect()
    },
    [scrollerRef],
  )

  useEffect(() => {
    observe(items.get())
    return items.onChange(observe)
  }, [items, observe])
}

export function ScrollerProvider(props: ScrollerProviderProps) {
  const scrollerRef = useRef<HTMLDivElement>()
  const cancels = useRef<PlaybackControls[]>([])
  const scroll = useElementScroll(scrollerRef)

  const {
    scrollSnapAlign = 'center center',
    scrollSnapStop = 'normal',
    scrollSnapTypeSm = 'inline mandatory',
    scrollSnapTypeMd = 'inline mandatory',
    _inititalSnap = true,
    ...providerProps
  } = props

  const scrollSnap = useMemo(
    () => ({ scrollSnapTypeMd, scrollSnapTypeSm, scrollSnapStop, scrollSnapAlign }),
    [scrollSnapAlign, scrollSnapStop, scrollSnapTypeMd, scrollSnapTypeSm],
  )

  const snap = useMotionValue(_inititalSnap)

  // Monitor the visbility of all elements and store them for later use.
  const items = useMotionValue<ItemState[]>([])

  // Cancel any running animations to prevent onComplete to be ran
  const stop = useCallback(() => {
    cancels.current.forEach((c) => c?.stop())
    cancels.current = []
  }, [])

  // Register any running animations so they become cancelable
  const register = useCallback((controls: PlaybackControls) => {
    cancels.current.push(controls)
  }, [])

  const disableSnap = useCallback(() => {
    if (snap.get() === false) return
    stop()
    scroll.scroll.set({ ...scroll.scroll.get(), animating: true })
    snap.set(false)
  }, [snap, stop, scroll])

  const enableSnap = useCallback(() => {
    if (snap.get() === true) return
    stop()
    snap.set(true)
    scroll.scroll.set({ ...scroll.scroll.get(), animating: false })
  }, [snap, stop, scroll])

  useObserveItems(scrollerRef, items)

  const registerChildren = useCallback(
    (children: React.ReactNode) => {
      const count = React.Children.count(children)
      if (!count && process.env.NODE_ENV !== 'production')
        console.warn('[@graphcommerce/framer-scroller]: Can not find children')

      const itemsArr: unknown[] = items.get().slice()
      itemsArr.length = count

      items.set(
        itemsArr.fill(undefined).map<ItemState>((_, i) => ({
          visibility: motionValue(i === 0 ? 1 : 0),
          opacity: motionValue(i === 0 ? 1 : 0.2),
        })),
      )
    },
    [items],
  )

  function domRectIntersects(a: DOMRect, b: DOMRect, axis: Axis | 'both' = 'both'): boolean {
    return (
      (axis === 'x' && a.right >= b.left && a.left <= b.right) ||
      (axis === 'y' && a.bottom >= b.top && a.top <= b.bottom) ||
      (axis === 'both' &&
        a.right >= b.left &&
        a.left <= b.right &&
        a.bottom >= b.top &&
        a.top <= b.bottom)
    )
  }

  /** Finds all elements with scrollSnapAlign by using getComputedStyle */
  function recursivelyFindElementsWithScrollSnapAlign(parent: HTMLElement) {
    const elements: HTMLElement[] = []
    ;[...parent.children].forEach((child) => {
      if (!(child instanceof HTMLElement)) return

      if (getComputedStyle(child).scrollSnapAlign !== 'none') elements.push(child)
      elements.push(...recursivelyFindElementsWithScrollSnapAlign(child))
    })
    return elements
  }

  function getSnapPositions(
    parent: HTMLElement,
    excludeOffAxis = true,
  ): Record<Axis, SnapPositionList> {
    const parentRect = parent.getBoundingClientRect()

    const positions: Record<Axis, SnapPositionList> = {
      x: { start: [], center: [], end: [] },
      y: { start: [], center: [], end: [] },
    }

    const descendants = recursivelyFindElementsWithScrollSnapAlign(parent)

    for (const axis of ['x', 'y'] as Axis[]) {
      const orthogonalAxis = axis === 'x' ? 'y' : 'x'
      const axisStart = axis === 'x' ? 'left' : 'top'
      const axisSize = axis === 'x' ? 'width' : 'height'
      const axisScroll = axis === 'x' ? 'scrollLeft' : 'scrollTop'

      for (const child of descendants) {
        const childRect = child.getBoundingClientRect()

        // Skip child if it doesn't intersect the parent's opposite axis (it can never be in view)
        if (excludeOffAxis && !domRectIntersects(parentRect, childRect, orthogonalAxis)) {
          // eslint-disable-next-line no-continue
          continue
        }

        const { scrollSnapAlign: align } = getComputedStyle(child)

        // console.trace(scrollPaddingTop, scrollPaddingRight, scrollPaddingBottom, scrollPaddingLeft)
        let [childAlignY, childAlignX] = align.split(' ') as [
          ScrollSnapAlignAxis,
          ScrollSnapAlignAxis | undefined,
        ]
        if (typeof childAlignX === 'undefined') childAlignX = childAlignY

        const childAlign = axis === 'x' ? childAlignX : childAlignY
        const childOffsetStart = childRect[axisStart] - parentRect[axisStart] + parent[axisScroll]

        switch (childAlign) {
          case 'none':
            break

          case 'start':
            positions[axis].start.push(childOffsetStart)
            break

          case 'center':
            positions[axis].center.push(childOffsetStart + childRect[axisSize] / 2)
            break

          case 'end':
            positions[axis].end.push(childOffsetStart + childRect[axisSize])
            break
        }
      }
    }

    return positions
  }

  function getScrollPadding(element: HTMLElement): Record<Axis, { before: number; after: number }> {
    const style = window.getComputedStyle(element)
    const rect = element.getBoundingClientRect()

    const xBeforeRaw = style.getPropertyValue('scroll-padding-left').replace('auto', '0px')
    const yBeforeRaw = style.getPropertyValue('scroll-padding-top').replace('auto', '0px')
    const xAfterRaw = style.getPropertyValue('scroll-padding-right').replace('auto', '0px')
    const yAfterRaw = style.getPropertyValue('scroll-padding-bottom').replace('auto', '0px')

    /**
     * Convert a CSS length to a number.
     *
     * @param raw CSS length value
     * @param size Parent size, used for percentage lengths
     */
    function convert(raw: string, size: number): number {
      let n = parseFloat(raw)
      if (/%/.test(raw)) {
        n /= 100
        n *= size
      }
      return n
    }

    return {
      x: { before: convert(xBeforeRaw, rect.width), after: convert(xAfterRaw, rect.width) },
      y: { before: convert(yBeforeRaw, rect.height), after: convert(yAfterRaw, rect.height) },
    }
  }

  function getScrollSnapPositions(): Record<Axis, number[]> {
    if (!scrollerRef.current) return { x: [], y: [] }

    const rect = scrollerRef.current.getBoundingClientRect()

    const scrollPadding = getScrollPadding(scrollerRef.current)
    const snapPositions = getSnapPositions(scrollerRef.current, true)

    const maxScroll = {
      x: scrollerRef.current.scrollWidth - scrollerRef.current.offsetWidth,
      y: scrollerRef.current.scrollHeight - scrollerRef.current.offsetHeight,
    }

    const clamp = (min: number, max: number) => (value: number) =>
      Math.round(Math.max(min, Math.min(max, value)))

    return {
      x: [
        ...new Set(
          [
            ...snapPositions.x.start.map((v) => v - scrollPadding.x.before),
            ...snapPositions.x.center.map((v) => v - rect.width / 2),
            ...snapPositions.x.end.map((v) => v - rect.width + scrollPadding.x.after),
          ]
            .map(clamp(0, maxScroll.x))
            .sort((a, b) => a - b),
        ),
      ],

      y: [
        ...new Set(
          [
            ...snapPositions.y.start.map((v) => v - scrollPadding.y.before),
            ...snapPositions.y.center.map((v) => v - rect.height / 2),
            ...snapPositions.y.end.map((v) => v - rect.height + scrollPadding.y.after),
          ]
            .map(clamp(0, maxScroll.y))
            .sort((a, b) => a - b),
        ),
      ],
    }
  }

  function getSnapPosition(direction: 'left' | 'right' | 'up' | 'down'): Point {
    if (!scrollerRef.current) return { x: 0, y: 0 }

    const axis: Axis = direction === 'up' || direction === 'down' ? 'y' : 'x'
    const sign = direction === 'right' || direction === 'down' ? '+' : '-'

    const maxScroll =
      axis === 'x'
        ? scrollerRef.current.scrollWidth - scrollerRef.current.offsetWidth
        : scrollerRef.current.scrollHeight - scrollerRef.current.offsetHeight

    const available = getScrollSnapPositions()[axis]

    const scrollAxis = axis === 'x' ? 'scrollLeft' : 'scrollTop'
    const current = scrollerRef.current[scrollAxis] + (sign === '+' ? 2 : -2)
    const next = available
      .filter((pos) => (sign === '+' ? pos > current : pos < current))
      .sort((a, b) => (sign === '+' ? a - b : b - a))

    let position: number

    if (next.length > 0) {
      ;[position] = next
    } else if (sign === '+') {
      position = maxScroll
    } else {
      position = 0
    }

    return { x: 0, y: 0, [axis]: position }
  }

  const value = useConstant<ScrollerContext>(() => ({
    scrollerRef,
    scrollSnap,
    stop,
    register,
    items,
    snap,
    enableSnap,
    disableSnap,
    getSnapPosition,
    getScrollSnapPositions,
    registerChildren,
    scroll,
  }))

  return <scrollerContext.Provider value={value} {...providerProps} />
}
