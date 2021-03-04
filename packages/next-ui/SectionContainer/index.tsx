import React, { PropsWithChildren } from 'react'
import SectionHeader from '../SectionHeader'

export type SectionContainerProps = PropsWithChildren<{
  label: React.ReactNode
  endLabel?: React.ReactNode
  className?: string
}>

export default function SectionContainer(props: SectionContainerProps) {
  const { children, label, endLabel, className } = props

  return (
    <div className={className}>
      <SectionHeader labelLeft={label} labelRight={endLabel} />
      {children}
    </div>
  )
}
