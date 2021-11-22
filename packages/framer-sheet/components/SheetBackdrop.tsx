import { Styled } from '@graphcommerce/framer-utils'
import { m, MotionProps, MotionValue, useSpring, useTransform } from 'framer-motion'
import { SPRING_ANIM } from '../animation'
import { useSheetContext } from '../hooks/useSheetContext'

export type SheetBackdropClassKeys = 'backdrop'

export type SheetBackdropProps = Omit<MotionProps, 'initial' | 'animate' | 'exit'> &
  Styled<SheetBackdropClassKeys>

export default function SheetBackdrop(props: SheetBackdropProps) {
  const { style, onTap, styles, classes } = props
  const { drag, size, variant } = useSheetContext()

  const sign = ['top', 'left'].includes(variant) ? -1 : 1

  // We animate the opacity of the Backdrop based on the position of the sheet
  const opacity = useSpring(
    useTransform([drag, size] as MotionValue<string | number>[], ([dragv, sizev]: number[]) => {
      if (sizev === 0) return 0
      if (dragv === 0) return 1
      return 1 - (dragv / sizev) * sign
    }),
    { ...SPRING_ANIM, restDelta: 0 },
  )

  const Component = onTap ? m.button : m.div
  return (
    <Component
      onTap={onTap}
      type='button'
      {...props}
      className={classes?.backdrop}
      style={{ ...styles?.backdrop, ...style, opacity }}
    />
  )
}
