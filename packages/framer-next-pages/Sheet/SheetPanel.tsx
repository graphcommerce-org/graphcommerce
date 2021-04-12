import {
  DraggableProps,
  HTMLMotionProps,
  motion,
  MotionProps,
  PanInfo,
  useTransform,
} from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { useSheetContext } from './SheetContext'
import SheetDragIndicator from './SheetDragIndicator'
import { INERTIA_ANIM, SPRING_ANIM } from './animation'
import { nearestSnapPointIndex } from './snapPoint'
import useSnapPointVariants from './useSnapPointVariants'
import { velocityClamp } from './utils'
import useElementScroll from './utils/useElementScroll'
import useMotionValueValue from './utils/useMotionValueValue'
import windowSize from './windowSize'

type DivProps = Omit<
  HTMLMotionProps<'div'>,
  'variants' | 'initial' | 'exit' | 'animate' | 'drag' | 'dragTransition' | 'onDragEnd'
>

type SheetPanelProps = {
  /**
   * Content of the panel
   *
   * ```ts
   * ;<SheetPanel>Content here!</SheetPanel>
   * ```
   */
  children: React.ReactNode
  /**
   * Open/close the panel
   *
   * ```ts
   * ;<SheetPanel open />
   * ```
   */
  open: boolean
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
  /** Callback when dragging ends */
  onSnap?: (index: number) => void

  headerProps?: DivProps
  contentProps?: DivProps
}

export default function SheetPanel(props: SheetPanelProps) {
  const { children, header, open, onSnap, contentProps, headerProps } = props
  const { y, height, maxHeight, snapPoints, controls } = useSheetContext()
  const last = snapPoints.length - 1

  // Open/close the panel when the height is calculated
  useEffect(() => {
    let cancel: () => void
    const init = () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      controls.start(open ? `snapPoint0` : `snapPoint${last}`)
      cancel()
    }
    cancel = height.onChange(init)
    return cancel
  }, [open, controls, last, height])

  // Define the drag handling
  const onDragEnd = async (_: never, info: PanInfo) => {
    const index = nearestSnapPointIndex(velocityClamp(info).y + y.get(), snapPoints, height)
    onSnap?.(index)
    await controls.start(`snapPoint${index}`)
  }
  const dragProps: DraggableProps = { drag: 'y', dragTransition: INERTIA_ANIM, onDragEnd }
  const sharedProps: MotionProps = { transition: SPRING_ANIM }
  const contentRef = useRef<HTMLDivElement>(null)
  const canDrag = useMotionValueValue(useElementScroll(contentRef).yMax, (v) => v === 0)

  return (
    <>
      <motion.div
        {...headerProps}
        {...dragProps}
        {...sharedProps}
        variants={{
          closed: () => ({ y: windowSize.height.get() }),
          ...useSnapPointVariants(),
        }}
        initial='closed'
        exit={`snapPoint${last}`}
        animate={controls}
        style={{
          backgroundColor: '#fff',
          borderTopRightRadius: '8px',
          borderTopLeftRadius: '8px',
          boxShadow: '0px -2px 16px rgba(0, 0, 0, 0.3)',
          ...headerProps?.style,

          /** There sometimes is a very small gap (<1px) between the header and the content */
          marginBottom: -1,
          borderBottom: '1px solid transparent',

          /**
           * `y` is shared between the header and the content and therefor all animations will
           * automatically sync.
           */
          willChange: `transform`,
          y,
        }}
      >
        {header || <SheetDragIndicator />}
      </motion.div>
      <motion.div
        {...contentProps}
        {...sharedProps}
        {...(canDrag && dragProps)}
        ref={contentRef}
        style={{
          backgroundColor: '#fff',
          ...contentProps?.style,

          /** Overlfow handling, set a maxHeight and overflowY auto */
          overflowY: 'auto',
          maxHeight: useTransform(maxHeight, (h) => (h > 0 ? Math.max(0, h - 40) : 10000)),

          willChange: `transform`,
          y,
        }}
      >
        {children}
      </motion.div>
    </>
  )
}
