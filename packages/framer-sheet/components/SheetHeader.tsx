import React from 'react'

export type SheetHeaderProps = {
  close: React.ReactNode
  back?: React.ReactNode
  primary?: React.ReactNode
  secondary?: React.ReactNode
  children?: React.ReactNode
}

export default function SheetHeader(props: SheetHeaderProps) {
  const { close, back, primary, secondary, children } = props

  let leftAction: React.ReactNode = secondary ?? back
  const rightAction: React.ReactNode = primary ?? close
  if (rightAction !== close && !leftAction) leftAction = close
  if (!leftAction) leftAction = <div />

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {leftAction}
      <div>{children}</div>
      {rightAction}
    </div>
  )
}
