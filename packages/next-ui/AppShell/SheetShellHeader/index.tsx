import useSheetContext from '@reachdigital/framer-sheet/hooks/useSheetContext'
import { useElementScroll } from '@reachdigital/framer-utils'
import React from 'react'
import AppShellHeader, { AppShellHeaderProps } from '../AppShellHeader'
import useSheetStyles from '../SheetShellBase/useSheetStyles'
import SheetShellDragIndicator from '../SheetShellDragIndicator'

type SheetShellHeaderProps = {
  hideDragIndicator?: boolean
} & Omit<AppShellHeaderProps, 'scrollY'>

export default function SheetShellHeader(props: SheetShellHeaderProps) {
  const { hideDragIndicator } = props
  const { contentRef } = useSheetContext()
  const { y } = useElementScroll(contentRef)
  const sheetClasses = useSheetStyles()

  return (
    <AppShellHeader
      {...props}
      scrollY={y}
      dragIndicator={
        hideDragIndicator ? undefined : <SheetShellDragIndicator classes={sheetClasses} />
      }
      sheet
    />
  )
}
