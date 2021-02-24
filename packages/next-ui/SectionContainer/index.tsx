import React, { PropsWithChildren } from 'react'
import SectionHeader from '../SectionHeader'

export type SectionContainerProps = PropsWithChildren<{
  label: React.ReactNode
  className?: string
}>

export default function SectionContainer(props: SectionContainerProps) {
  const { children, label, className } = props

  return (
    <div className={className}>
      <SectionHeader labelLeft={label} />
      {children}
    </div>
  )
}
