import { Point2D } from 'framer-motion'
import { ScrollSnapAlign, ScrollSnapAlignAxis } from '../types'

type Axis = 'x' | 'y'
type SnapPositionList = Record<Exclude<ScrollSnapAlignAxis, 'none'>, number[]>

function unique<T>(iterable: Iterable<T>): T[] {
  return Array.from(new Set(iterable))
}

function getAllDescendants(parent: HTMLElement): HTMLElement[] {
  let children: HTMLElement[] = []
  for (const child of parent.children) {
    children = children.concat(child as HTMLElement, getAllDescendants(child as HTMLElement))
  }
  return children
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

export function getSnapPositions(
  parent: HTMLElement,
  excludeOffAxis = true,
  scrollSnapAlign: ScrollSnapAlign,
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

  const descendants = getAllDescendants(parent)

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
      let [childAlignY, childAlignX] = scrollSnapAlign.split(' ') as ScrollSnapAlignAxis[]
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

export function getScrollSnapPositions(
  element: HTMLElement,
  scrollSnapAlign: ScrollSnapAlign,
): Record<Axis, number[]> {
  const rect = element.getBoundingClientRect()

  const scrollPadding = getScrollPadding(element)
  const snapPositions = getSnapPositions(element, true, scrollSnapAlign)

  const maxScroll = {
    x: element.scrollWidth - element.offsetWidth,
    y: element.scrollHeight - element.offsetHeight,
  }

  const clamp = (min: number, max: number) => (value: number) => Math.max(min, Math.min(max, value))

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

export function getSnapPosition(
  element: HTMLElement,
  direction: 'left' | 'right' | 'up' | 'down',
  scrollSnapAlign: ScrollSnapAlign,
): Point2D {
  const axis: Axis = direction === 'up' || direction === 'down' ? 'y' : 'x'
  const sign = direction === 'right' || direction === 'down' ? '+' : '-'

  const maxScroll =
    axis === 'x'
      ? element.scrollWidth - element.offsetWidth
      : element.scrollHeight - element.offsetHeight

  const available = getScrollSnapPositions(element, scrollSnapAlign)[axis]

  const current = element[axis === 'x' ? 'scrollLeft' : 'scrollTop'] + (sign === '+' ? 2 : -2)

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
