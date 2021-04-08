import { motion } from 'framer-motion'
import * as React from 'react'
import styles from './styles'
import { SheetBackdropProps } from './types'

const isClickable = (props: Pick<SheetBackdropProps, 'onTap'>) => !!props.onClick || !!props.onTap

const SheetBackdrop = React.forwardRef<any, SheetBackdropProps>((props, ref) => {
  const { style = {}, ...rest } = props
  const Component = isClickable(rest) ? motion.button : motion.div

  return (
    <Component
      {...rest}
      ref={ref}
      className='react-modal-sheet-backdrop'
      style={{ ...styles.backdrop, ...style }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )
})

export default SheetBackdrop
