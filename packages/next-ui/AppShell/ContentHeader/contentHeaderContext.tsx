import React from 'react'

export type ContentHeaderContext = {
  titleRef: React.RefObject<HTMLDivElement>
  contentHeaderRef: React.RefObject<HTMLDivElement>
}

const contentHeaderContext = React.createContext(undefined as unknown as ContentHeaderContext)
contentHeaderContext.displayName = 'contentHeaderContext'

export default contentHeaderContext
