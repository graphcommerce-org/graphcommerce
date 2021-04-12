import { HTMLMotionProps, motion, MotionStyle, PanInfo, useTransform } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { SheetVariant, SnapPoint, useSheetContext } from './SheetContext'
import SheetDragIndicator from './SheetDragIndicator'
import { INERTIA_ANIM, SPRING_ANIM } from './animation'
import useElementScroll from './hooks/useElementScroll'
import useMotionValueValue from './hooks/useMotionValueValue'
import useSnapPointVariants from './hooks/useSnapPointVariants'
import { nearestSnapPointIndex } from './snapPoint'
import windowSize from './utils/windowSize'

type DivProps = Omit<
  HTMLMotionProps<'div'>,
  'variants' | 'initial' | 'exit' | 'animate' | 'drag' | 'dragTransition' | 'onDragEnd'
>

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
  header?: React.ReactNode

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
}

type Styles = 'header' | 'content'
const styles: Record<Styles | `${Styles}${SheetVariant}`, MotionStyle> = {
  header: {
    backgroundColor: '#fff',
    boxShadow: '0px -2px 16px rgba(0, 0, 0, 0.3)',
    willChange: `transform`,
  },
  headertop: {
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',
  },
  headerbottom: {
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px',

    /** There sometimes is a very small gap (<1px) between the header and the content */
    marginBottom: -1,
    borderBottom: '1px solid transparent',
  },
  headerleft: {
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',

    /** There sometimes is a very small gap (<1px) between the header and the content */
    marginLeft: -1,
    borderLeft: '1px solid transparent',
  },
  headerright: {
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
    /** There sometimes is a very small gap (<1px) between the header and the content */
    marginRight: -1,
    borderRight: '1px solid transparent',
  },
  content: {
    backgroundColor: '#fff',
    willChange: `transform`,
    overflowY: 'auto',
  },
  contenttop: {},
  contentbottom: {},
  contentleft: {},
  contentright: {},
}

export default function SheetPanel(props: SheetPanelProps) {
  const { header, children, contentProps, headerProps } = props
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
          ...styles.header,
          ...styles[`header${variant}`],
          ...headerProps?.style,
          /**
           * `x|y` is shared between the header and the content and therefor all animations will
           * automatically sync.
           */
          [axis]: drag,
        }}
      >
        {header || <SheetDragIndicator />}
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
          ...styles.content,
          ...styles[`content${variant}`],
          ...contentProps?.style,

          [axis]: drag,
          ...(axis === 'y' && { maxHeight }),
        }}
      >
        {children}
      </motion.div>
    </>
  )
}
