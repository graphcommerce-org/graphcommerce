import { HTMLMotionProps, motion, PanInfo, useTransform } from 'framer-motion'
import React, { CSSProperties, useRef } from 'react'
import { INERTIA_ANIM, SPRING_ANIM } from '../animation'
import useElementScroll from '../hooks/useElementScroll'
import useMotionValueValue from '../hooks/useMotionValueValue'
import useSheetContext from '../hooks/useSheetContext'
import useSnapPointVariants from '../hooks/useSnapPointVariants'
import { nearestSnapPointIndex } from '../snapPoint'
import { SheetVariant } from '../types'
import windowSize from '../utils/windowSize'

type DivProps = Omit<
  HTMLMotionProps<'div'>,
  'variants' | 'initial' | 'exit' | 'animate' | 'drag' | 'dragTransition' | 'onDragEnd'
>

type Styles = 'header' | 'content'
export type SheetPanelClasskey = Styles | `${Styles}${SheetVariant}`

type SheetPanelProps = {
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
  headerProps?: DivProps
  contentProps?: DivProps

  styles?: Record<SheetPanelClasskey, CSSProperties>
  classes?: Record<SheetPanelClasskey, string>
}

export default function SheetPanel(props: SheetPanelProps) {
  const { header, children, contentProps, headerProps, styles, classes } = props
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

  const maxHeight = useTransform(maxSize, (v) => (v > 0 ? Math.max(0, v - 40) : 10000))
  const canDrag = useMotionValueValue(useElementScroll(contentRef).yMax, (v) => v === 0)

  return (
    <>
      <motion.div
        {...headerProps}
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
        style={{
          ...styles?.header,
          ...styles?.[`header${variant}`],
          ...headerProps?.style,
          /**
           * `x|y` is shared between the header and the content and therefor all animations will
           * automatically sync.
           */
          [axis]: drag,
        }}
        className={`${classes?.header} ${classes?.[`header${variant}`]}`}
      >
        {header}
      </motion.div>
      <motion.div
        {...contentProps}
        drag={(axis !== 'y' || canDrag) && axis}
        dragDirectionLock
        onDragEnd={onDragEnd}
        dragTransition={INERTIA_ANIM}
        transition={SPRING_ANIM}
        ref={contentRef}
        style={{
          ...styles?.content,
          ...styles?.[`content${variant}`],
          ...contentProps?.style,

          [axis]: drag,
          ...(axis === 'y' && { maxHeight }),
        }}
        className={`${classes?.content} ${classes?.[`content${variant}`]}`}
      >
        {children}
      </motion.div>
    </>
  )
}
