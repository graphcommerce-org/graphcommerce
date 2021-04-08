import { motion } from 'framer-motion'
import * as React from 'react'
import { useSheetContext } from './context'
import styles from './styles'
import { SheetDraggableProps } from './types'

const SheetContent = React.forwardRef<any, SheetDraggableProps>((props, ref) => {
  const { disableDrag = false, style = {}, ...rest } = props
  const { dragProps } = useSheetContext()

  return (
    <motion.div
      {...rest}
      ref={ref}
      className='react-modal-sheet-content'
      style={{ ...styles.content, ...style }}
      {...(disableDrag ? {} : dragProps)}
    />
  )
})

export default SheetContent
