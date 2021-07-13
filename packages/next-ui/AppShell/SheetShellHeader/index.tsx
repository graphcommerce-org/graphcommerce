import { useElementScroll } from '@reachdigital/framer-utils'
import React from 'react'
import useSheetContext from '../../../framer-sheet/hooks/useSheetContext'
import AppShellHeader, { AppShellHeaderProps } from '../AppShellHeader'
import useSheetStyles from '../SheetShellBase/useSheetStyles'
import SheetShellDragIndicator from '../SheetShellDragIndicator'

export default function SheetShellHeader(props: Omit<AppShellHeaderProps, 'scrollY'>) {
  const { contentRef } = useSheetContext()
  const { y } = useElementScroll(contentRef)
  const sheetClasses = useSheetStyles()

  return (
    <AppShellHeader
      {...props}
      scrollY={y}
      dragIndicator={<SheetShellDragIndicator classes={sheetClasses} />}
    />
  )
}
