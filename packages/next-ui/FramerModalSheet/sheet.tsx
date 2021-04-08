import { useSpring, useMotionValue, AnimatePresence, PanInfo } from 'framer-motion'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { SheetContext } from './context'
import { useModalEffect } from './hooks'
import styles from './styles'
import { SheetProps } from './types'
import { getClosest, isBrowser } from './utils'

const Sheet = React.forwardRef<any, SheetProps>(
  (
    {
      children,
      isOpen,
      onClose,
      onOpenStart,
      onOpenEnd,
      onCloseStart,
      onCloseEnd,
      onSnap,
      snapPoints,
      initialSnap = 0,
      rootId,
      springConfig = { stiffness: 300, damping: 30, mass: 0.2 },
      disableDrag = false,
      ...rest
    },
    ref,
  ) => {
    const [mounted, setMounted] = React.useState(false)
    const [isDragging, setDragging] = React.useState(false)
    const sheetRef = React.useRef<HTMLDivElement>(null)
    const callbacks = React.useRef({ onOpenStart, onOpenEnd, onCloseStart, onCloseEnd }); // prettier-ignore
    const indicatorRotation = useMotionValue(0)
    const sheetDragY = useMotionValue(isBrowser ? window.innerHeight : 0)
    const sheetSpringY = useSpring(sheetDragY, springConfig)
    const y = isDragging ? sheetDragY : sheetSpringY
    const pointerEvents = isOpen ? 'auto' : 'none'

    const handleDrag = React.useCallback((_, { delta }: PanInfo) => {
      // Update drag indicator rotation based on drag velocity
      const velocity = sheetDragY.getVelocity()
      if (velocity > 0) indicatorRotation.set(10)
      if (velocity < 0) indicatorRotation.set(-10)

      // Make sure user cannot drag beyond the top of the sheet
      sheetDragY.set(Math.max(sheetDragY.get() + delta.y, 0))
    }, []) // eslint-disable-line

    const handleDragStart = React.useCallback(() => {
      // Sync the drag value with the spring value so that dragging start at the correct y position
      sheetDragY.set(sheetSpringY.get())
      setDragging(true)
    }, []) // eslint-disable-line

    const handleDragEnd = React.useCallback(
      (_, { velocity }: PanInfo) => {
        if (velocity.y > 500) {
          // User flicked the sheet down
          onClose()
        } else {
          const sheetEl = sheetRef.current
          const contentHeight = sheetEl.getBoundingClientRect().height
          const snapTo = snapPoints
            ? getClosest(
                snapPoints.map((p) => contentHeight - p),
                sheetDragY.get(),
              )
            : sheetDragY.get() / contentHeight > 0.6 // Close if dragged over 60%
            ? contentHeight
            : 0

          // Update the spring value so that the sheet is animated to the snap point
          sheetSpringY.set(snapTo)

          if (snapPoints && onSnap) {
            const snapValue = Math.abs(Math.round(snapPoints[0] - snapTo))
            const snapIndex = snapPoints.indexOf(snapValue)
            onSnap(snapIndex)
          }

          if (snapTo >= contentHeight) onClose()

          setDragging(false)
        }

        // Reset indicator rotation after dragging
        indicatorRotation.set(0)
      },
      [onClose, onSnap], // eslint-disable-line
    )

    // Keep the callback fns up-to-date so that they can be accessed inside
    // the effect without including them to the dependencies array
    React.useEffect(() => {
      callbacks.current = { onOpenStart, onOpenEnd, onCloseStart, onCloseEnd }
    })

    React.useEffect(() => {
      setMounted(true)
    }, [])

    // Trigger onSnap callback when sheet is opened or closed
    React.useEffect(() => {
      if (!snapPoints || !onSnap || !mounted) return
      const snapIndex = isOpen ? initialSnap : snapPoints.length - 1
      onSnap(snapIndex)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    React.useImperativeHandle(ref, () => ({
      snapTo: (snapIndex: number) => {
        if (snapPoints && snapPoints[snapIndex] !== undefined) {
          const sheetEl = sheetRef.current as HTMLDivElement
          const contentHeight = sheetEl.getBoundingClientRect().height
          const snapTo = contentHeight - snapPoints[snapIndex]

          sheetSpringY.set(snapTo)
          if (onSnap) onSnap(snapIndex)
          if (snapTo >= contentHeight) onClose()
        }
      },
    }))

    useModalEffect(isOpen, rootId)

    const dragProps = disableDrag
      ? ({} as any)
      : {
          drag: 'y' as const,
          dragElastic: 0,
          dragConstraints: { top: 0, bottom: 0 },
          dragMomentum: false,
          onDrag: handleDrag,
          onDragStart: handleDragStart,
          onDragEnd: handleDragEnd,
        }

    const context = {
      y,
      sheetRef,
      isOpen,
      isDragging,
      initialSnap,
      snapPoints,
      indicatorRotation,
      callbacks,
      dragProps,
    }

    const wrapperProps = {
      ...rest,
      ref,
      style: {
        ...styles.wrapper,
        pointerEvents,
      } as any,
    }

    return mounted ? (
      ReactDOM.createPortal(
        <SheetContext.Provider value={context}>
          <div {...wrapperProps}>
            <AnimatePresence>
              {/* NOTE: AnimatePresence requires us to set keys to children */}
              {isOpen
                ? React.Children.map(children, (child: any, i) =>
                    React.cloneElement(child, { key: `sheet-child-${i}` }),
                  )
                : null}
            </AnimatePresence>
          </div>
        </SheetContext.Provider>,
        document.body,
      )
    ) : (
      // NOTE: return the wrapper div so that SSR frameworks don't get confused
      // with the HTML structure ("Expected server HTML to contain a matching <div>...")
      <div {...wrapperProps} />
    )
  },
)

export default Sheet
