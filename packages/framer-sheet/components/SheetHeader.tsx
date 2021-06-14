import { Styled } from '@reachdigital/framer-utils'
import React from 'react'

export type SheetHeaderClasskey = 'sheetHeader'

export type SheetHeaderProps = {
  close: React.ReactNode
  back?: React.ReactNode
  primary?: React.ReactNode
  secondary?: React.ReactNode
  children?: React.ReactNode
} & Styled<SheetHeaderClasskey>

/**
 * - Show the primary action on the right if available in props
 * - Show the secondary action on the left if available in props
 * - Show a close button on the right if there is space on the right.
 * - Show a back button on the left if there is space on the left.
 * - Show a close button on the left if there is no space of the right and if there is space on the left.
 */
export default function SheetHeader(props: SheetHeaderProps) {
  const { close, back, primary, secondary, children, classes, styles } = props

  let leftAction: React.ReactNode = secondary ?? back
  const rightAction: React.ReactNode = primary ?? close
  if (rightAction !== close && !leftAction) leftAction = close
  if (!leftAction) leftAction = <div />

  return (
    <div className={classes?.sheetHeader} style={styles?.sheetHeader}>
      {leftAction}
      <div>{children}</div>
      {rightAction}
    </div>
  )
}
