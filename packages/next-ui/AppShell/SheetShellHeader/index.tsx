import { useSheetContext } from '@graphcommerce/framer-sheet'
import { useElementScroll } from '@graphcommerce/framer-utils'
import React from 'react'
import AppBarBase, { AppBarBaseProps } from '../AppBar/index'

type SheetShellHeaderProps = {
  hideDragIndicator?: boolean
} & Omit<AppBarBaseProps, 'scrollY'>

export default function SheetShellHeader(props: SheetShellHeaderProps) {
  const { contentRef } = useSheetContext()
  return <AppBarBase {...props} scrollY={useElementScroll(contentRef).y} />
}
