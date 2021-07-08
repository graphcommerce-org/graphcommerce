import { useRef } from 'react'
import contentHeaderContext, { ContentHeaderContext } from '../ContentHeader/contentHeaderContext'

type SheetContentProps = {
  children: React.ReactNode
}

export default function SheetContent(props: SheetContentProps) {
  const { children } = props
  const context: ContentHeaderContext = {
    titleRef: useRef<HTMLDivElement>(null),
    contentHeaderRef: useRef<HTMLDivElement>(null),
  }

  return <contentHeaderContext.Provider value={context}>{children}</contentHeaderContext.Provider>
}
