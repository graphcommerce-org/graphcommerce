import { useElementScroll } from '@reachdigital/framer-utils'
import React from 'react'
import useSheetContext from '../../../framer-sheet/hooks/useSheetContext'
import ContentHeader, { ContentHeaderProps } from '../ContentHeader'

export default function SheetContentHeader(props: Omit<ContentHeaderProps, 'scrollY'>) {
  const { contentRef } = useSheetContext()
  const { y } = useElementScroll(contentRef)

  return <ContentHeader {...props} scrollY={y} />
}
