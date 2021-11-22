import {
  clientSize,
  Styled,
  useElementScroll,
  useIsomorphicLayoutEffect,
  useMotionValueValue,
} from '@graphcommerce/framer-utils'
import clsx from 'clsx'
import { m, MotionValue, PanInfo, useMotionValue, useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import { INERTIA_ANIM, SPRING_ANIM } from '../animation'
import { useSheetContext } from '../hooks/useSheetContext'
import useSnapPointVariants from '../hooks/useSnapPointVariants'
import { SheetVariant } from '../types'
import { nearestSnapPointIndex } from '../utils/snapPoint'
import variantSizeCss from '../utils/variantSizeCss'

type Styles = 'dragHandle' | 'content'
export type SheetPanelClasskey = Styles | `${Styles}${SheetVariant}` | 'back' | 'forward'

export type SheetPanelProps = {
  /**
   * When replacing the dragHandle, You need to reimplement <SheetDragIndicator/>
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
  header?: React.ReactNode

  forward?: React.ReactNode
  back?: React.ReactNode

  /**
   * Content of the panel
   *
   * ```ts
   * ;<SheetPanel>Content here!</SheetPanel>
   * ```
   */
  children: React.ReactNode

  /** Initial animation state */
  initial?: string
} & Styled<SheetPanelClasskey>

export default function SheetPanel(props: SheetPanelProps) {
  const { header, back, forward, children, styles, initial, classes } = props
  const {
    drag,
    size,
    maxSize,
    snapPoints,
    controls,
    variant,
    variantSize,
    contentRef,
    contentRefCallback,
    onSnap,
    onSnapEnd,
  } = useSheetContext()

  const last = snapPoints.length - 1

  const axis = ['top', 'bottom'].includes(variant) ? 'y' : 'x'
  const crossAxis = ['top', 'bottom'].includes(variant) ? 'x' : 'y'
  const sign = ['top', 'left'].includes(variant) ? -1 : 1
  const dimension = ['top', 'bottom'].includes(variant) ? 'height' : 'width'

  // Define the drag handling
  const onDragEnd = async (_: never, { velocity, offset, delta }: PanInfo) => {
    const main = Math.abs(delta[axis] - offset[axis])
    const cross = Math.abs(delta[crossAxis] - offset[crossAxis])

    const clamped =
      velocity[axis] < 0
        ? Math.max(velocity[axis], -Math.abs(offset[axis] * 2))
        : Math.min(velocity[axis], Math.abs(offset[axis] * 2))
    const target = cross > main ? drag.get() : clamped + drag.get()

    const index = nearestSnapPointIndex(target, snapPoints, size, variant)
    onSnap?.(snapPoints[index], index)
    await controls.start(`snapPoint${index}`)
    onSnapEnd?.(snapPoints[index], index)
  }

  const dragHandleRef = useRef<HTMLDivElement>(null)
  const dragHandleHeight = useMotionValue(0)

  const maxHeight = useTransform([maxSize, dragHandleHeight] as MotionValue[], ([v, h]: number[]) =>
    v > 0 ? Math.max(0, v - h) : 10000,
  )
  const canDrag = useMotionValueValue(useElementScroll(contentRef).yMax, (v) => v === 0)

  useIsomorphicLayoutEffect(() => {
    if (!dragHandleRef.current) return undefined
    const ro = new ResizeObserver(([entry]) => dragHandleHeight.set(entry.contentRect.height))
    ro.observe(dragHandleRef.current)
    return () => ro.disconnect()
  }, [dragHandleRef, dragHandleHeight])

  return (
    <>
      <m.div
        ref={dragHandleRef}
        drag={axis}
        onDragEnd={onDragEnd}
        dragTransition={INERTIA_ANIM}
        transition={SPRING_ANIM}
        variants={{
          closed: () => ({ [axis]: clientSize[axis].get() * sign }),
          ...useSnapPointVariants(),
        }}
        initial={initial ?? 'closed'}
        exit={`snapPoint${last}`}
        animate={controls}
        className={clsx(classes?.dragHandle, classes?.[`dragHandle${variant}`])}
        style={{
          ...styles?.dragHandle,
          ...styles?.[`dragHandle${variant}`],
          /**
           * `x|y` is shared between the dragHandle and the content and therefor all animations will
           * automatically sync.
           */
          [axis]: drag,

          // /** There sometimes is a very small gap (<1px) between the dragHandle and the content */
          // [`margin${Variant}`]: -1,
        }}
      >
        {variant === 'bottom' && <div>{back}</div>}
        {header}
        {variant === 'bottom' && <div style={{ justifySelf: 'flex-end' }}>{forward}</div>}
      </m.div>
      <m.div
        drag={(axis !== 'y' || canDrag) && axis}
        onDragEnd={onDragEnd}
        dragTransition={INERTIA_ANIM}
        transition={SPRING_ANIM}
        ref={contentRefCallback}
        className={clsx(classes?.content, classes?.[`content${variant}`])}
        style={{
          ...styles?.content,
          ...styles?.[`content${variant}`],
          [axis]: drag,

          ...(axis === 'y' && { maxHeight }),
          [dimension]: variantSizeCss(variantSize),
        }}
      >
        {variant !== 'bottom' && (
          <div style={styles?.back} className={classes?.back}>
            {back}
          </div>
        )}
        {variant !== 'bottom' && (
          <div style={styles?.forward} className={classes?.forward}>
            {forward}
          </div>
        )}
        {children}
      </m.div>
    </>
  )
}
