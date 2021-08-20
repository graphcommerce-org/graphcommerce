import { motionValue, Point2D } from 'framer-motion'
import { PlaybackControls } from 'popmotion'
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { scrollerContext } from '../context/scrollerContext'
import {
  Axis,
  ItemState,
  ScrollerContext,
  ScrollSnapAlign,
  ScrollSnapAlignAxis,
  ScrollSnapStop,
  ScrollSnapType,
  SnapPositionList,
} from '../types'

export type ScrollerProviderProps = {
  children?: React.ReactNode | undefined
  scrollSnapType?: ScrollSnapType
  scrollSnapAlign?: ScrollSnapAlign
  scrollSnapStop?: ScrollSnapStop
}

function assertScrollerRef(
  scrollerRef: React.RefObject<HTMLElement>,
): asserts scrollerRef is React.MutableRefObject<HTMLElement> {
  if (!scrollerRef.current) throw Error('scrollerRef must be defined')
}

function useObserveItems(
  scrollerRef: React.RefObject<HTMLElement>,
  setItems: React.Dispatch<React.SetStateAction<ItemState[]>>,
  enableSnap: ScrollerContext['enableSnap'],
) {
  useEffect(() => {
    assertScrollerRef(scrollerRef)

    let itemsArr: ItemState[]
    const find = ({ target }: { target: Element }) => itemsArr.find((i) => i.el === target)

    const htmlEls = [...scrollerRef.current.children].filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    )

    const ro = new ResizeObserver((entries) =>
      entries.forEach((entry) => {
        enableSnap()
        find(entry)
      }),
    )
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => find(entry)?.visibility.set(entry.intersectionRatio)),
      { root: scrollerRef.current, threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
    )

    itemsArr = htmlEls.map((el) => {
      const item: ItemState = { el, visibility: motionValue(0) }
      ro.observe(el)
      io.observe(el)
      return item
    })
    setItems(itemsArr)

    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [scrollerRef, setItems, enableSnap])
}

export default function ScrollerProvider(props: ScrollerProviderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const cancels = useRef<PlaybackControls[]>([])

  const {
    scrollSnapAlign = 'center center',
    scrollSnapStop = 'normal',
    scrollSnapType = 'inline mandatory',
    ...providerProps
  } = props
  const scrollSnap = useMemo(
    () => ({ scrollSnapType, scrollSnapStop, scrollSnapAlign }),
    [scrollSnapAlign, scrollSnapStop, scrollSnapType],
  )

  const [snap, setSnap] = useState(true)

  // Monitor the visbility of all elements and store them for later use.
  const [items, setItems] = useState<ItemState[]>([])

  // Cancel any running animations to prevent onComplete to be ran
  const stop = useCallback(() => {
    cancels.current.forEach((c) => c?.stop())
    cancels.current = []
  }, [])

  // Register any runnin ganimations so they become cancelable
  const register = useCallback((controls: PlaybackControls) => {
    cancels.current.push(controls)
  }, [])

  const disableSnap = useCallback(() => {
    stop()
    setSnap(false)
  }, [stop])

  const enableSnap = useCallback(() => {
    assertScrollerRef(scrollerRef)
    stop()
    const p = scrollerRef.current.scrollLeft
    setSnap(true)
    scrollerRef.current.scrollLeft = p
  }, [stop])

  useObserveItems(scrollerRef, setItems, enableSnap)

  function unique<T>(iterable: Iterable<T>): T[] {
    return Array.from(new Set(iterable))
  }

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

  function getSnapPositions(
    parent: HTMLElement,
    excludeOffAxis = true,
  ): Record<Axis, SnapPositionList> {
    const parentRect = parent.getBoundingClientRect()

    const positions: Record<Axis, SnapPositionList> = {
      x: {
        start: [],
        center: [],
        end: [],
      },
      y: {
        start: [],
        center: [],
        end: [],
      },
    }

    const descendants = [...parent.children]

    for (const axis of ['x', 'y'] as Axis[]) {
      const orthogonalAxis = axis === 'x' ? 'y' : 'x'
      const axisStart = axis === 'x' ? 'left' : 'top'
      const axisSize = axis === 'x' ? 'width' : 'height'
      const axisScroll = axis === 'x' ? 'scrollLeft' : 'scrollTop'

      for (const child of descendants) {
        const childRect = child.getBoundingClientRect()

        // Skip child if it doesn't intersect the parent's opposite axis (it can never be in view)
        if (excludeOffAxis && !domRectIntersects(parentRect, childRect, orthogonalAxis)) {
          continue
        }

        // eslint-disable-next-line prefer-const
        let [childAlignY, childAlignX] = scrollSnap.scrollSnapAlign.split(
          ' ',
        ) as ScrollSnapAlignAxis[]
        if (typeof childAlignX === 'undefined') {
          childAlignX = childAlignY
        }

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
      x: {
        before: convert(xBeforeRaw, rect.width),
        after: convert(xAfterRaw, rect.width),
      },
      y: {
        before: convert(yBeforeRaw, rect.height),
        after: convert(yAfterRaw, rect.height),
      },
    }
  }

  function getScrollSnapPositions(): Record<Axis, number[]> {
    assertScrollerRef(scrollerRef)
    const rect = scrollerRef.current.getBoundingClientRect()

    const scrollPadding = getScrollPadding(scrollerRef.current)
    const snapPositions = getSnapPositions(scrollerRef.current, true)

    const maxScroll = {
      x: scrollerRef.current.scrollWidth - scrollerRef.current.offsetWidth,
      y: scrollerRef.current.scrollHeight - scrollerRef.current.offsetHeight,
    }

    const clamp = (min: number, max: number) => (value: number) =>
      Math.max(min, Math.min(max, value))

    return {
      x: unique(
        [
          ...snapPositions.x.start.map((v) => v - scrollPadding.x.before),
          ...snapPositions.x.center.map((v) => v - rect.width / 2),
          ...snapPositions.x.end.map((v) => v - rect.width + scrollPadding.x.after),
        ].map(clamp(0, maxScroll.x)),
      ),
      y: unique(
        [
          ...snapPositions.y.start.map((v) => v - scrollPadding.y.before),
          ...snapPositions.y.center.map((v) => v - rect.height / 2),
          ...snapPositions.y.end.map((v) => v - rect.height + scrollPadding.y.after),
        ].map(clamp(0, maxScroll.y)),
      ),
    }
  }

  function getSnapPosition(direction: 'left' | 'right' | 'up' | 'down'): Point2D {
    assertScrollerRef(scrollerRef)
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

  const value: ScrollerContext = {
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
  }

  return <scrollerContext.Provider value={value} {...providerProps} />
}
