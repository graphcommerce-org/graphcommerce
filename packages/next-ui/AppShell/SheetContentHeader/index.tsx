import { useElementScroll } from '@reachdigital/framer-utils'
import React from 'react'
import useSheetContext from '../../../framer-sheet/hooks/useSheetContext'
import ContentHeader, { ContentHeaderProps } from '../ContentHeader'

const SheetContentHeader = React.forwardRef<HTMLDivElement, Omit<ContentHeaderProps, 'scrollY'>>(
  (props, ref) => {
    const { contentRef } = useSheetContext()
    const { y } = useElementScroll(contentRef)

    return <ContentHeader {...props} scrollY={y} ref={ref} />
  },
)

export default SheetContentHeader
