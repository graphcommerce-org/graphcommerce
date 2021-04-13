import clsx from 'clsx'
import { motion, MotionValue, PanInfo, useMotionValue, useTransform } from 'framer-motion'
import React, { CSSProperties, useRef } from 'react'
import { INERTIA_ANIM, SPRING_ANIM } from '../animation'
import useElementScroll from '../hooks/useElementScroll'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import useMotionValueValue from '../hooks/useMotionValueValue'
import useSheetContext from '../hooks/useSheetContext'
import useSnapPointVariants from '../hooks/useSnapPointVariants'
import { SheetVariant } from '../types'
import { nearestSnapPointIndex } from '../utils/snapPoint'
import windowSize from '../utils/windowSize'

type Styles = 'header' | 'content'
export type SheetPanelClasskey = Styles | `${Styles}${SheetVariant}`

export type SheetPanelProps = {
  /**
   * When replacing the header, You need to reimplement <SheetDragIndicator/>
   *
   * ```ts
   * ;<SheetPanel
   *   header={
   *     <>
   *       Extra content
   *       <SheetDragIndicator />
   *     </>
   *   }
   * />
   * ```
   */
  header: React.ReactNode

  /**
   * Content of the panel
   *
   * ```ts
   * ;<SheetPanel>Content here!</SheetPanel>
   * ```
   */
  children: React.ReactNode

  styles?: Record<SheetPanelClasskey, CSSProperties>
  classes?: Record<SheetPanelClasskey, string>
}

export default function SheetPanel(props: SheetPanelProps) {
  const { header, children, styles, classes } = props
  const {
    drag,
    size,
    maxSize,
    snapPoints,
    controls,
    variant,
    containerRef,
    onSnap,
  } = useSheetContext()
  const last = snapPoints.length - 1

  const axis = ['top', 'bottom'].includes(variant) ? 'y' : 'x'
  const sign = ['top', 'left'].includes(variant) ? -1 : 1

  // Define the drag handling
  const onDragEnd = async (_: never, { velocity, offset }: PanInfo) => {
    const clamped =
      velocity[axis] < 0
        ? Math.max(velocity[axis], offset[axis] * 2)
        : Math.min(velocity[axis], offset[axis] * 2)
    const target = clamped + drag.get()

    const index = nearestSnapPointIndex(target, snapPoints, size, variant)
    onSnap?.(snapPoints[index], index)
    await controls.start(`snapPoint${index}`)
  }
  const contentRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerHeight = useMotionValue(0)

  const maxHeight = useTransform([maxSize, headerHeight] as MotionValue[], ([v, h]: number[]) =>
    v > 0 ? Math.max(0, v - h) : 10000,
  )
  const canDrag = useMotionValueValue(useElementScroll(contentRef).yMax, (v) => v === 0)

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return undefined
    const ro = new ResizeObserver(([entry]) => headerHeight.set(entry.contentRect.height))
    ro.observe(containerRef.current)
    return ro.disconnect
  }, [containerRef, headerHeight])

  return (
    <>
      <motion.div
        ref={headerRef}
        drag={axis}
        dragDirectionLock
        onDragEnd={onDragEnd}
        dragTransition={INERTIA_ANIM}
        dragConstraints={containerRef}
        transition={SPRING_ANIM}
        variants={{
          closed: () => ({ [axis]: windowSize[axis].get() * sign }),
          ...useSnapPointVariants(),
        }}
        initial='closed'
        exit={`snapPoint${last}`}
        animate={controls}
        className={clsx(classes?.header, classes?.[`header${variant}`])}
        style={{
          ...styles?.header,
          ...styles?.[`header${variant}`],
          /**
           * `x|y` is shared between the header and the content and therefor all animations will
           * automatically sync.
           */
          [axis]: drag,
        }}
      >
        {header}
      </motion.div>
      <motion.div
        drag={(axis !== 'y' || canDrag) && axis}
        dragDirectionLock
        onDragEnd={onDragEnd}
        dragTransition={INERTIA_ANIM}
        transition={SPRING_ANIM}
        ref={contentRef}
        className={clsx(classes?.content, classes?.[`content${variant}`])}
        style={{
          ...styles?.content,
          ...styles?.[`content${variant}`],
          [axis]: drag,
          ...(axis === 'y' && { maxHeight }),
        }}
      >
        {children}
      </motion.div>
    </>
  )
}
