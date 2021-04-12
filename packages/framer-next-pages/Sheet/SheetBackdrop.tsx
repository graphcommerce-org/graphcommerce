import { motion, MotionProps, MotionStyle, MotionValue, useTransform } from 'framer-motion'
import { useSheetContext } from './SheetContext'

const styles: MotionStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(51, 51, 51, 0.5)',
  touchAction: 'none', // Disable iOS body scrolling
  willChange: 'opacity',
}

type SheetBackdropProps = Omit<MotionProps, 'initial' | 'animate' | 'exit'>

export default function SheetBackdrop(props: SheetBackdropProps) {
  const { style } = props
  const { y, height } = useSheetContext()

  // We animate the opacity of the Backdrop based on the position of the sheet
  const opacity = useTransform([y, height] as MotionValue[], ([yv, hv]: number[]) => {
    if (hv === 0) return 0
    if (yv === 0) return 1
    return 1 - yv / hv
  })

  return <motion.div {...props} style={{ ...styles, ...style, opacity }} />
}
